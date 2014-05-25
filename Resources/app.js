//=============================================================
//グローバル変数の定義
//=============================================================

Ti.App.domain = "http://talkrooms.herokuapp.com/";
//Ti.App.domain = "http://localhost:3000/";

//ログインユーザーのID
Ti.App.userID = 1;

//画面サイズの取得
Ti.App.displayWidth = Titanium.Platform.displayCaps.platformWidth;
Ti.App.displayWidth = Titanium.Platform.displayCaps.platformHeight;

//=============================================================
//REQUIRE
//=============================================================
var fb = require('facebook');


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
	tabGroup.open();
}

//全画面で使うローディングインディケーターの宣言
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
