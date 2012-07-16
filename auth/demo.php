<?php
/**
 * demo 页面
 * 
 * @author Su Qian <aoxue.1988.su.qian@163.com> 2010-11-2
 * @link http://www.apasframework.com
 * @copyright Copyright &copy; 2003-2010 http://www.apasframework.com
 * @license
 */


session_start();
require 'AuthBoot.php';
echo '<pre>';
print_r($ArkAuth->getAppUser());
print_r($_SESSION);








