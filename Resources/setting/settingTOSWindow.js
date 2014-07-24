function settingTOSWindow() {
	var self = createWindow("利用規約");	
	var webView = Titanium.UI.createWebView({
		url: 'tos.html'
	});
	
	self.add(webView);
	
	return self;
}

module.exports = settingTOSWindow;