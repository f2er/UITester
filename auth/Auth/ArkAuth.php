<?php

/**
 * 
 * ark认证基类，模板方法，定义SSO认证的基本步子聚
 *
 * the last known user to change this file in the repository  <$LastChangedBy: suqian $>
 * @author Su Qian <aoxue.1988.su.qian@163.com>
 * @version $Id: ArkConfig.php 1532 2011-03-01 02:09:44Z suqian $
 * @package 
 */
abstract class ArkAuth {

	const COOKIENAME = "ArkAppAuthen";

	const COOKIEAUTHEN = "Authen";

	const COOKIEGUID = "Scid";

	const COOKIECODE = "Code";

	const USERITEM = "Ark:User";

	const APPINFO = "Ark:AppInfo";

	protected $appUser = array();

	protected $apiUser = array();
		
	public function __construct() {

	}

	public function preOnAuthRequest(Context $context) {
		
		return true;
	}

	public function OnAuthRequest(Context $context) {
		if (!$this->preOnAuthRequest($context)) 
			return false;
		
		$httpcookie = NULL;
		if (isset($_COOKIE[self::COOKIENAME])) 
			$httpcookie = strtr($_COOKIE[self::COOKIENAME], '|', '=');
		
		//注销登录的命令的识别
		if (isset($_GET[Config::get(LOGOUTPARAM)])) {
			$logout = $_GET[Config::get(LOGOUTPARAM)];
			if ($logout && preg_match("/$logout/i", Config::get(LOGOUTVALUE))) {
				$this->processLogout();
			}
		}
		
		//存在Cookie则直接增加HttpContext对象的用户信息，如果不存在则需要判断子凭据是否存在
		if (!empty($httpcookie)) {
			//基于存在子凭据
			$secretid = self::getCookieValue($httpcookie, self::COOKIEGUID);
			
			if (!empty($secretid)) $secretid = IdEncryptService::Decrypt($secretid);
			
			//对解密后的secretid的有效性进行判断,如果解密后返回值为空的话，说明子凭据被意外侵入，直接转向错误
			if (empty($secretid)) $this->processSecretError(1013);
			
			//从缓存(session)根据secretID的入口取用户密匙
			$secretkeyiv = $this->getSecretKeyIv($context, $secretid);
			//不存在身份信息，向服务器发起请求
			if (empty($secretkeyiv)) {
				$secretkeyiv = $this->requestSecretKeyIv($secretid);
				
				if ($secretkeyiv  && $secretkeyiv['ErrorCode'] == 0) {
					//请求成功,设置应用缓存中的密钥类
					$this->_setSecretKeyIv($context, $secretid, $secretkeyiv);
				} else if ($secretkeyiv && $secretkeyiv['ErrorCode'] == 1011) {
					//客户端在特定的请求代码下重定向到Ark进行登录
					$this->processLogin(true);
				} else {
					//清除Cookie，同时重定向到错误
					$this->processSecretError($secretkeyiv == NULL ? 1015 : $secretkeyiv['ErrorCode']);
				}
			}
			//解密用户信息，存入session
			return $this->decryptUserAddContext($context, $secretkeyiv, $httpcookie);
		} else {
			//子凭据不存在的情况下，要判断genericCode是否存在
			$genericCode = $this->getGenericCode($context);
			if (empty($genericCode)) {
				$this->processLogin(true);
			} else {
				//根据Code取Profile或者做后续的事情
				$this->processGenericCode($context, $genericCode);
			}
		}
		return null;
	
	}

	public function processLogin($isclear = false) {
		if ($isclear) 
			setcookie(COOKIENAME, "", time() - 3600);
		
		Header("Location: " . ArkRequest::processLoginUrl(Config::get(LOGOUTPARAM)));
	}

	public function processLogout() {
		setcookie(COOKIENAME, "", time() - 3600);
		Header("Location: " . ArkRequest::processLogoutUrl(Config::get(LOGOUTPARAM)));
	}

	public function processSecretError($errorcode) {
		setcookie(COOKIENAME, "", time() - 3600);
		Header("Location: " . ArkRequest::processErrorUrl($errorcode));
	}

	/**
	 * 从应用缓存中获得密钥类(应用缓存可能是Session、memcached等)
	 * 
	 * @param string $secretId 密钥类Id
	 * @param Context $context 应用上下文
	 * @return array|NULL
	 */
	public function getSecretKeyIv(Context $context, $secretId) {
		return $context->get($secretId);
	}

	/**
	 * 设置应用缓存中密钥类
	 * 
	 * @param Context $context 应用缓存上下文（应用缓存是指session、cookie、memcached等）
	 * @param string $secretId 密钥类Id
	 * @param array $secret 密钥类
	 */
	public function _setSecretKeyIv(Context $context, $secretId, array $secret) {
		$context->insert($secretId, $secret);
	}

