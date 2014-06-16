function settingInquiryWindow() {
	
	var self = createWindow("お問い合わせ");
	
	var done = Titanium.UI.createButton({
	    title : '閉じる',
    	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
	});
	
	var flexSpace = Titanium.UI.createButton({
	    systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var mailLabel = Titanium.UI.createLabel({
		text: 'メールアドレス',
		top: 20,
		left: 20,
		right: 20,
		height: 20,
		font: { fontSize: 12 }
	});
	
	var mailTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		//value: "すべて",
		//customItem: "",
		top: 45,
		right: 20,
		left: 20,
		height: 30,
		//enabled: false,
		keyboardType:Titanium.UI.KEYBOARD_EMAIL,
		borderWidth:2,
	    borderColor:'#bbb',
	    borderRadius:5
	});
	
	var bodyLabel = Titanium.UI.createLabel({
		text: 'お問い合わせ内容',
		top: 85,
		left: 20,
		right: 20,
		height: 20,
		font: { fontSize: 12 }
	});
	
	var textArea = Titanium.UI.createTextArea({
	        value:'',
	        top:110,
	        bottom:240,
	        left:20,
	        right:20,
	        font:{fontSize:13,fontFamily:'', fontWeight:''},
	        color:'',
	        textAlign:'left',
	        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
	        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	        //returnKeyType:Titanium.UI.RETURNKEY_DONE,
	        keyboardToolbar : [flexSpace, done],
	        borderWidth:2,
	        borderColor:'#bbb',
	        borderRadius:5
	});
	
	var submitButton = Ti.UI.createButton({
		title: '送信',
		bottom: 180,
		right: 40,
		left: 40,
		height: 40,
		borderColor:"#1E90FF",
		borderRadius:5
	});
	
	submitButton.addEventListener('click', function(){
		
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
		
		var methodSendData = require('commonMethods').sendData;
		methodSendData( url, message, function( data ){
			if (data.success){
				//通信に成功したら行う処理
				Ti.API.info("戻り値:" + data.data);
				
				Ti.UI.createAlertDialog({
					title: 'データ送信成功',
				  	message: data.data
				}).show();
				
			} else{
				//通信に失敗したら行う処理
				Ti.UI.createAlertDialog({
					title: 'エラー',
				  	message: data.data
				}).show();
				
			}
		});		
	});
	
	self.add(mailLabel);
	self.add(mailTextField);
	self.add(bodyLabel);
	self.add(textArea);
	self.add(submitButton);
	
	return self;
}

module.exports = settingInquiryWindow;