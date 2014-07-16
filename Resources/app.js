//=============================================================
//REQUIRE
//=============================================================
var fb = require('facebook');
var Storekit = require('ti.storekit');

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

//画面サイズの取得
Ti.App.displayWidth = Titanium.Platform.displayCaps.platformWidth;
Ti.App.displayHeight = Titanium.Platform.displayCaps.platformHeight;
Ti.App.navBarHeight = 44;

Ti.API.info("==================app_token:::::::::" + Ti.App.Properties.getString('app_token'));
Ti.API.info("==================my_id:::::::::" + Ti.App.Properties.getString('my_id'));

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


var fbWindow = require('facebookWindow');
var facebookWindow = new fbWindow();
facebookWindow.open();


var tabGroup;
function createTabGroup(){
	
	//ポイントの読み込み
	readPoint();
	
	var tGroup = require('tabGroup');
	tabGroup = new tGroup();
	
	tabGroup.addEventListener('open', function(){
		//レシート処理
		checkReceipt(function(){});
	});
	
	tabGroup.open();
}

//############################################################
//############################################################
//############################################################
//############################################################
//以下、ファンクション
//############################################################
//############################################################
//############################################################
//############################################################

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

function createActInd() {
	var actInd = Titanium.UI.createActivityIndicator({
		height:'100%',
		width:'100%',
		font: {fontFamily:'Helvetica Neue', fontSize:16, fontWeight:'bold'},
		color: 'white',
		backgroundColor:'black',
		opacity: 0.5,
		//borderRadius:5,
		style:(Ti.Platform.name === 'iPhone OS' ? Ti.UI.iPhone.ActivityIndicatorStyle.BIG : Ti.UI.ActivityIndicatorStyle.BIG), //DARK,PLAIN
		//message: "ローディング中"
	});
	return actInd;
}

