<?php
require_once 'Common.php';

$context = ArkFactory::getContext();
//开始认证请求
$ArkAuth = ArkFactory::getArkAuth();

$ArkAuth->OnAuthRequest($context);

