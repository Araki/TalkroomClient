function settingTOSWindow() {
	var self = Titanium.UI.createWindow({  
	    title:'利用規約',
	    backgroundColor:'#fff'
	});
	
	var webView = Titanium.UI.createWebView({
		url: 'tos.html'
	});
	
	self.add(webView);
	
	return self;
}

module.exports = settingTOSWindow;