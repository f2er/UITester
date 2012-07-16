<?php

/**
 * Ark�����ļ�
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
	ARKSERVER=>'https://ark.taobao.ali.com:4430/arkserver/',
	SECRETCACHE=>'120',
	DYNAMICDOMAIN=> false,
	CLIENTTYPE=> 'app',
	CLIENTVERSION=>'oauth',
	SAFEVERSION=>'low',
	TOKENSTORETYPE=>'cookie',
	APPCODE=>'27ccf1e9e5d3477a88052db2c22f5681',
	LOGPATH=>'log',
	CONTEXTTYPE=>'session',
	APPATH => '/',
	LOGOUTPARAM=>'cmd',
	LOGOUTVALUE=>'out'
);

return $ArkConfig;

