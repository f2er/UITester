<?php

/**
 * 上下文环境
 *
 * the last known user to change this file in the repository  <$LastChangedBy: suqian $>
 * @author Su Qian <aoxue.1988.su.qian@163.com>
 * @version $Id: context.php 1532 2011-03-01 02:09:44Z suqian $
 * @package 
 */
interface  Context {

	public function insert($key,$value,$expires = '');
	
	public function get($key);
	
	public function delete($key);
	
	public function getAllCache();
}

?>