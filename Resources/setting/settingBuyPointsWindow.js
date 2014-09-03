function settingBuyPointsWindow() {
	var verifyingReceipts = false;
	var loading = createActInd();
	var loadingCount = 0;
	function showLoading(){
		loadingCount += 1;
		if (loadingCount == 1) {
			loading.show();
		}
	}
	function hideLoading(){
		if (loadingCount > 0) {
			loadingCount -= 1;
			if (loadingCount == 0) {
				loading.hide();
			}
		}
	}	
  	// レシート処理
  	showLoading();
  	checkReceipt(function(){hideLoading();});
  	//alert(Ti.App.Properties.getString('Receipt', ''));
	
	var self = createWindow("ポイント購入");
	
	//閉じるときに Storekit のイベントリスナーを削除
	self.addEventListener('close', function(){
		Storekit.removeEventListener('transactionState', onTransactionState);
	});
	
	//alert("POINT" + _point);
	var pointLabel = Ti.UI.createLabel({
		font:{fontFamily: _font, fontSize:18},
		textAlign: "left",
        text: "所有ポイント: " + _point + "ポイント",
       	color:_darkBlue,
       	top:10,
       	left:30
	});
	self.add(pointLabel);
 
	Storekit.receiptVerificationSandbox = true;//(Ti.App.deployType !== 'production');
	
	Storekit.bundleVersion = "1.0";
	Storekit.bundleIdentifier = "jp.shiftage.talkroom";
	
	function isIOS7Plus()
	{
		if (Titanium.Platform.name == 'iPhone OS')
		{
			var version = Titanium.Platform.version.split(".");
			var major = parseInt(version[0],10);
	
			// can only test this support on a 3.2+ device
			if (major >= 7)
			{
				return true;
			}
		}
		return false;
	
	}
	//◆◆◆もし本番の場合、「//」を取り、Titaniumからビルドし、xcodeprojファイルを立ち上げ「Version」を「bundleVersion」と一致させXcodeからビルドする
	var IOS7 = false;//isIOS7Plus();
	 
	var onTransactionState = function (evt) {
		switch (evt.state) {
			case Storekit.TRANSACTION_STATE_FAILED:
				hideLoading();
				//alert("TRANSACTION_STATE_FAILED");
				if (evt.cancelled) {
					alert('購入をキャンセルしました');
				} else {
					alert('購入に失敗しました。  ' + evt.message);
				}
				evt.transaction && evt.transaction.finish();
				break;
			case Storekit.TRANSACTION_STATE_PURCHASED:
				//setProperties(evt.receipt);
				receiptSignature = Ti.Utils.base64encode(evt.receipt).text;
		    	Ti.App.Properties.setString('Receipt', receiptSignature); 
		
		    	// レシート検証
		    	checkReceipt(function(data){
		    		if(data.success){
		    			pointLabel.text = "所有ポイント: " + _point + "ポイント";
		    			hideLoading();
						//alert('購入が完了しました');
		    		}
		    	});
				break;
			case Storekit.TRANSACTION_STATE_PURCHASING:
				//Ti.API.info('Purchasing ' + evt.productIdentifier);
				break;
			case Storekit.TRANSACTION_STATE_RESTORED:
				//Ti.API.info('Restored ' + evt.productIdentifier);
				break;
		}
	};
	
	Storekit.addEventListener('transactionState', onTransactionState);
	 
	function purchaseProduct(product)
	{
		if (product.downloadable) {
			//Ti.API.info('Purchasing a product that is downloadable');
		}
		showLoading();
		Storekit.purchase({
			product: product
		});
	}
	 
	Storekit.addTransactionObserver();
	
	if (IOS7) {
		self.addEventListener('open', function() {
			function validate() {
				//Ti.API.info('Validating receipt.');
				//Ti.API.info('Receipt is Valid: ' + Storekit.validateReceipt());
			}

			if (!Storekit.receiptExists) {
				//Ti.API.info('Receipt does not exist yet. Refreshing to get one.');
				Storekit.refreshReceipt(null, function(){
					validate();
				});
			} else {
				//Ti.API.info('Receipt does exist.');
				validate();
			}
		});
	}
	
  	// Receipt にレシート情報を保存
  	function setProperties(receipt){
    	receiptSignature = Ti.Utils.base64encode(receipt).text;
    	Ti.App.Properties.setString('Receipt', receiptSignature); 

    	//Ti.API.info('***** Changed receipt *****');
    	//Ti.API.debug(receipt);

    	// レシート検証
    	checkReceipt(function(){});
  	}
  	
  	var buy100points = Ti.UI.createButton({
		title:product100.title + '  ' + product100.formattedPrice + 'で購入する',
		font:{fontSize: 16, fontFamily: _font},
		top:50, 
		left:25,
		right:25,
		height:40,
		color: _white,
		backgroundColor: _vividPink,
		borderRadius:10
	});
	buy100points.addEventListener('click', function () {
		Flurry.logEvent('SettingBuyPointsWindow Push Buy100Points');
		purchaseProduct(product100);
	});
	self.add(buy100points);
  	
  	var buy600points = Ti.UI.createButton({
		title:product600.title + '  ' + product600.formattedPrice + 'で購入する',
		font:{fontSize: 16, fontFamily: _font},
		top:110, 
		left:25, 
		right:25, 
		height:40,
		color: _white,
		backgroundColor: _vividPink,
		borderRadius:10
	});
	buy600points.addEventListener('click', function () {
		Flurry.logEvent('SettingBuyPointsWindow Push Buy600Points');
		purchaseProduct(product600);
	});
	self.add(buy600points);
  
  	var buy1200points = Ti.UI.createButton({
		title:product1200.title + '  ' + product1200.formattedPrice + 'で購入する',
		font:{fontSize: 16, fontFamily: _font},
		top:170, 
		left:25, 
		right:25, 
		height:40,
		color: _white,
		backgroundColor: _vividPink,
		borderRadius:10
	});
	buy1200points.addEventListener('click', function () {
		Flurry.logEvent('SettingBuyPointsWindow Push Buy1200Points');
		purchaseProduct(product1200);
	});
	self.add(buy1200points);
	
	var buy3000points = Ti.UI.createButton({
		title:product3000.title + '  ' + product3000.formattedPrice + 'で購入する',
		font:{fontSize: 16, fontFamily: _font},
		top:230, 
		left:25, 
		right:25, 
		height:40,
		color: _white,
		backgroundColor: _vividPink,
		borderRadius:10
	});
	buy3000points.addEventListener('click', function () {
		Flurry.logEvent('SettingBuyPointsWindow Push Buy3000Points');
		purchaseProduct(product3000);
	});
	self.add(buy3000points);
	
	var buy6000points = Ti.UI.createButton({
		title:product6000.title + '  ' + product6000.formattedPrice + 'で購入する',
		font:{fontSize: 16, fontFamily: _font},
		top:290, 
		left:25, 
		right:25, 
		height:40,
		color: _white,
		backgroundColor: _vividPink,
		borderRadius:10
	});
	buy6000points.addEventListener('click', function () {
		Flurry.logEvent('SettingBuyPointsWindow Push Buy6000Points');
		purchaseProduct(product6000);
	});
	self.add(buy6000points);
  
  	self.add(loading);
	return self;
}

module.exports = settingBuyPointsWindow;
