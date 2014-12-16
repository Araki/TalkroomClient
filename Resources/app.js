//=============================================================
//アクセスするサーバーを選択
//=============================================================

//Ti.App.environment = "production";
//Ti.App.environment = "staging";
Ti.App.domain = "https://api.talkroom.co/";
//=============================================================
//API URLの設定
//=============================================================
if (Ti.App.environment == "production"){
	//本番環境URL
	Ti.App.domain = "https://api.talkroom.co/";
}
if (Ti.App.environment == "staging"){
	//ステージング環境URL
	Ti.App.domain = "https://talkrooms-stg.herokuapp.com/"
	
}
//ローカル環境
//Ti.App.domain = "http://localhost:3000/";

//=============================================================
//REQUIRE
//=============================================================
var fb = require('facebook');
var Storekit = require('ti.storekit');
var Admob = require('ti.admob');
var nend = require('net.nend');
var iOSUniqueID = require('com.joseandro.uniqueids');
//alert("UUID : " + iOSUniqueID.getUUID + "\n");

//=============================================================
//初期設定
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
        Flurry.startSession('F5NQXW4FTH444BFF9939');//本番環境用
        //Flurry.startSession('692X3KPJHTB3YR6QHD57');//開発環境用
        break;
    case 'ipad':
        //Ti.API.info("Flurry iPadスタート");
        break;
    case 'android':
        //Ti.API.info("Flurry Androidスタート");
		Flurry.startSession();
        break;
}

Flurry.logAllPageViews();


//=============================================================
//Ti.Appの初期化
//=============================================================

//画面サイズの取得
var displayWidth = Titanium.Platform.displayCaps.platformWidth;
var displayHeight = Titanium.Platform.displayCaps.platformHeight;
Ti.App.navBarHeight = 44;

//Ti.API.info("displayWidth" + displayWidth);
//Ti.API.info("displayHeight" + displayHeight);
//Ti.API.info("==================app_token:::::::::" + Ti.App.Properties.getString('app_token'));
//Ti.API.info("==================my_id:::::::::" + Ti.App.Properties.getString('my_id'));

if(Ti.App.Properties.getString('searchAge') == null){Ti.App.Properties.setString('searchAge', "");}
if(Ti.App.Properties.getString('searchArea') == null){Ti.App.Properties.setString('searchArea', "");}
if(Ti.App.Properties.getString('searchGender') == null){Ti.App.Properties.setString('searchGender', "");}
if(Ti.App.Properties.getString('deviceToken') == null){Ti.App.Properties.setString('deviceToken', "");}
//=============================================================
//グローバル変数の定義
//=============================================================
var _point;
var _peepPoint = 20;
var _privatePoint = 100;

var product100;
var product600;
var product1200;
var product3000;
var product6000;

var rewardFlag;

var _white = '#FFFFFF';
var _whiteBlue = '#E8F8FF';
var _lightBlue = '#6FD3D8';
var _darkBlue = '#1CADC3';
var _vividPink = '#EB3B86';
var _mossGreen = '#86BA1A';
var _darkGray = '#505050';
var _lightGray= '#7B8C94';
var _gray = "#C8C8C8";
var _whiteGray = '#F5F5F5';

var _font = 'Rounded-X M+ 2p';

//############################################################
//############################################################
//############################################################
//############################################################
//ソース
//############################################################
//############################################################
//############################################################
//############################################################

// バックグラウンドカラーの設定
Titanium.UI.setBackgroundColor('#000');

var tabGroup;

Ti.App.addEventListener('resumed',function(){
	//var actInd = createActInd();
	//actInd.show();
	var url = Ti.App.domain + "check_login.json";
	var message = {channel: "normal",
				   uid: iOSUniqueID.getUUID, 
				   version: Ti.App.version,
				   access_token: Ti.Utils.md5HexDigest(Ti.Utils.md5HexDigest(iOSUniqueID.getUUID))};
	sendData( url, message, function( data ){
		if (data.success){
			//actInd.hide();
		}else{
			//通信に失敗したら行う処理
			Ti.UI.createAlertDialog({
				title: '通信に失敗しました'
			}).show();
			//actInd.hide();
		}
	});
	
	var number = Ti.UI.iPhone.getAppBadge();
	if(tabGroup != null){
		addBadgeToTab( number );
	}
	
});

