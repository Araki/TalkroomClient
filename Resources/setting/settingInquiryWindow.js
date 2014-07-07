function settingInquiryWindow() {
	
	var self = createWindow("お問い合わせ");
	
	var submitButton = Titanium.UI.createButton({
		title:'送信',
		color: "#fff",
		borderColor:"#fff",
		borderRadius:5
	});
	self.rightNavButton = submitButton;
	
	var mailLabel = Titanium.UI.createLabel({
		text: 'メールアドレス',
		top: 10,
		left: 20,
		right: 20,
		height: 15,
		font: { fontSize: 12 }
	});
	
	var mailTextField = Titanium.UI.createTextField({
		//borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		//value: "すべて",
		//customItem: "",
		top: 30,
		right: 20,
		left: 20,
		height: 20,
		//enabled: false,
		keyboardType:Titanium.UI.KEYBOARD_EMAIL,
		returnKeyType:Titanium.UI.RETURNKEY_NEXT,
		autocapitalization: false,
		autocorrect:false,
		//borderWidth:2,
	    borderColor:'#bbb',
	    borderRadius:5,
	    font: { fontSize: 12 }
	});
	
	var bodyLabel = Titanium.UI.createLabel({
		text: 'お問い合わせ内容',
		top: 60,
		left: 20,
		right: 20,
		height: 15,
		font: { fontSize: 12 }
	});
	
	var textArea = Titanium.UI.createTextArea({
	        value:'',
	        top:80,
	        bottom:170,
	        left:20,
	        right:20,
	        font:{fontSize:12,fontFamily:'', fontWeight:''},
	        color:'',
	        textAlign:'left',
	        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
	        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	        returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	        suppressReturn: false,
	        autocapitalization: false,
	        autocorrect:false,
	        //keyboardToolbar : [flexSpace, done],
	        //borderWidth:2,
	        borderColor:'#bbb',
	        borderRadius:5
	});
	/*
	var submitButton = Ti.UI.createButton({
		title: '送信',
		bottom: 180,
		right: 40,
		left: 40,
		height: 40,
		borderColor:"#1E90FF",
		borderRadius:5
	});
	*/
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
	//self.add(submitButton);
	
	return self;
}

module.exports = settingInquiryWindow;