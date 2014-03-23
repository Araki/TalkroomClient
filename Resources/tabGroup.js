function tabGroup() {

	//==================================================================
	// 「探す」ウィンドウ
	//==================================================================
	var searchWindow = require('searchWindow');
	var win1 = new searchWindow();
	
	var tab1 = Titanium.UI.createTab({  
	    icon:'KS_nav_ui.png',
	    title:'探す',
	    window:win1
	});
	
	
	
	
	//==================================================================
	// 「のぞく」ウィンドウ
	//==================================================================
	var publicRoomWindow = require('publicRoomWindow');
	var win2 = new publicRoomWindow();
	
	var tab2 = Titanium.UI.createTab({  
	    icon:'KS_nav_views.png',
	    title:'のぞく',
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
	    title:'その他',
	    window:win4
	});
	
	//==================================================================
	//  add tabs
	//==================================================================
	
	// create tab group
	var self = Titanium.UI.createTabGroup();
	
	self.addTab(tab1);  
	self.addTab(tab2);  
	self.addTab(tab3);
	self.addTab(tab4);
	
	/*
	tabGroup.addEventListener('open', function () {
		var cuWindow = require('choiceUserWindow');
		var choiceUserWindow = new cuWindow();
		choiceUserWindow.open();
	});
	*/
	
	// open tab group
	//tabGroup.open();

	return self;
}

module.exports = tabGroup;