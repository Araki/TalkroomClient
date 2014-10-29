function settingInquiryWindow() {
	
	var self = createWindow("お問い合わせ");
	
	var actInd = createActInd();
	
	var submitButton = Titanium.UI.createLabel({
			font:{fontFamily: _font, fontSize:16},
			text:'送信',
			textAlign: 'center',
			verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			borderRadius: 4,
			height: 25,
			width: 60,
			backgroundColor: _mossGreen,
			color: _white
	});
	self.rightNavButton = submitButton;
	
	var mailLabel = Titanium.UI.createLabel({
		text: 'メールアドレス',
		top: 10,
		left: 20,
		right: 20,
		height: 15,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 12 }
	});
	
	var mailTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 30,
		right: 20,
		left: 20,
		height: 30,
		keyboardType:Titanium.UI.KEYBOARD_EMAIL,
		returnKeyType:Titanium.UI.RETURNKEY_NEXT,
		appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
		autocapitalization: false,
		autocorrect:false,
	    borderColor:_darkBlue,
	    color: _darkGray,
	    backgroundColor: _white,
	    borderRadius:5,
	    font: { fontFamily: _font, fontSize: 18 }
	});
	
	var bodyLabel = Titanium.UI.createLabel({
		text: 'お問い合わせ内容',
		top: 70,
		left: 20,
		right: 20,
		height: 15,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 12 }
	});
	
	var textArea = Titanium.UI.createTextArea({
	        value:'',
	        top:90,
	        bottom:210,
	        left:20,
	        right:20,
	        font:{fontSize:18, fontFamily: _font },
	        color:_darkGray,
	        backgroundColor:_white,
	        textAlign:'left',
	        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
	        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	        returnKeyType:Titanium.UI.RETURNKEY_DONE,
	        suppressReturn: false,
	        autocapitalization: false,
	        autocorrect:false,
	        borderColor:_darkBlue,
	        borderRadius:5
	});
	
	submitButton.addEventListener('click', function(){
		if(textArea.value == ""){
			Ti.UI.createAlertDialog({
				title: 'お問い合わせ内容を\nご記入ください',
			}).show();
		}else{
			actInd.show();
			Flurry.logEvent('SettingInquiryWindow Push SubmitButton');
			var url = Ti.App.domain + "send_mail.json";
			var message = {
					app_token: Ti.App.Properties.getString('app_token'),
					platform: Ti.Platform.name,
					version: Ti.Platform.version,
					manufacturer: Ti.Platform.manufacturer,
					model: Ti.Platform.model,
					mail: mailTextField.value,
					body: textArea.value
			};
			
			sendData( url, message, function( data ){
				if (data.success){
					Flurry.logEvent('SettingInquiryWindow Sent Inquiry');
					//通信に成功したら行う処理
					//Ti.API.info("戻り値:" + data.data);
					Ti.UI.createAlertDialog({
						title: 'お問い合わせを送信致しました',
					  	//message: data.data
					}).show();
					
					actInd.hide();
				} else{
					//通信に失敗したら行う処理
					Ti.UI.createAlertDialog({
						title: 'お問い合わせが正常に完了しませんでした',
					  	//message: data.data
					}).show();
					actInd.hide();
				}
			});
		}		
	});
	
	self.addEventListener("open", function(){
		mailTextField.focus();
	});
	
	mailTextField.addEventListener('return', function() {
	    textArea.focus();
	});
	
	self.add(mailLabel);
	self.add(mailTextField);
	self.add(bodyLabel);
	self.add(textArea);
	self.add(actInd);
	
	return self;
}

module.exports = settingInquiryWindow;