function chatWindow() {

	var self = Titanium.UI.createWindow({  
	    title:'チャット',
	    backgroundColor:'#fff'
	});
	
	var cbView = require('chatBalloonView');
	var chatView = new cbView("right", "こんにちはこんにちは", "http://profile.ak.fbcdn.net/hprofile-ak-prn2/276018_721214203_1913647351_q.jpg");
	self.add(chatView);
	
	return self;
}

module.exports = chatWindow;