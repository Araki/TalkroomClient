function tabGroup() {
	var self = Titanium.UI.createTabGroup({});
	self.tabsBackgroundColor = _darkBlue; //タブバーの色
	self.tabsTintColor = _white; //選択時のタブの色
	
	//==================================================================
	//pushNotificationの実行
	//==================================================================
	pushNotification();

	return self;
}

module.exports = tabGroup;
