function introductionWindow(){

	// windowの作成
	var self = Titanium.UI.createWindow({
		title: '',
		backgroundColor: '#fff',
		tabBarHidden: true,
		navBarHidden: true
	});
	
	// viewの生成
	var view = Titanium.UI.createView();
	
	// webviewの生成
	var webview = Titanium.UI.createWebView({
		url: 'flipsnap.html',
		top: '0dp',
		bottom: '60dp',
		left: '0dp',
		right: '0dp'
	});
	view.add(webview);
	
	// buttonの生成
	var button = Titanium.UI.createButton({
		title: '始める',
		bottom: '10dp',
		left: '60dp',
		right: '60dp',
		height: '40dp',
		enabled: true //リリース版ではfalseにする。デバッグの際に面倒なのでtrueにしているだけ
	});
	view.add(button);
	
	button.addEventListener('click', function(){
		createTabGroup();
		self.close();
	});
	
	//HTML(flipsnap.js)からデータを受信
	Ti.App.addEventListener('webview:sent', function(e) {
		//Ti.API.info(e.value);
		if(e.value == "TRUE"){
			button.enabled = true;
		}else if(e.value == "FALSE"){
			button.enabled = false;
		}
	});
	
	
	
	
	//viewをwindowに追加
	self.add(view);
	
	return self;
}

module.exports = introductionWindow;
