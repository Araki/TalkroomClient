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

//=============================================================
//消費ポイントの定義
//=============================================================
readPoint();
var point;
var peepPoint = 5;
var privatePoint = 100;

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
		checkReceipt();
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
		description = peepPoint + 'ポイント消費して、\nこのルームをのぞきますか？';
		consumePoint = peepPoint;
	}else if(type == "private"){
		description = privatePoint + 'ポイント消費して、\nこのルームを非公開にしますか？';
		consumePoint = privatePoint;
	}
	var alertDialog = Titanium.UI.createAlertDialog({
	    title: point + 'ポイント保有',
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
	        if (point >= consumePoint){
		        var url = Ti.App.domain + "consume_point.json?consume_point=" + consumePoint + "&app_token=" + Ti.App.Properties.getString('app_token');
				var methodGetData = require('commonMethods').getData;
				methodGetData(url, function( data ){
					if (data.success) {
						// 通信に成功したら行う処理
						point = data.data;
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


//=======================================================================================
// レシート検証をする関数
//=======================================================================================
function verifyReceipt(receipt){
  var url = Ti.App.domain + "/verify_receipt";

  var client = Ti.Network.createHTTPClient({
    onload : function(e) {
      // 認証済み
      Ti.API.info("Received text: " + this.responseText);
      alert('success');

      // 成功時はレシートをクリアする
      Ti.App.Properties.removeProperty('Receipt'); 
    },
    onerror : function(e) {
      Ti.API.debug(e.error);
      Ti.API.info("Received text: " + this.responseText);
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

//=======================================================================================
// 未処理のレシートがないか確認し，あれば処理を再開する
//=======================================================================================
function checkReceipt(){
  var receipt = Ti.App.Properties.getString('Receipt', ''); 

  // すべて処理済み
  if(receipt === ''){
    return;
  }

  verifyReceipt(receipt);
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
			point = data.data;
		} else{
			// 通信に失敗したら行う処理
		}
	});
}