var fbWindow = require('facebookWindow');
var facebookWindow = new fbWindow();
facebookWindow.open();
/*
fb.appid = '349815825157641';
fb.permissions = ['email', 'user_birthday', 'read_friendlists'];
fb.forceDialogAuth = false;
fb.addEventListener('login', function(e) {
    if (e.success) {
    	
        getUserDataList();
        
    } else if (e.error) {
    	//alert( e.error );
    	Ti.UI.createAlertDialog({
			title: 'Facebookログインに失敗しました',
		  	//message: data.data
		}).show();
		
    } else if ( e.cancelled ) {
    	Ti.UI.createAlertDialog({
			title: 'Facebookログインがキャンセルされました',
		  	//message: data.data
		}).show();
    	//var fbWindow = require('facebookWindow');
		//facebookWindow = new fbWindow();
		//facebookWindow.open();
    }
});
*/


if (Ti.App.Properties.getString('channel') == 'normal'){
	//check_loginはfb_idをチェックしているが、同様のことをuuidで行う処理を加える
	//check_loginを叩き、trueかfalseが返ってくる
	//trueの場合はloginProcess()を実行し自動ログイン
	//falseの場合はローカルストレージにnormalが入っており、IDがないということになる
	//実際そのようなことは起こらないはずだが、一旦ローカルストレージのデータを削除した方が良さそう
	normalLogin();
}

function normalLogin(){
	//Ti.API.info("0###############################");
	var actInd = createActInd();
	facebookWindow.add(actInd);
	actInd.show();
	var url = Ti.App.domain + "check_login.json";
	var message = {channel: "normal",
				   uid: iOSUniqueID.getUUID, 
				   version: Ti.App.version,
				   access_token: Ti.Utils.md5HexDigest(Ti.Utils.md5HexDigest(iOSUniqueID.getUUID))};
	sendData( url, message, function( data ){
		if (data.success){
			//通信に成功したら行う処理
			//alert(Ti.App.version);
			var obj = JSON.parse(data.data);
        	rewardFlag = obj.reward_flag;
			//Ti.API.info("1###############################");
            if(obj.version == "development"){
            	
            	alert("ステージング環境");
            	
            	Ti.App.domain = "https://talkrooms-stg.herokuapp.com/";
            	
            	//開発環境にリダイレクト
            	url = Ti.App.domain + "check_login.json";
				message = {channel: "normal",
						   uid: iOSUniqueID.getUUID, 
						   version: Ti.App.version,
						   access_token: Ti.Utils.md5HexDigest(Ti.Utils.md5HexDigest(iOSUniqueID.getUUID))};
				//Ti.API.info("2###############################");
				sendData( url, message, function( data ){
					if (data.success){
						obj = JSON.parse(data.data);
				        rewardFlag = obj.reward_flag;
				        
				        if(obj.result == "true"){//既に登録済みのユーザーの処理
							Flurry.logEvent('App Login');
			              　loginProcess(obj);
							actInd.hide();
						}else if(obj.result == "deleted"){
							//alert("削除");
							Ti.UI.createAlertDialog({
								message: "お客様のアカウントは運営により\n削除されました。\n心当たりのない方は恐れ入りますが\nこちらのメールアドレス（info@shiftage.jp）まで「" + Ti.App.Properties.getString('my_id') + "」を\n記載のうえお問い合わせください。"
							}).show();
							actInd.hide();
						}else{
							//Ti.App.Properties.setString('app_token', "");
							//Ti.App.Properties.setString('my_id', "");
							//Ti.App.Properties.setString('channel', "");
							var nrWindow = require('normalRegistWindow');
							var normalRegistWindow = new nrWindow();
							normalRegistWindow.open();
							actInd.hide();
						}
					}else{
						//通信に失敗したら行う処理
						Ti.UI.createAlertDialog({
							title: '通信に失敗しました',
						  	//message: data.data
						}).show();
						actInd.hide();
					}
				});           	
            	
            }else if(obj.version == "update"){
            	//Ti.API.info("3###############################");
            	var alertDialog = Ti.UI.createAlertDialog({
					//title: '',
				  	message: 'アプリを最新版にアップデートしてください',
				  	buttonNames: ['アップデート']
				});
				
				alertDialog.addEventListener('click',function(e){
					if(e.index == 0){
						//App Store へ移動
          				Ti.Platform.openURL(obj.update_url);
					}
				});
				
				alertDialog.show();
			
            }else{
            	//Ti.API.info("4###############################");
            	if(obj.result == "true"){//既に登録済みのユーザーの処理
					Flurry.logEvent('App Login');
	              　loginProcess(obj);
					actInd.hide();
				}else if(obj.result == "deleted"){
					//alert("削除");
					Ti.UI.createAlertDialog({
						message: "お客様のアカウントは運営により削除されました。\n心当たりのない方は恐れ入りますがこちらのメールアドレス（info@shiftage.jp）まで「" + Ti.App.Properties.getString('my_id') + "」を記載のうえお問い合わせください。"
					}).show();
					actInd.hide();
				}else{
					//alert("新規");
					//Ti.App.Properties.setString('app_token', "");
					//Ti.App.Properties.setString('my_id', "");
					//Ti.App.Properties.setString('channel', "");
					var nrWindow = require('normalRegistWindow');
					var normalRegistWindow = new nrWindow();
					normalRegistWindow.open();
					actInd.hide();
				}
            }
		}else{
			//通信に失敗したら行う処理
			Ti.UI.createAlertDialog({
				title: '通信に失敗しました',
			  	//message: data.data
			}).show();
			actInd.hide();
		}
	});
}

