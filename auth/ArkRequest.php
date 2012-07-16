<?php

/**
 * 向Ark Server请求
 *
 * the last known user to change this file in the repository  <$LastChangedBy: suqian $>
 * @author Su Qian <aoxue.1988.su.qian@163.com>
 * @version $Id: ArkRequest.php 1532 2011-03-01 02:09:44Z suqian $
 * @package 
 */

final class ArkRequest {

	const LOGINURL = '%s/Login.aspx?app=%s&redirectURL=%s';
	const LOGOUTURL = '%s/Login.aspx?app=%s&redirectURL=%s&cmd=logout';
	const PROFILEURL = '%s/GetUserProfile.ashx?ticket=%s';
	const SECRETURL = '%s/GetSecretKey.ashx?secretid=%s';
	const SECRETNEWURL = '/%s/GetSecretKey.ashx?secretid=%s&expired=%s';
	const ERRORURL = '%s/Error.aspx?id=%s';
	const ACCESSTOKENURL = '%s/GetAccessToken.ashx?authcode=%s&appcode=%s&version=%s';
	const VALIDATEACCESSTOKEMURL = '%s/ValidateAccessToken.ashx?accesstoken=%s&appcode=%s&type=%s&version=%s';
	

	public static function httpsRequest($url){
		$user_agent = "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)";

		$connect = curl_init();
		curl_setopt($connect, CURLOPT_URL, $url);
		curl_setopt($connect, CURLOPT_SSL_VERIFYHOST, 2);
		curl_setopt($connect, CURLOPT_USERAGENT, $user_agent);
		curl_setopt($connect, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($connect, CURLOPT_SSL_VERIFYPEER, FALSE);

		$result=curl_exec($connect);
		curl_close ($connect);
		return $result;
	}
	
	//TODO：添加异常处理
	public static function requestUrl($url, $cookie){
		return self::httpsRequest($url);
	}
	
	public static function removeSlashEnd($str){
		$length = strlen($str) - 1;
		$end = $str[$length];
		if($end=='\\' || $end=='/')
			return substr($str, 0, $length);
		else return $str;
	}

	public static function removePort($str){
		$start = strrpos($str, ':');
		if($start !== false && $start > 7){
			for($end=$start+1; is_numeric($str[$end]); $end++);	
			return substr($str, 0, $start).substr($str, $end);
		}
		else return $str;
	}
	
	/**
	 * 模拟方法重栽
	 * 
	 * @param string $param
	 * @param string $version
	 * @throws ArkException
	 * @return string
	 */
	public static function processLoginUrl($param,$version = ''){
		if(!$version)
			return self::processUrl($param, self::LOGINURL);
		else
			return sprintf("%s&version=%s", self::processLoginUrl($param), $version);
	}
	
  	
    
	public static function processLogoutUrl($param,$version = ''){
		if(!$version)
			return self::processUrl($param, self::LOGOUTURL);
		else
			return sprintf("%s&version=%s", self::processLogoutUrl($param), $version);

	}

	public static function processProfileUrl($ticket){
		return sprintf(self::PROFILEURL, Config::get(ARKSERVER), $ticket);
	}

	public static function processSecretUrl($secretId,$isexpired = NULL){
		if(is_null($isexpired))
			return sprintf(self::SECRETURL,Config::get(ARKSERVER), $secretId);
		else 
			return sprintf('%s&expired=%s', self::processSecretUrl($secretId), $isexpired);
	}
	
	
	public static function processErrorUrl($errorcode){
		return sprintf(self::ERRORURL,Config::get(ARKSERVER), $errorcode);
	}

 	public static function processAccessTokenUrl($authcode, $appcode, $version){
        return sprintf(self::ACCESSTOKENURL, Config::get(ARKSERVER),$authcode, $appcode, $version);
    }
    
 	public static function processValidateAccessTokenUrl($accessToken, $appCode, $clientType, $clientVersion){
        return sprintf(self::VALIDATEACCESSTOKEMURL, Config::get(ARKSERVER), $accessToken, $appCode, $clientType, $clientVersion);
    }
    
	public static function processUrl($param, $formaturl){
		$app = (isset($_SERVER['HTTPS']) && (strtolower($_SERVER['HTTPS']) != 'off')) ? 'https://' : 'http://'.$_SERVER ['HTTP_HOST'].Config::get(APPATH);
		$redirectUrl = (isset($_SERVER['HTTPS']) && (strtolower($_SERVER['HTTPS']) != 'off')) ? 'https://' : 'http://'.$_SERVER ['HTTP_HOST'].$_SERVER['REQUEST_URI'];
		$app = self::removePort($app);
		
		$redirectUrl = self::removeSlashEnd($redirectUrl);
		$redirectUrl = self::formatUrlParam($redirectUrl, $param);

		return sprintf($formaturl,Config::get(ARKSERVER), urlencode(iconv('gb2312', 'utf-8', $app)), urlencode(iconv('gb2312', 'utf-8', $redirectUrl)));
	}

	public static function formatUrlParam($url,$param){
		return str_replace('/&', '/?', preg_replace('/[&*|\?*]'.$param.'=[^&]*/','',$url));
	}
	
	public static function getContextUrl(){
		return $contextUrl = (isset($_SERVER['HTTPS']) && (strtolower($_SERVER['HTTPS']) != 'off')) ? 'https://' : 'http://'.$_SERVER ['HTTP_HOST'].$_SERVER['REQUEST_URI'];
	}
}