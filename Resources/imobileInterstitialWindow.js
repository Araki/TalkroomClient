function imobileInterstitialWindow(){
	
	var self = Titanium.UI.createWindow({
		backgroundColor: '#fff',
		tabBarHidden: true,
		navBarHidden: true,
		backgroundColor: 'transparent',
		visible: false
	});
	
	var adview = Titanium.UI.createView({
		width:320,
		height:270
	});

   var imobileAd = Titanium.UI.createWebView({
		url: 'imobile.html',
		width:320,
		height:270
	});
	//imobileの広告がクリックされたらSafariで開く
	imobileAd.addEventListener("linkClick", function(e) {
	    if (e.url.length > 0) {
	        Titanium.Platform.openURL(e.url);
	    }
	});
	
	imobileAd.addEventListener('beforeload',function(e){
		if (e.url.match(/^file:\/\//) ){
		}else{
			if(roadflag == true){
				Ti.API.info('############Ad click');
				Ti.Platform.openURL(e.url);
				imobileAd.stopLoading();
			}else{
				Ti.API.info('############Initial Load');
			}
		}
	});
	imobileAd.addEventListener('load',function(e){
		if (e.url.match(/^file:\/\//) ){
		}else{
			if (imobileAd.canGoBack()){
				imobileAd.goBack( );
			}
		}
		roadflag = true;
	});
	
	var closeButton = Titanium.UI.createButton({
		backgroundImage:'images/close.png',
		width:20,
		height:20,
		right: Ti.Platform.displayCaps.platformWidth / 2 - 160,
		top: Ti.Platform.displayCaps.platformHeight / 2 - 135
	});
	 
	closeButton.addEventListener('click', function(){
		self.visible = false;
		adview.remove(imobileAd);
		imobileAd = null;
		imobileAd = Titanium.UI.createWebView({
			url: 'imobile.html',
			width:320,
			height:270
		});
	    adview.add(imobileAd);
	});
	
	var blackView = Titanium.UI.createView({
		top: 0,
		bottom: 0,
		backgroundColor: 'black',
		opacity: 0.5
	});
	
	adview.add(imobileAd);
	self.add(blackView);
	self.add(adview);
	self.add(closeButton);
	return self;
}

module.exports = imobileInterstitialWindow;