function addBadgeToTab( number ){
	var tabs = tabGroup.tabs;
	if (number <= 0){
		tabs[2].setBadge( null );
	}else{
		tabs[2].setBadge( number );
	}
}

function submitDeviceToken( dt ){
	var message = {
		app_token: Ti.App.Properties.getString('app_token'),
		device_token: dt
	};
	
	url = Ti.App.domain + "update_device_token.json";
	sendData( url, message, function( data ){
		if (data.success){
			Ti.App.Properties.setString('deviceToken', "true");
		} else{}
	});
}

function pushNotification(){
	// Check if the device is running iOS 8 or later
	if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
	    function registerForPush() {
	        Ti.Network.registerForPushNotifications({
	            success: function(e) {
			        submitDeviceToken(e.deviceToken);
			    },
	            error: function(e) {
			    },
	            callback: function(e) {
			        addBadgeToTab( e.data.aps.badge );
			    }
	        });
	        // Remove event listener once registered for push notifications
	        Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush); 
	    };
	 
	    // Wait for user settings to be registered before registering for push notifications
	    Ti.App.iOS.addEventListener('usernotificationsettings', registerForPush);
	 
	    // Register notification types to use
	    Ti.App.iOS.registerUserNotificationSettings({
	        types: [
	            Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
	            Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
	            Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
	        ]
	    });
	 
	} else {
	    // For iOS 7 and earlier
	    Ti.Network.registerForPushNotifications({
	        // Specifies which notifications to receive
	        types: [
	            Ti.Network.NOTIFICATION_TYPE_BADGE,
	            Ti.Network.NOTIFICATION_TYPE_ALERT,
	            Ti.Network.NOTIFICATION_TYPE_SOUND
	        ],
	        success: function(e) {
		        submitDeviceToken(e.deviceToken);
		    },
	        error: function(e) {
		    },
	        callback: function(e) {
		        addBadgeToTab( e.data.aps.badge );
		    }
	    });
	}
}

