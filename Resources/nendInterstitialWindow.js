function nendInterstitialWindow(){
	
	var self = Titanium.UI.createWindow({
		backgroundColor: '#fff',
		tabBarHidden: true,
		navBarHidden: true,
		backgroundColor: 'transparent',
		visible: false
	});
	
	var adview = Titanium.UI.createView({
		width:300,
		height:250
	});
	var nendAd = nend.createView({
        spotId: '277713',
        apiKey: '1d45d61fc2d6a620799606b4ae7cfd03ebff9e91',
        width:  300,
        height: 250
    });
    
	var closeButton = Titanium.UI.createButton({
		backgroundImage:'images/close.png',
		width:20,
		height:20,
		right: Ti.Platform.displayCaps.platformWidth / 2 - 150,
		top: Ti.Platform.displayCaps.platformHeight / 2 - 125
	}); 
	closeButton.addEventListener('click', function(){
		self.visible = false;
		adview.remove(nendAd);
		nendAd = null;
		nendAd = nend.createView({
	        spotId: '277713',
	        apiKey: '1d45d61fc2d6a620799606b4ae7cfd03ebff9e91',
	        width:  300,
	        height: 250
	    });
	    adview.add(nendAd);
	});
	
	var blackView = Titanium.UI.createView({
		top: 0,
		bottom: 0,
		backgroundColor: 'black',
		opacity: 0.5
	});
	
    adview.add(nendAd);
	self.add(blackView);
	self.add(adview);
	self.add(closeButton);
	return self;
}

module.exports = nendInterstitialWindow;
