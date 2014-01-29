

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

//==================================================================
// 「のぞく」ウィンドウ
//==================================================================
var publicRoomWindow = require('publicRoomWindow');
var win1 = new publicRoomWindow();

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'のぞく',
    window:win1
});



//==================================================================
// 「探す」ウィンドウ
//==================================================================
var searchWindow = require('searchWindow');
var win2 = new searchWindow();

var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'探す',
    window:win2
});



//==================================================================
// 「トーク」ウィンドウ
//==================================================================

var talkWindow = require('talkWindow');
var win3 = new talkWindow();

var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'トーク',
    window:win3
});


//==================================================================
// 「設定」ウィンドウ
//==================================================================

var settingWindow = require('settingWindow');
var win4 = new settingWindow();

var tab4 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'設定',
    window:win4
});

//==================================================================
//  add tabs
//==================================================================

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);

// open tab group
tabGroup.open();