function getUserDataList() {
	var actInd = createActInd();
	facebookWindow.add(actInd);
	actInd.show();
	
	fb.requestWithGraphPath(
	    'me',
	    {},
	    "GET",
	    function(e) {
	         if (e.success) {
	            var obj = JSON.parse(e.result);
		
				var ageNum;
				var ageText;
				
				//次の登録画面に遷移するまでの処理
				var uid = obj.id;
				var first_name = obj.first_name;
				var last_name = obj.last_name;
				var gender = obj.gender;
				var email = obj.email;
				var birthday = obj.birthday;
				
				var url = Ti.App.domain + "check_login.json";
				var message = {channel: "facebook",
							   uid: uid, 
							   version: Ti.App.version,
							   access_token: Ti.Utils.md5HexDigest(Ti.Utils.md5HexDigest(uid))};
				sendData( url, message, function( data ){
					if (data.success){
						//通信に成功したら行う処理
			            var obj = JSON.parse(data.data);
			        	rewardFlag = obj.reward_flag;
						if(obj.result == "true"){//既に登録済みのユーザーの処理
							Flurry.logEvent('App Login Facebook');
							/*
							var birth = birthday.split("/");
							var current = new Date();
							var age = current.getFullYear() - birth[2];
							Flurry.setAge(age);
							Flurry.setUserId(String(uid));
							if(gender == "male"){
								Flurry.setGender('m');
							}else{
								Flurry.setGender('f');
							}
							Ti.UI.createAlertDialog({
								title: '既にログイン済みのユーザー',
							  	//message: data.data
							}).show();
							*/
            
			              　loginProcess(obj);
							actInd.hide();
						
						}else{//まだ未登録のユーザーの処理
							Flurry.logEvent('App SignUp Facebook');
							
							var registWindow = require('registrationWindow');
							var registrationWindow = new registWindow();
							
							//first_nameとlast_nameの最初の文字を取得し連結する
							last_name_initial = last_name.substring(0,1);
							first_name_initial = first_name.substring(0,1);
							var name = first_name_initial + "." + last_name_initial + ".";
							
							//誕生日から年齢を計算
							var birth = birthday.split("/");					
							var current = new Date();
							calculateAge(current.getFullYear(),
										 current.getMonth() + 1,
										 current.getDate(),
										 birth[2],
										 birth[0],
										 birth[1]);
							
							//registrationWindowの各要素にデータを格納
							registrationWindow.children[0].children[0].children[1].value = name;
							//registrationWindow.children[0].children[0].children[3].value = ageText;
							//registrationWindow.children[0].children[0].children[3].customItem = ageNum;
							//registrationWindow.children[0].children[0].children[5].customItem = 0;
							//registrationWindow.children[7].customItem = 0;
							registrationWindow.uid = uid;
							registrationWindow.gender = gender;
							registrationWindow.email = email;
							//Ti.API.info("Name:" + name);
							
							//Ti.API.info("ageText:" + ageText + "(" + current.getFullYear() + current.getMonth() + current.getDate() + ")(" + birth[0] + birth[1] + birth[2] + ")");
							//Ti.API.info("ageNum:" + ageNum);
							registrationWindow.open();
							//self.close();
							actInd.hide();
						}
					} else{
						//通信に失敗したら行う処理
						Ti.UI.createAlertDialog({
							title: '通信に失敗しました',
						  	//message: data.data
						}).show();
						actInd.hide();
					}
				});
	        }
	    }
	);
}

function loginProcess(obj){
	 // app_token を保存する
    Ti.App.Properties.setString('app_token', obj.app_token);
	Ti.App.Properties.setString('my_id', obj.user_id);
	Ti.App.Properties.setString('channel', obj.channel);
	
	//ポイントの読み込み
	readPoint();
	//tabGroupを開く
	createTabGroup();
	addBadgeToTab();
	//このウィンドウを閉じる
	facebookWindow.close();
}


//=============================================================
//FacebookのGraphAPIからフレンドリストを取得するFunction
//=============================================================
/*Facebook Friendsを取得し知り合いが検索に出ないようにする機能は必要になったときに実装し初期バージョンでは実装しない

function getFbFriendsList(){
	fb.requestWithGraphPath(
	    'me/friends/?fields=id,gender',
	    {},
	    "GET",
	    function(e) {
	         if (e.success) {
	            friends_list = e.result;
	            registrationWindow.friends_list = friends_list;
				//Ti.API.info("####FRIENDS LIST: " + friends_list);
	        }
	    }
	);
}
*/




//=============================================================
//年齢を計算し、年齢番号を割り出すFunction
//=============================================================

