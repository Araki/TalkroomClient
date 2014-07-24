function tabGroup() {

	//==================================================================
	// 「探す」ウィンドウ
	//==================================================================
	var searchWindow = require('searchWindow');
	var win1 = new searchWindow();
	
	var tab1 = Titanium.UI.createTab({ 
	    icon:'/images/tabbar_icon_user.png',
	    title:'探す',
	    window:win1
	});

		
		
		
	//==================================================================
	// 「のぞく」ウィンドウ
	//==================================================================
	var publicRoomWindow = require('publicRoomWindow');
	var win2 = new publicRoomWindow();
	
	var tab2 = Titanium.UI.createTab({ 
	    icon:'/images/tabbar_icon_room.png',
	    title:'のぞく',
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
	
	//==================================================================
	//  add tabs
	//==================================================================
	
	// create tab group
	var self = Titanium.UI.createTabGroup({});
	self.tabsBackgroundColor = _darkBlue; //タブバーの色
	self.tabsTintColor = _white; //選択時のタブの色
	//self.activeTabIconTint = _vividPink;
	//self.tabsTintColor = _white;
	//self.tabsBackgroundImage = 'images/bg/tabBar_bg.png';
	
	self.addTab(tab1);  
	self.addTab(tab2);  
	self.addTab(tab3);
	self.addTab(tab4);

	return self;
}

module.exports = tabGroup;