	/**
	 * 设置应用缓存中密钥类
	 * 
	 * @param Context $context 应用缓存上下文（应用缓存是指session或者cookie）
	 * @param string $secretId 密钥类Id
	 * @param string $key 密钥类Key
	 * @param string $iv  密钥类Iv
	 * @param int $expitime 密钥类过期时间
	 */
	public function setSecretKeyIv(Context $context, $secretId, $key, $iv, $expitime) {
		
		$secretkeyiv['SecretKey'] = $key;
		$secretkeyiv['SecretIV'] = $iv;
		$secretkeyiv['SecretExp'] = $expitime;
		self::_setSecretKeyIv($context, $secretId, $secretkeyiv);
	}

	/**
	 * 向服务端请求密钥类信息
	 * @param string $secretId 密钥类Id
	 * @return array
	 */
	public function requestSecretKeyIv($secretId,$isExpired = NULL) {
		$secretString = ArkRequest::requestUrl(ArkRequest::processSecretUrl($secretId,$isExpired), NULL);
		if (empty($secretString)) 
			return NULL;
		
		return json_decode($secretString, true);
	}

	/**
	 * Authcode or ticket
	 * 
	 * @param Context $context
	 * @return $context
	 */
	public abstract function getGenericCode(Context $context);

	/**
	 * Process authcode or ticket
	 * 
	 * @param unknown_type $context
	 * @param unknown_type $genericcode
	 */
	public abstract function processGenericCode(Context $context, $genericcode);

	/**
	 * 解密用户信息并添加到应用中
	 * 
	 * @param Context $context 应用缓存上下文
	 * @param unknown_type $secretkeyiv 密钥
	 * @param unknown_type $httpcookie 认证Cookie
	 */
	public abstract function decryptUserAddContext(Context $context, $secretkeyiv, $httpcookie);

	/**
	 * 取得app的 认证的用户信息
	 * @return array
	 */
	public function getAppUser(){
		return $this->appUser;
	}
	
	/**
	 * 取得api的 认证的用户信息
	 * @return array
	 */
	public function getApiUser(){
		return $this->apiUser;
	}
	
	/**
	 * 解析SSO 认证过程中的cookie
	 * @param unknown_type $cookie
	 * @param unknown_type $value
	 * @return string
	 */
	protected function getCookieValue($cookie, $value) {
		
		$cookieArray = array();
		//cookie用&标识的拆分到数组里面去,后面不带数组的情况会把页面相应的变量改变，有冲突风险
		parse_str($cookie, $cookieArray);
		//空格处理成加号是为了解决PHP客户端在IIS下使用的时候,可能造成的空格符合无法被解析的情况，替换成+（Windows + IIS特定）
		return $cookieArray[$value] !== NULL ? strtr($cookieArray[$value], ' ', '+') : false;
	}

	/**
	 * 设置APP用户信息
	 * 
	 * @param Context $context
	 * @param array $user
	 * @return array
	 */
	protected function setAppLocalUserInfo(Context $context, array $user,$ifOauth = false) {
		//往上下文请求中添加用户的身份信息
		$newUser = array(
			'WorkId' => $user['WorkId'], 
			'Email' => $user['Email'], 
			'DomainUser' => $user['DomainUser'], 
			'WangWang' => base64_decode($user['EWangWang']),
			'DisplayName'=>  base64_decode($user['DisplayName'])
		);
		if($ifOauth){
			$newUser['AccessToken'] = $user['AccessToken'];
			$newUser['RefreshToken'] = $user['RefreshToken'];
		}
		$context->insert(self::USERITEM, $newUser);
		$this->appUser = $newUser;
		return $newUser;
	}
	
	
	/**
	 * Enter description here ...
	 * @param Context $context
	 * @param array $user
	 * @return array
	 */
	protected function setApiLocalUserInfo(Context $context, array $user){
		//往上下文请求中添加用户的身份信息
		$newUser = array(
			'WorkId' => $user['WorkId'], 
			'AppUrl' => $user['AppUrl'], 
			'DomainUser' => $user['DomainUser'], 
		);
		
		$context->insert(self::APPINFO, $newUser);
		$this->apiUser = $newUser;
		return $newUser;
	}
	
	
	
	/**
	 * 设置认证后的APP cookie
	 * @param array $user
	 */
	protected function setAppLocalCookieInfo(array $user,$jsonResult = ''){
		
		$Values = self::COOKIEAUTHEN.'='.EncryptService::Encrypt($jsonResult ? $jsonResult : json_encode($user), $user['SecretKey'], $user['SecretIV']);
		$Values .= '&'.self::COOKIEGUID.'='.IdEncryptService::Encrypt($user['SecretId']);
		$Values .= '&'.self::COOKIECODE.'='.CodeEncryptService::Encrypt(0);
		setcookie(self::COOKIENAME, strtr($Values, '=', '|'), NULL, '/', NULL, NULL, 1);
	}

}

