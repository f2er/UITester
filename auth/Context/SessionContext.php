<?php

require_once ('Context.php');

/**
 * Session
 *
 * the last known user to change this file in the repository  <$LastChangedBy: suqian $>
 * @author Su Qian <aoxue.1988.su.qian@163.com>
 * @version $Id: codetemplates.xml 1532 2011-03-01 02:09:44Z suqian $
 * @package 
 */
class SessionContext implements Context {
	
	public function __construct(){
		
		//为认证Cookie设置生效的主机域名
		ini_set('session.cookie_domain', $_SERVER['SERVER_NAME']);
		//为认证Cookie设置生效的路径，IE9Cookie的BUG问题
		ini_set('session.cookie_path', '/');
	}
	/* 
	 * @see Context::insert()
	 */
	public function insert($key, $value, $expires = '') {
		$_SESSION[$key] = $value;
	}

	/* 
	 * @see Context::get()
	 */
	public function get($key) {
		if(isset($_SESSION[$key]) && $_SESSION[$key]!=NULL)
			return $_SESSION[$key];
		return NULL;
	}

	/* 
	 * @see Context::delete()
	 */
	public function delete($key) {
		$_SESSION[$key] = null;
		unset($_SESSION[$key]);
	}
	
	public function getAllCache(){
		return $_SESSION;
	}


}

