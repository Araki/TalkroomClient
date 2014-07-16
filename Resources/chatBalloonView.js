//whichSide = "left" or "right"
//message = メッセージ内容
//imageURL = イメージのパス
//chatViewHeight = このビューを設置する高さの位置

function chatBalloonView(userID, whichSide, whatMessage, whatImageURL, whatTime, chatViewHeight ) {
	
	var sendfromID = userID;
	var side = whichSide;
	var message = whatMessage;
	var imageURL = whatImageURL;
	var time = whatTime;
	var viewHeight = chatViewHeight;
	
	var labelHeight;//テキストラベルの高さ
	var limitLabelWidth = 200;//テキストラベルの横幅制限。このサイズを超える場合は複数行の処理。

	var self = Titanium.UI.createView({
		top: viewHeight,
		//backgroundColor: "blue"
	});
	
	var labelNameTime = Titanium.UI.createLabel({
		text: time,
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
	
	var actInd = createActInd();
	
	iconImage.addEventListener('click', function(){
				
		var url = Ti.App.domain + "get_detail_profile.json?app_token=" + Ti.App.Properties.getString('app_token') + "&user_id=" + sendfromID;
		
		getData(url, function( data ){
			
			if (data.success) {
				// 通信に成功したら行う処理
				var json = data.data;
				
				var upWindow = require('userProfileWindow');
				var userProfileWindow;
				if(userID == Ti.App.Properties.getString('my_id')){
					userProfileWindow = new upWindow('myProfile');
				}else{
					userProfileWindow = new upWindow();
				}
				
				
				userProfileWindow.id = userID;
				userProfileWindow.titleControl.text = json[0].nickname;
				userProfileWindow.children[1].children[0].image = json[0].profile_image1;
				userProfileWindow.children[1].children[1].image = json[0].profile_image2;
				userProfileWindow.children[1].children[2].image = json[0].profile_image3;
				userProfileWindow.children[0].data[0].rows[0].children[0].text = "年代";
				userProfileWindow.children[0].data[0].rows[0].children[1].text = exchangeFromNumber(json[0].age, "age");
				userProfileWindow.children[0].data[0].rows[1].children[0].text = "エリア";
				userProfileWindow.children[0].data[0].rows[1].children[1].text = exchangeFromNumber(json[0].area, "area");
				userProfileWindow.children[0].data[0].rows[2].children[0].text = "目的";
				userProfileWindow.children[0].data[0].rows[2].children[1].text = exchangeFromNumber(json[0].purpose, "purpose");
				userProfileWindow.children[0].data[0].rows[3].children[0].text = "一言";
				userProfileWindow.children[0].data[0].rows[3].children[1].text = json[0].profile;
				userProfileWindow.children[0].data[0].rows[4].children[0].text = "身長";
				userProfileWindow.children[0].data[0].rows[4].children[1].text = exchangeFromNumber(json[0].tall, "tall");
				userProfileWindow.children[0].data[0].rows[5].children[0].text = "血液型";
				userProfileWindow.children[0].data[0].rows[5].children[1].text = exchangeFromNumber(json[0].blood, "blood");
				userProfileWindow.children[0].data[0].rows[6].children[0].text = "体型";
				userProfileWindow.children[0].data[0].rows[6].children[1].text = exchangeFromNumber(json[0].style, "style");
				userProfileWindow.children[0].data[0].rows[7].children[0].text = "休日";
				userProfileWindow.children[0].data[0].rows[7].children[1].text = exchangeFromNumber(json[0].holiday, "holiday");
				userProfileWindow.children[0].data[0].rows[8].children[0].text = "お酒";
				userProfileWindow.children[0].data[0].rows[8].children[1].text = exchangeFromNumber(json[0].alcohol, "alcohol");
				userProfileWindow.children[0].data[0].rows[9].children[0].text = "タバコ";
				userProfileWindow.children[0].data[0].rows[9].children[1].text = exchangeFromNumber(json[0].cigarette, "cigarette"); 
				userProfileWindow.children[0].data[0].rows[10].children[0].text = "給料";
				userProfileWindow.children[0].data[0].rows[10].children[1].text = exchangeFromNumber(json[0].salary, "salary");
				
				tabGroup.activeTab.open( userProfileWindow );
				
			} else{
				// 通信に失敗したら行う処理
			}
		});
	});

	balloonImage.add(messageLabel);
	self.add(iconImage);
	self.add(balloonImage);
	self.add(labelNameTime);
	
	return self;
}

module.exports = chatBalloonView;