function calculateAge(cY, cM, cD, bY, bM, bD){
	var currentYear = cY;
	var currentMonth = cM;
	var currentDate = cD;
	var birthdayYear = bY;
	var birthdayMonth = bM;
	var birthdayDate = bD;
	
	var age;
	
	var ageYear = currentYear - birthdayYear;
	var ageMonth = currentMonth - birthdayMonth;
	var ageDate = currentDate - birthdayDate;
	//Ti.API.info(birthMonth)
	if (ageYear > 0){
		if (ageMonth > 0 ){//既に誕生月が過ぎている場合
			age = ageYear;
		}else if (ageMonth < 0){//まだ誕生月が来ていない場合
			age = ageYear - 1;
		}else{//本月が誕生月の場合
			if (ageDate > 0){//既に誕生日が過ぎている場合
				age = ageYear;
			}else if (ageDate < 0){//まだ誕生日が来ていない倍
				age = ageYear - 1;
			}else{//本日が誕生日の場合
				age = ageYear;
			}
		}
	}else{ 
		//0歳以下なのでありえない
	}
	
	//Ti.API.info("AGE+++: " + age);
	
	if(age < 18){
		
		Ti.UI.createAlertDialog({
			title: '本サービスは18歳未満の方はご利用できません'
		}).show();
	}else{
		//年齢から年齢番号を判別
		if(age < 20){
			ageNum = 1;
		}else if(20 <= age && age < 24 ){
			ageNum = 2;
		}else if(24 <= age && age < 27 ){
			ageNum = 3;
		}else if(27 <= age && age < 30 ){
			ageNum = 4;
		}else if(30 <= age && age < 34 ){
			ageNum = 5;
		}else if(34 <= age && age < 37 ){
			ageNum = 6;
		}else if(37 <= age && age < 40 ){
			ageNum = 7;
		}else if(40 <= age && age < 44 ){
			ageNum = 8;
		}else if(44 <= age && age < 47 ){
			ageNum = 9;
		}else if(47 <= age && age < 50 ){
			ageNum = 10;
		}else if(50 <= age){
			ageNum = 11;
		}
		//ageNumをテキストに変換
		ageText = exchangeFromNumber( ageNum, "age" );
	}
	
}


var nendAdWindow = require('nendInterstitialWindow');
var nendInterstitialWindow = new nendAdWindow();
var roadflag = false;//imobileAdが読込が完了したらtrue
var imobileAdWindow = require('imobileInterstitialWindow');
var imobileInterstitialWindow = new imobileAdWindow();
function createTabGroup(){
	
	var tGroup = require('tabGroup');
	tabGroup = new tGroup();
	
	//==================================================================
	// 「探す」ウィンドウ
	//==================================================================
	var searchTableWindow = require('searchTableWindow');
	var win1 = new searchTableWindow("","","");
	
	var tab1 = Titanium.UI.createTab({ 
	    icon:'/images/tabbar_icon_user.png',
	    title:'ユーザー',
	    window:win1
	});

	//==================================================================
	// 「のぞく」ウィンドウ
	//==================================================================
	var publicRoomWindow = require('publicRoomWindow');
	var win2 = new publicRoomWindow();
	
	var tab2 = Titanium.UI.createTab({ 
	    icon:'/images/tabbar_icon_room.png',
	    title:'ルーム',
	    window:win2
	});
	
	//==================================================================
	// 「トーク」ウィンドウ
	//==================================================================
	var talkWindow = require('talkWindow');
	var win3 = new talkWindow();
	
	var tab3 = Titanium.UI.createTab({  
	    icon:'/images/tabbar_icon_talk.png',
	    title:'トーク',
	    window:win3
	});	
	
	
	//==================================================================
	// 「設定」ウィンドウ
	//==================================================================
	var settingWindow = require('settingWindow');
	var win4 = new settingWindow();
	
	var tab4 = Titanium.UI.createTab({  
	    icon:'/images/tabbar_icon_another.png',
	    title:'その他',
	    window:win4
	});
	
	tabGroup.addTab(tab1);  
	tabGroup.addTab(tab2);  
	tabGroup.addTab(tab3);
	tabGroup.addTab(tab4);
	
	tabGroup.addEventListener('open', function(){
		//レシート処理
		checkReceipt(function(){});
		
		number = Ti.UI.iPhone.getAppBadge();
		addBadgeToTab( number );
	});
	
	tabGroup.open();
	
	nendInterstitialWindow.open();
	imobileInterstitialWindow.open();
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
		backgroundColor:_whiteBlue,
		backButtonTitle:'',
		navTintColor: _white,
		barColor:'#1CADC3',
		titleControl: Ti.UI.createLabel({
	        text: titleName,
	        color: _white,
	        font:{fontFamily: _font, fontSize:18},
	        //shadowColor: 'gray',
	        shadowOffset: {x: 1, y: 1}
	    })
	});
	
	return win;
}

function createActInd() {
	var activityIndicator = Titanium.UI.createActivityIndicator({
		height:'100%',
		width:'100%',
		font: {fontFamily: _font, fontSize:16},
		color: 'white',
		backgroundColor:'black',
		opacity: 0.3,
		//borderRadius:5,
		style:(Ti.Platform.name === 'iPhone OS' ? Ti.UI.iPhone.ActivityIndicatorStyle.BIG : Ti.UI.ActivityIndicatorStyle.BIG), //DARK,PLAIN
		//message: "ローディング中"
	});
	return activityIndicator;
}

