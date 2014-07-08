//=============================================================
//Flurry初期設定
//=============================================================
var Flurry = require('com.onecowstanding.flurry');

Flurry.appVersion = Ti.App.version;
Flurry.debugLogEnabled = true;
Flurry.eventLoggingEnabled = true;
Flurry.sessionReportsOnCloseEnabled = true;
Flurry.sessionReportsOnPauseEnabled = true;
Flurry.sessionReportsOnActivityChangeEnabled = true;
Flurry.secureTransportEnabled = false;
Flurry.crashReportingEnabled = true;

switch(Ti.Platform.osname){
    case 'iphone':
        Ti.API.info("Flurry iPhoneスタート");
        Flurry.startSession('F5NQXW4FTH444BFF9939');
        break;
    case 'ipad':
        Ti.API.info("Flurry iPadスタート");
        break;
    case 'android':
        Ti.API.info("Flurry Androidスタート");
		Flurry.startSession();
        break;
}

Flurry.logAllPageViews();
Flurry.logEvent('test');

//=============================================================
//Ti.Appの初期化
//=============================================================

Ti.App.domain = "https://api.talkroom.co/";
//Ti.App.domain = "http://localhost:3000/";

//ログインユーザーのID
Ti.App.userID = 1;

//画面サイズの取得
Ti.App.displayWidth = Titanium.Platform.displayCaps.platformWidth;
Ti.App.displayHeight = Titanium.Platform.displayCaps.platformHeight;
Ti.App.navBarHeight = 44;

Ti.API.info("==================app_token:::::::::" + Ti.App.Properties.getString('app_token'));
Ti.API.info("==================my_id:::::::::" + Ti.App.Properties.getString('my_id'));

//=============================================================
//REQUIRE
//=============================================================
var fb = require('facebook');
var Storekit = require('ti.storekit');
//=============================================================
//消費ポイントの定義
//=============================================================
var _point;
var _peepPoint = 5;
var _privatePoint = 100;
var product100;
var product300;
var product500;

//=============================================================
//ソース
//=============================================================

// バックグラウンドカラーの設定
Titanium.UI.setBackgroundColor('#000');

/*
var tGroup = require('tabGroup');
var tabGroup = new tGroup();
tabGroup.open();
*/

var fbWindow = require('facebookWindow');
var facebookWindow = new fbWindow();
facebookWindow.open();


var tabGroup;
function createTabGroup(){
	var tGroup = require('tabGroup');
	tabGroup = new tGroup();
	
	tabGroup.addEventListener('open', function(){
		//レシート処理
		checkReceipt(function(){});
	});
	
	tabGroup.open();
}

//=======================================================================================
//Windowを返すファンクション
//=======================================================================================
function createWindow(titleName){
	var win = Titanium.UI.createWindow({  
		title: titleName,
		backgroundColor:'#fff',
		barImage:'images/bg/navBar_bg.png',
		titleControl: Ti.UI.createLabel({
	        text: titleName,
	        color:'#fff',
	        font:{fontFamily:'',fontSize:18},
	        shadowColor: 'gray',
	        shadowOffset: {x: 1, y: 1}
	    })
	});
	
	return win;
}

//=======================================================================================
//Windowを返すファンクション
//=======================================================================================
function consumePointDialog( type, callback ){
	var description;
	var consumePoint;
	if (type == "peep"){
		description = _peepPoint + 'ポイント消費して、\nこのルームをのぞきますか？';
		consumePoint = _peepPoint;
	}else if(type == "private"){
		description = _privatePoint + 'ポイント消費して、\nこのルームを非公開にしますか？';
		consumePoint = _privatePoint;
	}
	var alertDialog = Titanium.UI.createAlertDialog({
	    title: _point + 'ポイント保有',
	    message: description,
	    buttonNames: ['はい','いいえ'],
	    // キャンセルボタンがある場合、何番目(0オリジン)のボタンなのかを指定できます。
	    cancel: 1
	});
	alertDialog.addEventListener('click',function(event){
	    // Cancelボタンが押されたかどうか
	    if(event.cancel){
	        // cancel時の処理
	    }
	    // 選択されたボタンのindexも返る
	    if(event.index == 0){
	        // "OK"時の処理
	        if (_point >= consumePoint){
		        var url = Ti.App.domain + "consume_point.json?consume_point=" + consumePoint + "&app_token=" + Ti.App.Properties.getString('app_token');
				var methodGetData = require('commonMethods').getData;
				methodGetData(url, function( data ){
					if (data.success) {
						// 通信に成功したら行う処理
						_point = parseInt(data.data);
						callback({success: true});
					} else{
						// 通信に失敗したら行う処理
						alert("通信に失敗しました");
					}
				});
			}else{
				alert("ポイントが足りません");
			}
	    }
	});
	alertDialog.show();
}

