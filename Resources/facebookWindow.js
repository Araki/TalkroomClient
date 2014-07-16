function facebookWindow() {
	
	//Facebook Friendsを取得し知り合いが検索に出ないようにする機能は必要になったときに実装し初期バージョンでは実装しない
	//var friends_list;
	
	var self = createWindow("フェイスブック");

	self.add(fb.createLoginButton({
	    top : 50,
	    style : fb.BUTTON_STYLE_WIDE
	}));

	return self;
}

module.exports = facebookWindow;
