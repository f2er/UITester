<?php

/**
 * Ark配置文件
 */
define('ARKSERVER','arkserver');
define('SECRETCACHE','secretcache');
define('DYNAMICDOMAIN','dynamicdomain');
define('CLIENTTYPE','arkclienttype');
define('CLIENTVERSION','arkclientversion');
define('SAFEVERSION','safeversion');
define('TOKENSTORETYPE','tokenstoretype');
define('APPCODE','appcode');
define('LOGPATH','logpath');
define('CONTEXTTYPE','contexttype');
define('APPATH','appath');
define('LOGOUTPARAM','logoutparam');
define('LOGOUTVALUE','logoutvalue');

$ArkConfig = array(
	ARKSERVER=>'https://ark.taobao.org:4430/arkserver',
	SECRETCACHE=>'120',
	DYNAMICDOMAIN=> false,
	CLIENTTYPE=> 'app',
	CLIENTVERSION=>'oauth',
	SAFEVERSION=>'low',
	TOKENSTORETYPE=>'cookie',
	APPCODE=>'1756bfbf36de40b596ca8401ca70a8e7',
	LOGPATH=>'log',
	CONTEXTTYPE=>'session',
	APPATH => '/',
	LOGOUTPARAM=>'cmd',
	LOGOUTVALUE=>'out'
);

return $ArkConfig;