//=======================================================================================
//カメラを起動するファンクション
//=======================================================================================
function showCamera(win, whichImage){
	var currentWindow = win;
	Titanium.Media.showCamera({
		success:function(event)
		{
			var cropRect = event.cropRect;
			var image = event.media;
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
			{
				uploadImage(image, currentWindow, whichImage);
			}
			else
			{
				alert("got the wrong type back ="+event.mediaType);
			}
		},
		cancel:function()
		{
		},
		error:function(error)
		{
			// create alert
			var a = Titanium.UI.createAlertDialog({title:'Camera'});
	
			// set message
			if (error.code == Titanium.Media.NO_CAMERA)
			{
				a.setMessage('Please run this test on device');
			}
			else
			{
				a.setMessage('Unexpected error: ' + error.code);
			}
	
			// show alert
			a.show();
		},
		saveToPhotoGallery:false,
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

//=======================================================================================
//アルバムを起動するファンクション
//=======================================================================================
function showGallery(win, whichImage){
	var currentWindow = win;
	Titanium.Media.openPhotoGallery({
		success: function(event) {
	        // カメラロールで写真を選択した時の挙動(カメラと同様)
	        var cropRect = event.cropRect;
			var image = event.media;
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
			{
				uploadImage(image, currentWindow, whichImage);
			}
	    },
	    error: function(error) {
	        // notify(e.message);
	    },
	    cancel: function() {
	        // キャンセル時の挙動
	    },
	    // 選択直後に拡大縮小移動をするか否かのフラグ
	    allowEditing: true,
	    // 選択可能なメディア種別を配列で指定
	    mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
	});
}


//=======================================================================================
//画像をアップロードするファンクション
//=======================================================================================
function uploadImage(image, win, whichImage){
	var currentWindow = win;
	var ind = Titanium.UI.createProgressBar({
		height:'100%',
		width:'100%',
		min:0,
		max:1,
		value:0,
		style:Titanium.UI.iPhone.ProgressBarStyle.DEFAULT,
		//top:200,
		message:'Uploading image',
		font:{fontSize:12, fontWeight:'bold'},
		backgroundColor:'black',
		opacity: 0.5,
		color: 'white'
	});
	
	currentWindow.add(ind);
	ind.show();
	
	var resizedImage;
	if(image.width >= image.height){
		var resizedHeight = (200 * image.height)/image.width;
		resizedImage = image.imageAsResized(200, resizedHeight);
	}else{
		var resizedWidth = (200 * image.width)/image.height;
		resizedImage = image.imageAsResized(resizedWidth, 200);
	}
	
	var xhr = Ti.Network.createHTTPClient();
	var url = Ti.App.domain + "/upload_image.json";
	xhr.onsendstream = function(e){
		ind.value = e.progress;
		ind.message = 'Uploading photo, please wait... ' + (Math.round(e.progress * 100)).toString().replace(".","") + '%';
	};
	xhr.open('POST', url);
	xhr.send({
		app_token: Ti.App.Properties.getString('app_token'),
		media:resizedImage,
		which_image: whichImage
	});
	
	xhr.onload = function(){
		ind.hide();
		//alert("レスポンス" + xhr.responseText);
		if(xhr.responseText == "success"){
			reloadImage(currentWindow, whichImage);
			alert("アップロード成功");
		}else{
			alert("アップロードに失敗しました");
		}
		//var json = JSON.parse(xhr.responseText);
	};
	xhr.onerror = function(){
		ind.hide();
		alert("アップロードに失敗しました");
	};
}

//=======================================================================================
//Facebookのプロフィール画像を登録するファンクション
//=======================================================================================
function registFBProfileImage( win ){
	var currentWindow = win;
	var ind = Titanium.UI.createActivityIndicator({
		height:'100%',
		width:'100%',
		font: {fontFamily:'Helvetica Neue', fontSize:16, fontWeight:'bold'},
		color: 'white',
		backgroundColor:'black',
		opacity: 0.5,
		//borderRadius:5,
		style:(Ti.Platform.name === 'iPhone OS' ? Ti.UI.iPhone.ActivityIndicatorStyle.BIG : Ti.UI.ActivityIndicatorStyle.BIG), //DARK,PLAIN
		//message: "ローディング中"
	});
	
	currentWindow.add(ind);
	ind.show();
	
	var xhr = Ti.Network.createHTTPClient();
	var url = Ti.App.domain + "/upload_fb_image.json";
	xhr.open('POST', url);
	xhr.send({
		app_token: Ti.App.Properties.getString('app_token')
	});
	xhr.onload = function(){
		ind.hide();
		if(xhr.responseText == "success"){
			reloadImage(currentWindow, "profile_image1");
			alert("アップロード成功");
		}else{
			alert("アップロードに失敗しました");
		}
	};
	xhr.onerror = function(){
		ind.hide();
		alert("アップロードに失敗しました");
	};
}

//=======================================================================================
//アプリ側に画像キャッシュが残るので即時反映したい場合のリロードファンクション
//=======================================================================================
function reloadImage(window, image){
	//alert(window.children[0].data[0].rows[0].children[1].url);
	switch(image){
		case 'profile_image1':
			var url = window.children[0].data[0].rows[0].children[1].url;
			var urlArray = url.split("?");
			window.children[0].data[0].rows[0].children[1].image = urlArray[0] + "?" + new Date().getTime(); 
	    	break;
	    case 'profile_image2':
	    	var url = window.children[0].data[0].rows[0].children[3].url;
	    	if(url != null){
				var urlArray = url.split("?");
				window.children[0].data[0].rows[0].children[3].image = urlArray[0] + "?" + new Date().getTime();
			}else{
				var url = window.children[0].data[0].rows[0].children[1].url;
				var modifiedurl = url.replace("image1", "image2");
				var urlArray = modifiedurl.split("?");
				window.children[0].data[0].rows[0].children[3].image = urlArray[0] + "?" + new Date().getTime();
			} 
	    	break;
	    case 'profile_image3':
	    	var url = window.children[0].data[0].rows[0].children[5].url;
	    	if(url != null){
	    		var urlArray = url.split("?");	
	    		window.children[0].data[0].rows[0].children[5].image = urlArray[0] + "?" + new Date().getTime();
	    	}else{
	    		var url = window.children[0].data[0].rows[0].children[1].url;
				var modifiedurl = url.replace("image1", "image3");
				var urlArray = modifiedurl.split("?");
				window.children[0].data[0].rows[0].children[5].image = urlArray[0] + "?" + new Date().getTime();
	    	}			 
	    	break;
	}
}

//=======================================================================================
//ポイント消費確認ダイアログを表示するファンクション
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
				getData(url, function( data ){
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


//課金リクエスト部分
function requestProduct(identifier, success)
{
	//showLoading();
	Storekit.requestProducts([identifier], function (evt) {
		//hideLoading();
		//alert("requestProduct");
		if (!evt.success) {
			//alert('ERROR: We failed to talk to Apple!');
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
	getData(url, function( data ){
		if (data.success) {
			// 通信に成功したら行う処理
			_point = parseInt(data.data);
		} else{
			// 通信に失敗したら行う処理
		}
	});
}

//=======================================================================================
//サーバーからデータを取ってくるファンクション
//=======================================================================================

//val: URLを指定
//callback: 呼び出し側で指定するcallback関数

function　getData(val ,callback) {
	
	var url = val;
		
	//HTTPClientを生成する
	var xhr = Titanium.Network.createHTTPClient();
	xhr.timeout = 10000;
	//SSL通信
	//xhr.validatesSecureCertificate = false;
	
	//HTTPClientを開く
	xhr.open("GET", url);
	
	//通信が完了した場合の処理
	xhr.onload = function(){
		Ti.API.info("パース前：" + this.responseText);
		Ti.API.info("パース後：" + JSON.parse(this.responseText));
		callback({
			success: true,
			data: JSON.parse(this.responseText)
		});
	};
	
	//エラー発生時の処理
	xhr.onerror = function(e){
		callback({
			success: false,
			data: e
		});
	};

	//HTTPClientで通信開始
	xhr.send();
}



//=======================================================================================
//サーバーにデータを送るファンクション
//=======================================================================================

//val: URLを指定
//data: 送信するデータ
//callback: 呼び出し側で指定するcallback関数

function sendData( val, data, callback ){
	
	var url = val;
	var sendData = data;
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.timeout = 10000;
		
	xhr.open('POST', url);
		
	xhr.onload = function(){
		Ti.API.info("返って来たデータ:" + this.responseText);
		callback({
			success: true,
			data: this.responseText
		});
	};
	
	xhr.onerror = function(e){
		callback({
			success: false,
			data: e
		});
	};
	
	xhr.send( sendData );
}



//=======================================================================================
//pickerViewを表示するファンクション
//=======================================================================================
function createPickerView( data, tf ){
	
	var dataList = data;
	var textField = tf;
	//var customItem = selectItem;

	var self = Titanium.UI.createView({
		height: 251,
		bottom: -251
	});
	
	var doneButton = Titanium.UI.createButton({
		title: '完了',
		style: Titanium.UI.iPhone.SystemButtonStyle.DONE
	});

	var spacer = Titanium.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var toolbar = Titanium.UI.iOS.createToolbar({
		top: 0,
		items: [spacer, doneButton]
	});

	var picker = Ti.UI.createPicker({
		top: 43
	});
	picker.selectionIndicator = true;
	
	picker.add(dataList);
	
	//Pickerのツールバーの完了ボタンが押された時の挙動
	doneButton.addEventListener('click', function(e){
		pickerSlideOut(Ti.UI.currentWindow, self);
	});
	
	//Pickerの選択が変わった時の挙動
	picker.addEventListener('change', function(e){
		textField.value = e.row.title;
		textField.customItem = e.row.custom_item;
	});

	self.add(toolbar);
	self.add(picker);
	
	return self;
}



//=======================================================================================
//pickerViewがスライドアウトするアニメーションファンクション
//=======================================================================================

function pickerSlideOut(win, view){
	var view = view;
	var win = win;
	
	view.animate({
		bottom: -251,
		duration: 300
	}, function(){
		//win.remove(view);
	});
}



//=======================================================================================
//pickerViewがスライドインするアニメーションファンクション
//=======================================================================================

function pickerSlideIn( win, view　){
	var view = view;
	var win = win;
	win.add(view);
	
	view.animate({
		bottom: 0,
		duration: 300
	});
}
	
	
//=======================================================================================
//番号からテキストに変換するファンクション
//=======================================================================================

function exchangeFromNumber( number, type ) {
	
	var dataArray = this.returnArray(type);
	return dataArray[number];
	
}


//=======================================================================================
//配列を返すファンクション
//=======================================================================================
function returnArray( arrayName ) {
	
	var array = new Array();
	
	switch( arrayName ){
		case "age":
			array[0] = 'すべて';
			array[1] = '18〜19歳';
			array[2] = '20代前半';
			array[3] = '20代半ば';
			array[4] = '20代後半';
			array[5] = '30代前半';
			array[6] = '30代半ば';
			array[7] = '30代後半';
			array[8] = '40代前半';
			array[9] = '40代半ば';
			array[10] = '40代後半';
			array[11] = '50代以上';
			break;
			
		case "area":
			array[0] = 'すべて';
			array[1] = '北海道';
			array[2] = '青森県';
			array[3] = '岩手県';
			array[4] = '宮城県';
			array[5] = '秋田県';
			array[6] = '山形県';
			array[7] = '福島県';
			array[8] = '茨城県';
			array[9] = '栃木県';
			array[10] = '群馬県';
			array[11] = '埼玉県';
			array[12] = '千葉県';
			array[13] = '東京都';
			array[14] = '神奈川県';
			array[15] = '新潟県';
			array[16] = '富山県';
			array[17] = '石川県';
			array[18] = '福井県';
			array[19] = '山梨県';
			array[20] = '長野県';
			array[21] = '岐阜県';
			array[22] = '静岡県';
			array[23] = '愛知県';
			array[24] = '三重県';
			array[25] = '滋賀県';
			array[26] = '京都府';
			array[27] = '大阪府';
			array[28] = '兵庫県';
			array[29] = '奈良県';
			array[30] = '和歌山県';
			array[31] = '鳥取県';
			array[32] = '島根県';
			array[33] = '岡山県';
			array[34] = '広島県';
			array[35] = '山口県';
			array[36] = '徳島県';
			array[37] = '香川県';
			array[38] = '愛媛県';
			array[39] = '高知県';
			array[40] = '福岡県';
			array[41] = '佐賀県';
			array[42] = '長崎県';
			array[43] = '熊本県';
			array[44] = '大分県';
			array[45] = '宮崎県';
			array[46] = '鹿児島県';
			array[47] = '沖縄県';
			break;
			
		case "purpose":
			array[0] = 'すべて';
			array[1] = 'メル友探し';
			array[2] = '友達・遊び相手探し';
			array[3] = '恋人探し';
			array[4] = '結婚相手探し';
			break;
		
		case "tall":
			array[1] = "〜149cm";
  			array[2] = "150〜154cm";
  			array[3] = "155〜159cm";
  			array[4] = "160〜164cm";
  			array[5] = "165〜169cm";
  			array[6] = "170〜174cm";
  			array[7] = "175〜179cm";
  			array[8] = "180〜184cm";
  			array[9] = "185〜189cm";
  			array[10] = "190cm〜";
  			array[11] = "ひみつ";
  			break;
  		
  		case "blood":
  			array[1] = "ひみつ";
  			array[2] = "A型";
			array[3] = "B型";
  			array[4] = "O型";
  			array[5] = "AB型";
  			break;
  			
  		case "style":
	  		array[1] = "スリム";
	  		array[2] = "やや細め";
	  		array[3] = "普通";
	  		array[4] = "筋肉質";
	  		array[5] = "グラマー";
	  		array[6] = "ややぽっちゃり";
	  		array[7] = "太め";	
	  		array[8] = "ひみつ";
	  		break;
	  		
	  	case "holiday":
		  	array[1] = "土日";
	  		array[2] = "平日";
	  		array[3] = "不定期";
	  		array[4] = "その他";
	  		break;
	  		
	  	case "alcohol":
		  	array[1] = "未成年なので飲めない";
	  		array[2] = "飲まない";
	  		array[3] = "飲む";
	  		array[4] = "ときどき飲む";
	  		array[5] = "ひみつ"; 
	  		break;
	  	
	  	case "cigarette":
		  	array[1] = "未成年なので吸えない";
	  		array[2] = "吸わない";
	  		array[3] = "吸う";
	  		array[4] = "ときどき吸う";
	  		array[5] = "ひみつ"; 
	  		break;	
	  		
	  	case "salary":
		  	array[1] = "200万円未満";
	  		array[2] = "200〜400万円";
	  		array[3] = "400〜600万円";
	  		array[4] = "600〜800万円";
	  		array[5] = "800〜1,000万円";
	  		array[6] = "1,000〜1,500万円";
	  		array[7] = "1,500〜2,000万円";
	  		array[8] = "2,000〜3,000万円";
	  		array[9] = "3,000万円以上";
	  		array[10] = "ひみつ";
	  		break;
	}
	return array;
	
}


