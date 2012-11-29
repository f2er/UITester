<?php

require_once ('ArkAuth.php');

/**
 * 淘宝内部SSO
 *
 * the last known user to change this file in the repository  <$LastChangedBy: suqian $>
 * @author Su Qian <aoxue.1988.su.qian@163.com>
 * @version $Id: TaobaoArk.php 1532 2011-03-01 02:09:44Z suqian $
 * @package 
 */
class TaobaoArk extends ArkAuth {

	const GENERICCODEKEY = 'ticket';
	
	/* (non-PHPdoc)
	 * @see ArkAuth::getGenericCode()
	 */
	public function getGenericCode(Context $context) {
		return isset($_GET[self::GENERICCODEKEY]) ? $_GET[self::GENERICCODEKEY] : NULL;
	}

	/* 
	 * @see ArkAuth::processGenericCode()
	 */
	public function processGenericCode(Context $context, $genericcode) {
		
		//请求用户身份的Profile
		$jsonResult = ArkRequest::requestUrl(ArkRequest::processProfileUrl($genericcode), NULL);
		$user = NULL;
		if (!empty($jsonResult))
			$user = json_decode($jsonResult, true);//返回一个数组，错误时返回NULL

		//json解析正确，且服务器不出错
		if (isset($user['ErrorCode']) && $user['ErrorCode'] == 0){
			//设置密钥类的缓存信息
			$this->setSecretKeyIv($context,$user['SecretId'], $user['SecretKey'], $user['SecretIV'], $user['SecretExp']);
			//往上下文请求中添加用户的身份信息
			$this->setAppLocalUserInfo($context, $user);
			//写到Client的Cookie中去
			$this->setAppLocalCookieInfo($user);
		}else{
			//使用了已经使用过的Ticket，导致请求UserProfile的时候返回1001错误,这个时候需要重新请求ArkServer来获得Ticket
			//如果以上部分始终无法拿到身份，可能会存在死循环的重复请求
			$this->processLogin();
		}
	}

	/* 
	 * @see ArkAuth::decryptUserAddContext()
	 */
	public function decryptUserAddContext(Context $context, $secretkeyiv, $httpcookie) {
		$encryptjson = $this->getCookieValue($httpcookie, self::COOKIEAUTHEN);
		
		if(empty($secretkeyiv['SecretKey'])) 
			$secretkeyiv['SecretKey'] = null;
		if(empty($secretkeyiv['SecretIV'])) 
			$secretkeyiv['SecretIV'] = null;
			
		$decryptjson = EncryptService::Decrypt($encryptjson, $secretkeyiv['SecretKey'], $secretkeyiv['SecretIV']);

		//如果JSON串不为空时则添加用户信息到应用中去,否则直接不做任何操作
		if (!empty($decryptjson)){
			$user = json_decode($decryptjson, true);
			$this->setAppLocalUserInfo($context, $user);
		}else{
			//如果出错，这个时候直接清除用户的Cookie信息
			self::processSecretError(1100);
		}
		return $decryptjson;
	}

}
