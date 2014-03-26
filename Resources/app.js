//=============================================================
//グローバル変数の定義
//=============================================================

//Ti.App.domain = "http://talkrooms.herokuapp.com/";
Ti.App.domain = "http://localhost:3000/";

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


