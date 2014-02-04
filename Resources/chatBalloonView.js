//whichSide = "left" or "right"
//message = メッセージ内容
//imageURL = イメージのパス

function chatBalloonView(whichSide, whatMessage, whatImageURL ) {
	
	var side = whichSide;
	var message = whatMessage;
	var imageURL = whatImageURL;
	
	var self = Titanium.UI.createView({
		height: 60,
		bottom: 0
	});
	
	var iconImage = Titanium.UI.createImageView({
	    	image: imageURL,//'http://profile.ak.fbcdn.net/hprofile-ak-prn2/276018_721214203_1913647351_q.jpg',
	    	top: 0,
	    	//left: 5,
	    	width: 50,
	    	height: 50
	});
	
	var balloonImage = Ti.UI.createView({
    	//backgroundImage: 'WhiteBalloonLeft.png',
    	backgroundLeftCap: 24,
    	backgroundRightCap: 17,
    	backgroundTopCap: 14,
    	backgroundBottomCap: 17,
    	height: 30,
    	top: 0,
    	//left: 60,
    	//width: 100
	});
	
	var messageLabel = Ti.UI.createLabel({
		//font:{fontSize:15}, 
        //textAlign:'left',
        text: message,
       	color:'#000',
       	top:3, 
       	//right:30, 
       	//width:170, 
        //height:30	
	});
	
	Ti.API.info("HEIGHT:" + messageLabel.toImage().height);
	Ti.API.info("WIDTH:" + messageLabel.toImage().width);
	
	if(side == "left"){
		iconImage.left = 10;
		balloonImage.left = 70;
		balloonImage.width = messageLabel.toImage().width + 30;
		balloonImage.backgroundImage = 'WhiteBalloonLeft.png';
		messageLabel.textAlign = "left";
		messageLabel.width = messageLabel.toImage().width;
		messageLabel.left = 20;
	}else if(side == "right"){
		iconImage.right = 10;
		balloonImage.right = 70;
		balloonImage.width = messageLabel.toImage().width + 30;
		balloonImage.backgroundImage = 'GreenBalloonRight.png';
		messageLabel.textAlign = "right";
		messageLabel.width = messageLabel.toImage().width;
		messageLabel.right = 20;
	}

	balloonImage.add(messageLabel);
	self.add(iconImage);
	self.add(balloonImage);
	
	return self;
}

module.exports = chatBalloonView;