function requestProduct(identifier, success)
{
	//showLoading();
	Storekit.requestProducts([identifier], function (evt) {
		//hideLoading();
		//alert("requestProduct");
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

if (!Storekit.canMakePayments)
	alert('通信またはその他の原因で現在購入の操作ができません。\nもう一度購入手続きをしてください。');
else {
	requestProduct('jp.shiftage.talkroom.testpoint100', function (product) {
		product100 = product;
		/*
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
		*/
	});

	requestProduct('jp.shiftage.talkroom.testpoint300', function (product) {
		product300 = product;
		/*
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
		*/
	});
	
	requestProduct('jp.shiftage.talkroom.testpoint500', function (product) {
		product500 = product;
		/*
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
		*/
	});
}


//=======================================================================================
// レシート検証をする関数
//=======================================================================================
/*
function verifyReceipt(receipt){
  var url = Ti.App.domain + "/verify_receipt";

  var client = Ti.Network.createHTTPClient({
    onload : function(e) {
      // 認証済み
      _point = parseInt(this.responseText);
      //Ti.API.info("Received text: " + _point);
      alert(_point + 'ポイントになりました');

      // 成功時はレシートをクリアする
      Ti.App.Properties.removeProperty('Receipt'); 
    },
    onerror : function(e) {
      Ti.API.debug(e.error);
      alert('error' + this.responseText);
    },
    timeout : 5000  // in milliseconds
  });

  // Prepare the connection.
  client.open("POST", url);
  // Send the request.
  client.send({
    app_token: Ti.App.Properties.getString('app_token'),
    receipt: receipt
  });
}
*/
//=======================================================================================
// 未処理のレシートがないか確認し，あれば処理を再開する
//=======================================================================================
function checkReceipt(callback){
  var receipt = Ti.App.Properties.getString('Receipt', ''); 

  // すべて処理済み
  if(receipt === ''){
    return;
  }

  //verifyReceipt(receipt);
  var url = Ti.App.domain + "/verify_receipt";

  var client = Ti.Network.createHTTPClient({
    onload : function(e) {
      // 認証済み
      _point = parseInt(this.responseText);
      //Ti.API.info("Received text: " + _point);

      // 成功時はレシートをクリアする
      Ti.App.Properties.removeProperty('Receipt');
      callback({
		success: true
	  });
	  alert(_point + 'ポイントになりました');
    },
    onerror : function(e) {
      Ti.API.debug(e.error);
      alert('error' + this.responseText);
      callback({
		success: false
	  });
    },
    timeout : 5000  // in milliseconds
  });

  // Prepare the connection.
  client.open("POST", url);
  // Send the request.
  client.send({
    app_token: Ti.App.Properties.getString('app_token'),
    receipt: receipt
  });
}


//=======================================================================================
// 未処理のレシートがないか確認し，あれば処理を再開する
//=======================================================================================
function readPoint(){
  	var url = Ti.App.domain + "/get_point.json?app_token=" + Ti.App.Properties.getString('app_token');
	var commonMethods = require('commonMethods');
	var methodGetData = commonMethods.getData;
	methodGetData(url, function( data ){
		if (data.success) {
			// 通信に成功したら行う処理
			_point = parseInt(data.data);
		} else{
			// 通信に失敗したら行う処理
		}
	});
}

