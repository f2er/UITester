//产品线的逻辑
jQuery(document).ready(function() {
	var $ = jQuery;

	var productlines = {"1":"uitest","84":"基础业务","85":"SNS[业务]-SNS基础平台","86":"商品平台","87":"业务安全[业务]","88":"商户平台[业务]-分销平台","92":"商户平台[业务]-建站平台","94":"开放平台","95":"技术质量[业务]-测试平台","98":"商品平台-商城（老）","105":"商户平台[业务]","106":"SNS[业务]","110":"SNS[业务]-SNS关系平台","111":"SNS[业务]-SNS产品","118":"运营服务","147":"运营服务-运营平台","148":"商品平台-前台商品展示","149":"商品平台-商品搜索","150":"商品平台-试衣间","155":"基础业务-数据应用","156":"基础业务-old交易后","158":"基础业务-交易支撑","206":"外部产品线","257":"UED","258":"UED-淘宝首页","259":"UED-淘宝商城前端","260":"UED-数据平台与产品","261":"UED-淘宝搜索","262":"UED-交易线&新业务","263":"UED-运营支撑","269":"UED-北京新业务","286":"UED-商户&开放平台","287":"UED-无线&SNS&门户","331":"UED-无名良品","336":"通用产品","418":"SNS[业务]-SNS营销","477":"数字产品","478":"数字产品-网站平台","479":"数字产品-电视淘宝","480":"数字产品-生产系统","543":"商户平台[业务]-多媒体平台","544":"商户平台[业务]-物流平台","545":"商户平台[业务]-卖家后台","546":"商户平台[业务]-卖家营销平台","561":"商品平台-店铺街","565":"商品平台-社区导购","590":"商品平台-外卖","607":"商品平台-垂直市场","640":"SNS[业务]-BIT","654":"北京研发中心","655":"北京研发中心-基金","656":"北京研发中心-旅行社区","657":"北京研发中心-旅行无线","658":"北京研发中心-国内机票","659":"北京研发中心-酒店","660":"北京研发中心-门票","691":"北京研发中心-彩票","697":"北京研发中心-充值","724":"北京研发中心-信息","738":"数字产品-P2P","739":"基础业务-old交易前old","740":"基础业务-交易退款","741":"基础业务-评价","742":"基础业务-old交易核心","743":"技术质量[业务]","744":"技术质量[业务]-前端测试__","745":"技术质量[业务]-质量度量__Q方","746":"技术质量[业务]-Build&Regress__全网回归","747":"技术质量[业务]-开发自测__BIT","748":"技术质量[业务]-性能测试__PAP","749":"技术质量[业务]-安全风险控制团队产品","750":"技术质量[业务]-测试设计__测试用例","751":"技术质量[业务]-缺陷生命周期__缺陷管理","753":"北京研发中心-淘大","754":"北京研发中心-淘工作","764":"技术质量[业务]-WebUI自动化__automan","765":"技术质量[业务]-Mobile自动化_TMTS","766":"技术质量[业务]-Win32自动化__automan","767":"技术质量[业务]-API自动化__itest","769":"技术质量[业务]-性能评估__CSP","770":"技术质量[业务]-反欺诈__TSS","771":"商户平台[业务]-淘宝助理","772":"商户平台[业务]-卖家中心","773":"北京研发中心-保险","774":"北京研发中心-国际机票","777":"开放平台-综合业务平台","778":"开放平台-开放平台API","779":"开放平台-基础服务平台","781":"SNS[业务]-SNS互动","782":"北京研发中心-万花筒","783":"北京研发中心-彩票无线","784":"北京研发中心-二手无线","785":"SNS[业务]-SNS无线","787":"SNS[业务]-淘礼","791":"商品平台-前端测试","792":"前端测试全网回归","793":"前端测试全网回归-消费者技术质量之前端测试","795":"前端测试全网回归-SNS前端测试","796":"前端测试全网回归-商户平台前端测试","797":"前端测试全网回归-商城会员营销前端测试","807":"北京研发中心-旅游","808":"北京研发中心-无线公共","809":"技术质量[业务]-测试数据_数据工厂","811":"商户平台[业务]-卖家发布","813":"通用产品-消息中间件","814":"通用产品-服务框架","815":"通用产品-数据层","816":"通用产品-业务支持","818":"运营服务-工单平台","819":"运营服务-服务大厅","820":"运营服务-VOC","821":"北京研发中心-充值无线","830":"基础业务-电子凭证","831":"技术质量[业务]-分布式系统测试工具__DST","835":"基础业务-淘宝C2B","836":"商户平台[业务]-卖家成长","838":"开放平台-安卓应用中心","846":"基础业务-商品中心","848":"技术质量[业务]-做好做通_康巴斯","853":"开放平台-买家应用中心","854":"技术质量[业务]-国外IP访问回归","868":"无障碍测试全网回归","870":"基础业务-交易中心","876":"商品平台-导购店铺","883":"数字产品-电子书多终端","884":"数字产品-后台系统","887":"数据支撑【商品平台】","888":"数据支撑【商品平台】-UIC","889":"数据支撑【商品平台】-TBSESSION","890":"数据支撑【商品平台】-VIP","891":"数据支撑【商品平台】-LOGIN","892":"数据支撑【商品平台】-MBIS","893":"数据支撑【商品平台】-BI","894":"数据支撑【商品平台】-淘数据","10883":"垂直市场[业务]","10884":"导购[业务]","10885":"服务平台[业务]","10886":"交易[业务]","10887":"商品[业务]","10888":"收藏夹[业务]","10889":"旺铺[业务]","10890":"用户中心[业务]","10893":"数据应用[业务]","10894":"电子书[业务]","10895":"视频[业务]","10896":"彩票[业务]","10897":"保险[业务]","10898":"理财[业务]","10899":"旅行[业务]","10900":"虚拟充值[业务]","10902":"应用中心[业务]","10903":"运营平台[业务]","10904":"中间件&稳定性平台[业务]","10905":"新业务手机客户端[业务]","10906":"信息[业务]","10907":"页游[业务]","10908":"电子凭证[业务]","10917":"商户平台[业务]-阿里学院","10923":"淘宝规则实验室","10925":"综合业务平台","10938":"北京研发中心-游戏"};

	//是个select, 放option
	if($('#productline').length && $('#productline')[0].tagName == 'SELECT') {
		if($('#productline option').length > 1) {		//仅仅填充
			$.each($('#productline option'), function(key, option) {
				var key = $(option).attr('value');
				key && $(option).html(productlines[key]);
			});
		} else {
			$.each(productlines, function(line, key) {
				$('#productline').append('<option value="'+line+'">'+key+'</option>')
			});
		}
		$('#productline').val($('#productline').val('data-value'));
	}

	//是个span, 取值
	if($('#productline').length && $('#productline')[0].tagName == 'SPAN') {
		$('#productline').html(productlines[$('#productline').attr('data-id')]);
	}

	//是个span, 取值
	if($('#weeks').length && $('#weeks')[0].tagName == 'SPAN') {
		var ids = $('#weeks').attr('data-id');
		var value = $.map(ids.split(','), function(id) {
			return '星期' + ['七','一','二','三','四','五','六','七'][$.trim(id)];
		}).join(', ');
		$('#weeks').html(value);
	}
});