//=======================================================================================
//カメラを起動するファンクション
//=======================================================================================
function showCamera(win, whichImage){
	Flurry.logEvent('App Show Camera');
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
			var a = Titanium.UI.createAlertDialog({title:'カメラ'});
	
			// set message
			if (error.code == Titanium.Media.NO_CAMERA)
			{
				a.setMessage('Please run this test on device');
			}
			else
			{
				a.setMessage('エラー\n' + error.code);
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
	Flurry.logEvent('App Show Gallery');
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
	Flurry.logEvent('App Upload Image');
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
		font:{fontFamily: _font, fontSize:12, fontWeight:'bold'},
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
		var obj = JSON.parse(this.responseText);
		//alert("レスポンス" + xhr.responseText);
		if(obj.success == "success"){
			reloadImage(currentWindow, whichImage, obj.image);
			Ti.UI.createAlertDialog({
				title: '写真を更新しました',
			  	//message: data.data
			}).show();
		}else{
			//alert("アップロードに失敗しました");
			Ti.UI.createAlertDialog({
				title: '写真の更新に失敗しました',
			  	//message: data.data
			}).show();
		}
	};
	xhr.onerror = function(){
		ind.hide();
		//alert("アップロードに失敗しました");
		Ti.UI.createAlertDialog({
			title: '写真の更新に失敗しました',
		  	//message: data.data
		}).show();
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
			
			Ti.UI.createAlertDialog({
				title: '写真を更新しました',
			  	//message: data.data
			}).show();
		}else{
			
			Ti.UI.createAlertDialog({
				title: '写真の更新に失敗しました',
			  	//message: data.data
			}).show();
		}
	};
	xhr.onerror = function(){
		ind.hide();
		
		Ti.UI.createAlertDialog({
			title: '写真の更新に失敗しました',
		  	//message: data.data
		}).show();
	};
}

//=======================================================================================
//アプリ側に画像キャッシュが残るので即時反映したい場合のリロードファンクション
//=======================================================================================
function reloadImage(window, image, image_url){
	//alert(window.children[0].data[0].rows[0].children[1].url);
	switch(image){
		case 'profile_image1':
			window.children[0].data[0].rows[0].children[1].image = image_url;
			
	    	break;
	    case 'profile_image2':
			window.children[0].data[0].rows[0].children[3].image = image_url;
	    	break;
	    case 'profile_image3':
			window.children[0].data[0].rows[0].children[5].image = image_url;
	    	break;
	}
}

//=======================================================================================
//ポイント消費確認ダイアログを表示するファンクション
//=======================================================================================
function consumePointDialog( type, roomID, callback ){
	var description;
	var consumePoint;
	if (type == "peep"){
		Flurry.logEvent('App ConsumePoint Peep');
		description = _peepPoint + 'ポイント消費して、\n公開中の過去トークをのぞきますか？';
		consumePoint = _peepPoint;
	}else if(type == "private"){
		Flurry.logEvent('App ConsumePoint Private');
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
	    if(event.index == 1){
	        // cancel時の処理
	        callback({success: false});
	    }
	    // 選択されたボタンのindexも返る
	    if(event.index == 0){
	        // "OK"時の処理
	        if (_point >= consumePoint){
		        var url = Ti.App.domain + "consume_point.json?consume_point=" + consumePoint + "&item_type=" + type + "&room_id=" + roomID + "&app_token=" + Ti.App.Properties.getString('app_token');
				getData(url, function( data ){
					if (data.success) {
						// 通信に成功したら行う処理
						_point = parseInt(data.data);
						callback({success: true});
					} else{
						// 通信に失敗したら行う処理
						//alert("通信に失敗しました");
						Ti.UI.createAlertDialog({
							title: '通信に失敗しました',
						  	//message: data.data
						}).show();
						callback({success: false});
					}
				});
			}else{
				//alert("ポイントが足りません");
				Ti.UI.createAlertDialog({
					title: 'ポイントが不足しています',
				  	//message: data.data
				}).show();
				callback({success: false});
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
			//alert('ERROR: We requested an invalid product!');
		}
		else {
			success(evt.products[0]);
		}
	});
}

if (!Storekit.canMakePayments)
	alert('通信またはその他の原因で現在購入の操作ができません。\n電波の良いところでアプリを起動してください。');
