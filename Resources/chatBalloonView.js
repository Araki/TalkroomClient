//whichSide = "left" or "right"
//message = メッセージ内容
//imageURL = イメージのパス
//chatViewHeight = このビューを設置する高さの位置

function chatBalloonView(userID, whichSide, whatMessage, whatImageURL, whichGender, whatTime, chatViewHeight ) {
	
	var sendfromID = userID;
	var side = whichSide;
	var message = whatMessage;
	var imageURL = whatImageURL;
	var gender = whichGender;
	var time = whatTime;
	var viewHeight = chatViewHeight;
	
	var labelHeight;//テキストラベルの高さ
	var limitLabelWidth = 196;//テキストラベルの横幅制限。このサイズを超える場合は複数行の処理。

	var self = Titanium.UI.createView({
		top: viewHeight,
		backgroundColor: _whiteBlue
		//backgroundColor: "blue"
	});
	
	var labelNameTime = Titanium.UI.createLabel({
		text: time,
		font:{fontFamily: _font, fontSize:10},
		color:_darkGray
	});
	
	var iconImage = Titanium.UI.createImageView({
	    	image: imageURL,
	    	bottom: 10,
	    	width: 30,
	    	height: 30,
	    	borderWidth:1,
	    	borderColor: _white,
	    	borderRadius:3
	});
	
	if(gender == 'male'){
		iconImage.borderColor = _darkBlue;
	}else if(gender == 'female'){
		iconImage.borderColor = _vividPink;
	}
	
	var balloonImage = Ti.UI.createView({
    	bottom: 10,
	});
	
	var messageLabel = Ti.UI.createLabel({
		font:{fontFamily: _font, fontSize:14},
		textAlign: "left",
		verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        text: message,
       	color:_white,
       	//backgroundColor: 'red',
       	width: 196,
       	height: Ti.UI.SIZE,//"auto",
       	center: 0//top:10,
	});
	
	//Ti.API.info(time + "WIDTH:" + messageLabel.toImage().width);
	//Ti.API.info(time + "HEIGHT:" + messageLabel.toImage().height);
	
	//テキストラベルの横幅がリミット値を超えた場合、ラベルを複数行にする処理
	if (messageLabel.toImage().width > limitLabelWidth){
		if (messageLabel.toImage().width % limitLabelWidth != 0){
			messageLabel.width = limitLabelWidth + 10;
			labelHeight = (((messageLabel.toImage().width - ( messageLabel.toImage().width % limitLabelWidth )) / limitLabelWidth) + 1 ) * (messageLabel.font.fontSize + 6);
		}else{
			messageLabel.width = limitLabelWidth + 10;
			labelHeight = (messageLabel.toImage().width / limitLabelWidth) * ( messageLabel.font.fontSize + 6 );
		}
		//Ti.API.info(time + "Label:" + labelHeight);
		//Ti.API.info("FontSize:" + messageLabel.font.fontSize);
		//messageLabelの縦、横サイズを指定
		//messageLabel.width = limitLabelWidth + 10;
		//messageLabel.height = labelHeight;
		//balloonImageの縦、横サイズを指定
		balloonImage.height = labelHeight + 20;
		balloonImage.width = limitLabelWidth + 30;
	}
	//テキストラベルの横幅がリミット値を超えなかった場合、ラベルを1行にする処理
	else if (messageLabel.toImage().width <= limitLabelWidth){
		labelHeight = messageLabel.font.fontSize + 6;
		//Ti.API.info("messageLabel.font.fontSize:" + messageLabel.font.fontSize);
		messageLabel.width = messageLabel.toImage().width + 10;
		messageLabel.height = labelHeight;
		balloonImage.height = labelHeight + 20;
		balloonImage.width = limitLabelWidth + 30;
	}

	//Ti.API.info(time + "balloonImage.height:" + balloonImage.height);
	//Ti.API.info(time + "balloonImage.width:" + balloonImage.width);
	
	
	balloonImage.width = messageLabel.width + 30;
	self.height = balloonImage.height + 30;
	labelNameTime.bottom = balloonImage.height + 15;
	
	//右バルーンか左バルーンか
	if(side == "left"){
		balloonImage.backgroundLeftCap = 21;
    	balloonImage.backgroundRightCap = 8;
    	balloonImage.backgroundTopCap = 8;
    	balloonImage.backgroundBottomCap = 8;
    	//balloonImage.textAlign = 'left';
		iconImage.left = 10;
		balloonImage.left = 50;
		balloonImage.backgroundImage = 'blue_balloon_left.png';
		messageLabel.left = 18;
		labelNameTime.left = 10;
	}else if(side == "right"){
		balloonImage.backgroundLeftCap = 8;
    	balloonImage.backgroundRightCap = 21;
    	balloonImage.backgroundTopCap = 8;
    	balloonImage.backgroundBottomCap = 8;
    	//balloonImage.textAlign = 'right';
		iconImage.right = 10;
		balloonImage.right = 50;
		balloonImage.backgroundImage = 'green_balloon_right.png';
		messageLabel.right = 18;
		labelNameTime.right = 10;
	}
	
	var actInd = createActInd();
	
	iconImage.addEventListener('click', function(){
		var upWindow = require('userProfileWindow');
		var type;
		if(sendfromID == Ti.App.Properties.getString('my_id')){
			type = "myProfile";
		}else{
			type = "";
		}
		var userProfileWindow = new upWindow(sendfromID, type);
		tabGroup.activeTab.open( userProfileWindow );
	});

	balloonImage.add(messageLabel);
	self.add(iconImage);
	self.add(balloonImage);
	self.add(labelNameTime);
	
	return self;
}

module.exports = chatBalloonView;