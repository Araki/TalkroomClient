function settingBuyPointsWindow() {
  // レシート処理
  checkReceipt();
  
	var self = createWindow("ポイント購入");
	
	/*======================================
	 * 修正箇所（始まり）
	 ======================================*/
	
	var Storekit = require('ti.storekit');
 
	Storekit.receiptVerificationSandbox = true;//(Ti.App.deployType !== 'production');
	
	Storekit.bundleVersion = "1.0";
	Storekit.bundleIdentifier = "jp.shiftage.talkroom";
	
	var verifyingReceipts = false;
	 
	var loading = Ti.UI.createActivityIndicator({
		bottom:10, height:50, width:50,
		backgroundColor:'black', borderRadius:10,
		style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG
	});
	
	var loadingCount = 0;
	function showLoading()
	{
		loadingCount += 1;
		if (loadingCount == 1) {
			loading.show();
		}
	}
	function hideLoading()
	{
		if (loadingCount > 0) {
			loadingCount -= 1;
			if (loadingCount == 0) {
				loading.hide();
			}
		}
	}
	self.add(loading);
	
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
	 
	function requestProduct(identifier, success)
	{
		showLoading();
		Storekit.requestProducts([identifier], function (evt) {
			hideLoading();
			if (!evt.success) {
				alert('ERROR: We failed to talk to Apple!');
			}
			else if (evt.invalid) {
				alert('ERROR: We requested an invalid product!');
			}
			else {
				success(evt.products[0]);
			}
		});
	}
	 
	Storekit.addEventListener('transactionState', function (evt) {
		hideLoading();
		switch (evt.state) {
			case Storekit.TRANSACTION_STATE_FAILED:
				if (evt.cancelled) {
					alert('購入をキャンセルしました');
				} else {
					alert('購入に失敗しました。  ' + evt.message);
				}
				evt.transaction && evt.transaction.finish();
				break;
			case Storekit.TRANSACTION_STATE_PURCHASED:
				
				//alert(evt.receipt);
				setProperties(evt.receipt);
				alert('購入が完了しました');
					
				/*
				if (verifyingReceipts) {
					if (IOS7) {
						var msg = Storekit.validateReceipt() ? 'Receipt is Valid!' : 'Receipt is Invalid.'; 
						alert(msg);
					} else {
						Storekit.verifyReceipt(evt, function (e) {
							if (e.success) {
								if (e.valid) {
									alert('Thanks! Receipt Verified');
									//markProductAsPurchased(evt.productIdentifier);
								} else {
									alert('Sorry. Receipt is invalid');
								}
							} else {
								alert(e.message);
							}
						});
					}
				} else {
					alert('購入が完了しました');
					alert(evt.receipt);
					setProperties(evt.receipt);
					//markProductAsPurchased(evt.productIdentifier);
				}
				if (evt.downloads) {
					Storekit.startDownloads({
						downloads: evt.downloads
					});
				} else {
					evt.transaction && evt.transaction.finish();
				}
				*/
				
				break;
			case Storekit.TRANSACTION_STATE_PURCHASING:
				Ti.API.info('Purchasing ' + evt.productIdentifier);
				break;
			case Storekit.TRANSACTION_STATE_RESTORED:
				Ti.API.info('Restored ' + evt.productIdentifier);
				break;
		}
	});
	 
	function purchaseProduct(product)
	{
		if (product.downloadable) {
			Ti.API.info('Purchasing a product that is downloadable');
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
				Ti.API.info('Validating receipt.');
				Ti.API.info('Receipt is Valid: ' + Storekit.validateReceipt());
			}

			if (!Storekit.receiptExists) {
				Ti.API.info('Receipt does not exist yet. Refreshing to get one.');
				Storekit.refreshReceipt(null, function(){
					validate();
				});
			} else {
				Ti.API.info('Receipt does exist.');
				validate();
			}
		});
	}
	
	if (!Storekit.canMakePayments)
		alert('通信またはその他の原因で現在購入の操作ができません。\nもう一度購入手続きをしてください。');
	else {
		requestProduct('jp.shiftage.talkroom.testpoint100', function (product) {
			var buy100points = Ti.UI.createButton({
				title:'Buy ' + product.title + ', ' + product.formattedPrice,
				top:60, left:5,
				right:5,
				height:40,
				borderColor:"#1E90FF",
				borderRadius:5
			});
			buy100points.addEventListener('click', function () {
				purchaseProduct(product);
			});
			self.add(buy100points);
		});
	
		requestProduct('jp.shiftage.talkroom.testpoint300', function (product) {
			var buy300points = Ti.UI.createButton({
				title:'Buy ' + product.title + ', ' + product.formattedPrice,
				top:110, 
				left:5, 
				right:5, 
				height:40,
				borderColor:"#1E90FF",
				borderRadius:5
			});
			buy300points.addEventListener('click', function () {
				purchaseProduct(product);
			});
			self.add(buy300points);
		});
		
		requestProduct('jp.shiftage.talkroom.testpoint500', function (product) {
			var buy500points = Ti.UI.createButton({
				title:'Buy ' + product.title + ', ' + product.formattedPrice,
				top:160, 
				left:5, 
				right:5, 
				height:40,
				borderColor:"#1E90FF",
				borderRadius:5
			});
			buy500points.addEventListener('click', function () {
				purchaseProduct(product);
			});
			self.add(buy500points);
		});
	}
	
  // Receipt にレシート情報を保存
  function setProperties(receipt){
    receiptSignature = Ti.Utils.base64encode(receipt).text;
    Ti.App.Properties.setString('Receipt', receiptSignature); 

    Ti.API.info('***** Changed receipt *****');
    Ti.API.debug(receipt);

    // レシート検証
    checkReceipt();
  }

	
	
	
	/*======================================
	 * 修正箇所（終わり）
	 ======================================*/
	
	return self;
}

module.exports = settingBuyPointsWindow;
