function facebookWindow() {
	
	//Facebook Friendsを取得し知り合いが検索に出ないようにする機能は必要になったときに実装し初期バージョンでは実装しない
	//var friends_list;
	
	var self = Titanium.UI.createWindow({  
		backgroundColor:_white
	});
	
	var webview = Titanium.UI.createWebView({
		url: 'flipsnap.html',
		top: 0,//'0dp',
		bottom: 60,//'60dp',
		left: 0,//'0dp',
		right: 0//'0dp'
	});
	self.add(webview);
	/*
	var messageLabel = Titanium.UI.createLabel({
		text: 'Facebookで登録してもプロフィール写真やニックネームは自由に変更できます。また、本サービスがFacebookに投稿するようなことはありません。',
		bottom: 10,
		left: 20,
		right: 20,
		color: _vividPink,
		font:{fontFamily: _font, fontSize: 10 }
	});
	self.add(messageLabel);
	*/
	var facebookBtn = Titanium.UI.createButton({ 
	    //backgroundImage: 'facebook_login_button.png',
	    //top : 10,
	    font:{fontFamily: _font, fontSize: 20},
	    right: 20,
	    left: 20,
	    bottom: 10,
	    height: 40,
	    backgroundColor: '#3b5998',
	    color: _white,
	    textAlign: 'center',
	    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
	    borderRadius: 10,
	    title: "Facebookで登録・ログイン"
	});
	self.add(facebookBtn);
	
	var normalBtn = Titanium.UI.createButton({ 
	    //backgroundImage: 'facebook_login_button.png',
	    //top : 10,
	    font:{fontFamily: _font, fontSize: 20},
	    right: 20,
	    left: 20,
	    bottom: 60,
	    height: 40,
	    backgroundColor: _vividPink,
	    color: _white,
	    textAlign: 'center',
	    verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
	    borderRadius: 10,
	    title: "登録・ログイン"
	});
	self.add(normalBtn);
	 
	facebookBtn.addEventListener('click', function (e) {
		if(fb.getLoggedIn()){
			fb.logout();
		}else{
	        fb.authorize();
	    }
	});
	/* 
	fb.addEventListener('login', function(e) {
		//facebookBtn.setBackgroundImage('facebook_logout_button.png');
		facebookBtn.title = "ログイン中･･･";
	});
	
	fb.addEventListener('logout', function(e) {
		//facebookBtn.setBackgroundImage('facebook_login_button.png');
		facebookBtn.title = "Facebookで登録・ログイン";
	});
	*/
	normalBtn.addEventListener('click', function(e) {
		normalLogin();	
	});
	
	
	
	//viewをwindowに追加
	//self.add(view);

	return self;
}

module.exports = facebookWindow;
