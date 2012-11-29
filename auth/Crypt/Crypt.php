<?php
require  'AES.php';
/**
 * 使用基于Rjindael的AES对称加密算法
 *
 * the last known user to change this file in the repository  <$LastChangedBy: suqian $>
 * @author Su Qian <aoxue.1988.su.qian@163.com>
 * @version $Id: Crypt.php 1532 2011-03-01 02:09:44Z suqian $
 * @package 
 */
class EncryptService{
	
	private function __construct(){
		
	}
	
	public static function Encrypt($source, $key, $iv){
		$mobjCryptoService = new Crypt_AES();
		$mobjCryptoService->setKey(base64_decode($key));
		$mobjCryptoService->setIV(base64_decode($iv));
		$result = $mobjCryptoService->encrypt($source);
		//追加一次反转
		$result = strrev($result);
		//base64编码，可用于在解码时校验完整性
		return base64_encode($result);
	}
	//失败时返回null
	public static function Decrypt($source, $key, $iv){
		$mobjCryptoService = new Crypt_AES();
		//base64解码，校验完整性
		$source = base64_decode($source);
		if($source !== false)
		{
			//追加一次反转
			$source = strrev($source);
			$mobjCryptoService->setKey(base64_decode($key));
			$mobjCryptoService->setIV(base64_decode($iv));
			return $mobjCryptoService->decrypt($source);
		}
		else return NULL;
	}
}

/**
 * Enter description here ...
 *
 * the last known user to change this file in the repository  <$LastChangedBy: suqian $>
 * @author Su Qian <aoxue.1988.su.qian@163.com>
 * @version Crypt.php 1532 2011-03-01 02:09:44Z suqian $
 * @package 
 */
final class IdEncryptService{
	
	private function __construct(){
		
	}
	
	public static function Encrypt($source){
		$bytIn = strrev($source);
		return base64_encode($bytIn);
	}
	//解码失败返回NULL
	static function Decrypt($source){
		$bytIn = base64_decode($source);
		if($bytIn === false) return NULL;
		else return strrev($bytIn);
	}
}

/**
 * Enter description here ...
 *
 * the last known user to change this file in the repository  <$LastChangedBy: suqian $>
 * @author Su Qian <aoxue.1988.su.qian@163.com>
 * @version Crypt.php 1532 2011-03-01 02:09:44Z suqian $
 * @package 
 */
final class CodeEncryptService{
	
	private function __construct(){
		
	}
	public static function Encrypt($source){
		$bytIn = $source;
		$chars = base64_encode($bytIn);
		return strrev($chars);
	}
	//解码失败返回NULL
	public static function Decrypt($source){
		$chars = strrev($source);
		$chars = base64_decode($chars);
		if($chars === false) return NULL;
		else return $chars;
	}
}