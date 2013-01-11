<?php
include 'ArkConfig.php';
require 'Crypt/Crypt.php';
require 'ArkRequest.php';
/**
 * SSO 认证体系工厂
 *
 * the last known user to change this file in the repository  <$LastChangedBy: suqian $>
 * @author Su Qian <aoxue.1988.su.qian@163.com>
 * @version $Id: Common.php 1532 2011-03-01 02:09:44Z suqian $
 * @package 
 */
final  class ArkFactory{
	private static $objs = array();
	
	private function __construct(){
	}
	
	/**
	 * 获取SSO认证类型
	 * 
	 * @throws ArkException
	 * @return ArkAuth
	 */
	public static function getArkAuth(){
		$authType = strtolower(Config::get(CLIENTVERSION));
		if(!in_array($authType,array('taobao','oauth')))
			throw new ArkException($authType.' auth is not exist', 102);
		
		$className = ucfirst($authType).'Ark';
		$filename = 'Auth'.DIRECTORY_SEPARATOR.$className.'.php';
		require  'Auth'.DIRECTORY_SEPARATOR.$className.'.php';
		$key = 'ark_'.$className;
		if(!isset(self::$objs[$key]) || !(self::$objs[$key] instanceof ArkAuth))
			self::$objs[$key] = new $className();
		return self::$objs[$key];
	}
	
	/**
	 *	获取上下文
	 *
	 * @throws ArkException
	 * @return Context
	 */
	public static function getContext(){
		$contexttype = strtolower(Config::get(CONTEXTTYPE));
		if(!in_array($contexttype,array('session')))
			throw new ArkException($contexttype.' context is not exist', 102);
			
		$className = ucfirst($contexttype).'Context';
		require 'Context'.DIRECTORY_SEPARATOR.$className.'.php' ;
		$key = 'ark_'.$className;
		if(!isset(self::$objs[$key]) || !(self::$objs[$key] instanceof Context))
			self::$objs[$key] = new $className();
		return self::$objs[$key];
	}
}
/**
 * 管理PHP Ark Client配置
 *
 * the last known user to change this file in the repository  <$LastChangedBy: suqian $>
 * @author Su Qian <aoxue.1988.su.qian@163.com>
 * @version $Id: Common.php 1532 2011-03-01 02:09:44Z suqian $
 * @package 
 */
final  class Config{
	
	private function __construct(){
	}
	
	public static function get($item){
		global $ArkConfig;
		if(!isset($ArkConfig[$item]))
		   throw new ArkException($item .' config is not exist', 100);
		   
		return $ArkConfig[$item];
	}
}

/**
 * 管理PHP Ark Client日志
 *
 * the last known user to change this file in the repository  <$LastChangedBy: suqian $>
 * @author Su Qian <aoxue.1988.su.qian@163.com>
 * @version $Id: Common.php 1532 2011-03-01 02:09:44Z suqian $
 * @package 
 */
final class ArkLog{
	
	private function __construct(){
	}
	
	static public function log($message){
		$logpath = Config::get(LOGPATH);
		if(!$logpath)
			$logpath = dirname(__FILE__).DIRECTORY_SEPARATOR.'Log'.DIRECTORY_SEPARATOR;
		$filename = date('Y-m-d',time()).'.txt';
		$message .= '\r\n loged in'.date('Y-m-d H:i',time());
		error_log($message,3,$logpath.$filename);
	}
}


/**
 * PHP Ark Client异常处理
 *
 * the last known user to change this file in the repository  <$LastChangedBy: suqian $>
 * @author Su Qian <aoxue.1988.su.qian@163.com>
 * @version $Id: Common.php 1532 2011-03-01 02:09:44Z suqian $
 * @package 
 */
class ArkException extends Exception{
	
}