else {
	/*
	requestProduct('jp.shiftage.talkroom.testpoint100', function (product) {
		product100 = product;
	});

	requestProduct('jp.shiftage.talkroom.testpoint300', function (product) {
		product300 = product;
	});
	
	requestProduct('jp.shiftage.talkroom.testpoint500', function (product) {
		product500 = product;
	});
	*/
	requestProduct('jp.shiftage.talkroom.100point', function (product) {
		product100 = product;
	});
	requestProduct('jp.shiftage.talkroom.600point', function (product) {
		product600 = product;
	});
	requestProduct('jp.shiftage.talkroom.1200point', function (product) {
		product1200 = product;
	});
	requestProduct('jp.shiftage.talkroom.3000point', function (product) {
		product3000 = product;
	});
	requestProduct('jp.shiftage.talkroom.6000point', function (product) {
		product6000 = product;
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
  	callback();
    return;
  }
  
  //以下の処理はなんらかが原因でレシート情報が端末内に残されていたときに実行される
  Flurry.logEvent('App CheckReceipt VerifyReceipt');
  //verifyReceipt(receipt);
  var url = Ti.App.domain + "/verify_receipt.json";
  var client = Ti.Network.createHTTPClient({
    onload : function(e) {
      Flurry.logEvent('App CheckReceipt Success');
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
      Flurry.logEvent('App CheckReceipt Error');
      //Ti.API.debug(e.error);
      //alert('error' + this.responseText);
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
// ポイントを読み込む
//=======================================================================================
function readPoint(){
  	var url = Ti.App.domain + "/get_point.json?app_token=" + Ti.App.Properties.getString('app_token');
	getData(url, function( data ){
		if (data.success) {
			// 通信に成功したら行う処理
			_point = parseInt(data.data);
			//Ti.API.info("$$$$$$$$$$$$$$$$$$:" + _point);
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

function getData(val ,callback) {
	
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
		//Ti.API.info("パース前：" + this.responseText);
		//Ti.API.info("パース後：" + JSON.parse(this.responseText));
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
		//alert("返って来たデータ:" + this.responseText);
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
function createPickerView( data, tf, win ){
	
	var dataList = data;
	var textField = tf;
	//var customItem = selectItem;

	var self = Titanium.UI.createView({
		height: 251,
		bottom: -251
	});
	
	var blackView = Titanium.UI.createView({
		top: 0,
		bottom: 0,
		backgroundColor: 'black',
		opacity: 0.5
	});
	
	var doneButton = Titanium.UI.createButton({
		title: '完了',
		font:{fontFamily: _font},
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
	//Ti.API.info("INDEX:" + textField.customItem);
	picker.selectionIndicator = true;
	picker.add(dataList);
	
	if(textField.value != "すべて"){
		picker.setSelectedRow(0, textField.customItem, false);
	}
	
	//Pickerのツールバーの完了ボタンが押された時の挙動
	doneButton.addEventListener('click', function(e){
		pickerSlideOut(Ti.UI.currentWindow, self);
		win.remove(blackView);
	});
	
	//Pickerの選択が変わった時の挙動
	picker.addEventListener('change', function(e){
		textField.value = e.row.title;
		textField.customItem = e.row.custom_item;
	});
	win.add(blackView);
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

function createBannerAdView(){
	
	var rand = Math.floor(Math.random()*2);
	switch(rand){
		case 0:
			var adview = Admob.createView({
				bottom: 0,
				left: 0,
			    width: 320,
			    height: 50,
			    adUnitId: 'ca-app-pub-8392863952863215/5215089280',
			    adBackgroundColor: _whiteBlue,
			    // You can get your device's id for testDevices by looking in the console log after the app launched
			    //testDevices: [Admob.SIMULATOR_ID],
			    //dateOfBirth: new Date(1985, 10, 1, 12, 1, 1),
			    //gender: 'male',
			    //keywords: ''
			});
			break;
			
		case 1:
			var adview = nend.createView({
                spotId: '218551',//'3174',
                apiKey: '4869c84c177df6f84ed62140cd3dd71da9b45e9a',//'c5cb8bc474345961c6e7a9778c947957ed8e1e4f',
                width:  320,
                height: 50,
                bottom: 0,
                left:   0
            });
            break;
 
        default:
            var adview = null;
            break;
	}
    return adview;
}

