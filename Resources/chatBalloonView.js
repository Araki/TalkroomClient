//whichSide = "left" or "right"
//message = メッセージ内容
//imageURL = イメージのパス
//chatViewHeight = このビューを設置する高さの位置

function chatBalloonView(whichSide, whatMessage, whatImageURL, chatViewHeight ) {
	
	var side = whichSide;
	var message = whatMessage;
	var imageURL = whatImageURL;
	var viewHeight = chatViewHeight;
	
	var labelHeight;//テキストラベルの高さ
	var limitLabelWidth = 200;//テキストラベルの横幅制限。このサイズを超える場合は複数行の処理。
	
	//Jsonのつなぎ込みができたら時刻はそのまま表示するが、現在時刻を表示するで代用
	function getTime(){
		// 日付の取得
    	var date = new Date();
    	//var year = date.getYear();
    	var mon = date.getMonth() + 1;
    	var day = date.getDate();

    	// 西暦の処理とゼロパディング
    	//year = (year < 2000) ? year+1900 : year;
    	if (mon < 10) { mon = "0" + mon; }
    	if (day < 10) { day = "0" + day; }

    	// 時間の取得
    	var time = new Date();
    	var hour = time.getHours();
    	var min = time.getMinutes();
    	var sec = time.getSeconds();

    	// ゼロパディング
    	if (hour < 10) { hour = "0" + hour; }
    	if (min < 10) { min = "0" + min; }
    	if (sec < 10) { sec = "0" + sec; }

    	// 書き出し
    	NowDate = mon + "/" + day + " " + hour + ":" + min + ":" + sec;
    	
    	return NowDate;
	}
	
	var self = Titanium.UI.createView({
		bottom: chatViewHeight,
		//backgroundColor: "blue"
	});
	
	var labelNameTime = Titanium.UI.createLabel({
		text: getTime(),
		font:{fontSize:10},
		color:'#000'
	});
	
	var iconImage = Titanium.UI.createImageView({
	    	image: imageURL,
	    	bottom: 10,
	    	width: 30,
	    	height: 30
	});
	
	var balloonImage = Ti.UI.createView({
    	backgroundLeftCap: 24,
    	backgroundRightCap: 17,
    	backgroundTopCap: 14,
    	backgroundBottomCap: 17,
    	bottom: 10,
	});
	
	var messageLabel = Ti.UI.createLabel({
		font:{fontSize:14},
		//backgroundColor: "white",
		textAlign: "left",
		verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        text: message,
       	color:'#000',
       	height: "auto",
       	top:10,
	});
	
	Ti.API.info("WIDTH:" + messageLabel.toImage().width);
	Ti.API.info("HEIGHT:" + messageLabel.toImage().height);
	
	//テキストラベルの横幅がリミット値を超えた場合、ラベルを複数行にする処理
	if (messageLabel.toImage().width > limitLabelWidth){
		if (messageLabel.toImage().width % limitLabelWidth != 0){
			labelHeight = (((messageLabel.toImage().width - ( messageLabel.toImage().width % limitLabelWidth )) / limitLabelWidth) + 1 ) * (messageLabel.font.fontSize + 4);
		}else{
			labelHeight = (messageLabel.toImage().width / limitLabelWidth) * (messageLabel.font.fontSize + 4);
		}
		//Ti.API.info("Label:" + labelHeight);
		//Ti.API.info("FontSize:" + messageLabel.font.fontSize);
		//messageLabelの縦、横サイズを指定
		messageLabel.width = limitLabelWidth + 10;
		messageLabel.height = labelHeight;
		//balloonImageの縦、横サイズを指定
		balloonImage.height = labelHeight + 20;
		balloonImage.width = limitLabelWidth + 30;
	}
	//テキストラベルの横幅がリミット値を超えなかった場合、ラベルを1行にする処理
	else if (messageLabel.toImage().width < limitLabelWidth){
		labelHeight = messageLabel.font.fontSize + 4;
		messageLabel.width = messageLabel.toImage().width + 10;
		messageLabel.height = labelHeight;
		balloonImage.height = labelHeight + 20;
		balloonImage.width = limitLabelWidth + 30;
	}
	
	balloonImage.width = messageLabel.width + 30;
	self.height = balloonImage.height + 30;
	labelNameTime.bottom = balloonImage.height + 10;
	
	//右バルーンか左バルーンか
	if(side == "left"){
		iconImage.left = 10;
		balloonImage.left = 50;
		balloonImage.backgroundImage = 'WhiteBalloonLeft.png';
		messageLabel.left = 20;
		labelNameTime.left = 10;
	}else if(side == "right"){
		iconImage.right = 10;
		balloonImage.right = 50;
		balloonImage.backgroundImage = 'GreenBalloonRight.png';
		messageLabel.right = 20;
		labelNameTime.right = 10;
	}

	balloonImage.add(messageLabel);
	self.add(iconImage);
	self.add(balloonImage);
	self.add(labelNameTime);
	
	return self;
}

module.exports = chatBalloonView;