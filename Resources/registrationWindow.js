function registrationWindow(){	
	
	//年齢番号とエリア番号と目的番号の取得
	var ageData = [];
	var areaData = [];
	//var purposeData = [];
	
	var iWindow = require('introductionWindow');
	var introductionWindow = new iWindow();
	var actInd = createActInd();
	
	var ageArray = returnArray("age");
	for (var i=0; i<ageArray.length; i++){
		if(i == 0){
			ageData[i] = Ti.UI.createPickerRow({title:'',custom_item:''});
		}else{
			ageData[i] = Ti.UI.createPickerRow({title:ageArray[i],custom_item:i});
		}
	}
	
	var areaArray = returnArray("area");
	for (var i=0; i<areaArray.length; i++){
		if(i == 0){
			areaData[i] = Ti.UI.createPickerRow({title:'',custom_item:''});
		}else{
			areaData[i] = Ti.UI.createPickerRow({title:areaArray[i],custom_item:i});
		}
	}
	/*
	var purposeArray = returnArray("purpose");
	for (var i=0; i<purposeArray.length; i++){
		if(i == 0){
			purposeData[i] = Ti.UI.createPickerRow({title:'',custom_item:''});
		}else{
			purposeData[i] = Ti.UI.createPickerRow({title:purposeArray[i],custom_item:i});
		}
	}
	*/
	
	var self = Ti.UI.createWindow({backgroundColor: 'white'});
	
	var scrollView = Titanium.UI.createScrollView({
		contentWidth: "auto",
		contentHeight: "auto",
		top: 0,
		backgroundColor: _whiteBlue,
		showVerticalScrollIndicator: true
	});
	self.add(scrollView);//0
	
	var view = Titanium.UI.createView({
		height: 500,
		backgroundColor: _whiteBlue
	});
	scrollView.add(view);//0-0
	
	//ニックネーム
	var nicknameLabel = Titanium.UI.createLabel({
		text: 'ニックネーム',
		top: 40,
		left: 40,
		right: 40,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 15 }
	});
	view.add(nicknameLabel);//0-0-0
	
	var nicknameTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 65,
		right: 40,
		left: 40,
		height: 30,
		borderRadius: 10,
		borderColor: _darkBlue,
		color: _darkBlue,
		backgroundColor: _white,
		font:{fontFamily: _font, fontSize: 15 },
		keyboardToolbar: false
	});
	view.add(nicknameTextField);//0-0-1

	//年齢
	var ageLabel = Titanium.UI.createLabel({
		text: '年齢',
		top: 110,
		left: 40,
		right: 40,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 15 }
	});
	view.add(ageLabel);//0-0-2
	
	var ageTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 135,
		right: 40,
		left: 40,
		height: 30,
		borderRadius: 10,
		borderColor: _darkBlue,
		color: _darkBlue,
		backgroundColor: _white,
		font:{fontFamily: _font, fontSize: 15 },
		enabled: false,
		keyboardToolbar: false
	});
	view.add(ageTextField);//0-0-3
	
	//テキストフィールドがタップされたときの挙動
	ageTextField.addEventListener('click', function(){
		switch (Titanium.Platform.osname){
			case 'iphone':
				var agePickerView = createPickerView( ageData, ageTextField, self );
				pickerSlideIn(self, agePickerView);
    			break;
    			
    		case 'android':
    			break;
		}
	});
	
	//居住地
	var areaLabel = Titanium.UI.createLabel({
		text: '居住地',
		top: 180,
		left: 40,
		right: 40,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 15 }
	});
	view.add(areaLabel);//0-0-4
	
	var areaTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 205,
		right: 40,
		left: 40,
		height: 30,
		borderRadius: 10,
		borderColor: _darkBlue,
		color: _darkBlue,
		backgroundColor: _white,
		font:{fontFamily: _font, fontSize: 15 },
		enabled: false,
		keyboardToolbar: false
	});
	view.add(areaTextField);//0-0-5
	
	//テキストフィールドがタップされたときの挙動
	areaTextField.addEventListener('click', function(){
		switch (Titanium.Platform.osname){
			case 'iphone':
				var areaPickerView = createPickerView( areaData, areaTextField, self );
				pickerSlideIn(self, areaPickerView);
    			break;
    			
    		case 'android':
    			break;
		}
	});
	/*
	//目的
	var purposeLabel = Titanium.UI.createLabel({
		text: '目的',
		top: 230,
		left: 40,
		right: 40,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 15 }
	});
	view.add(purposeLabel);
	
	var purposeTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 255,
		right: 40,
		left: 40,
		height: 30,
		borderRadius: 10,
		borderColor: _darkBlue,
		color: _darkBlue,
		backgroundColor: _white,
		font:{fontFamily: _font, fontSize: 15 },
		enabled: false,
		keyboardToolbar: false
	});
	view.add(purposeTextField);
	
	//テキストフィールドがタップされたときの挙動
	purposeTextField.addEventListener('click', function(){
		switch (Titanium.Platform.osname){
			case 'iphone':
				var purposePickerView = createPickerView( purposeData, purposeTextField, self );
				pickerSlideIn(self, purposePickerView);
    			break;
    			
    		case 'android':
    			break;
		}
	});
	*/
	//自己紹介
	var profileLabel = Titanium.UI.createLabel({
		text: '一言',
		top: 245,
		left: 40,
		right: 40,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 15 }
	});
	view.add(profileLabel);//0-0-6
	
	var profileTextField = Titanium.UI.createTextArea({
        value:'',
        top:270,
        height:90,
        left:40,
        right:40,
        textAlign:'left',
        borderRadius: 10,
		borderColor: _darkBlue,
		color: _darkBlue,
		backgroundColor: _white,
        font:{fontFamily: _font, fontSize: 15 },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType:Titanium.UI.RETURNKEY_DONE,
	});
	view.add(profileTextField);//0-0-7

	
	var submitButton = Ti.UI.createButton({
		title: '決定',
		font:{fontFamily: _font, fontSize: 19},
		top: 390,
		right: 40,
		left: 40,
		height: 50,
		//borderColor:"#1E90FF",
		color: _white,
		backgroundColor: _mossGreen,
		borderRadius:10
	});
	view.add( submitButton );//0-0-8
	
	submitButton.addEventListener('click', function() {
		
		var errorMessage = "";
		if ( nicknameTextField.value == "" ){
			errorMessage = errorMessage + "ニックネームを入力してください。\n";
		}
		if ( ageTextField.customItem == "" ){
			errorMessage = errorMessage + "年齢を入力してください。\n";
		}
		if ( areaTextField.customItem == "" ){
			errorMessage = errorMessage + "居住地を入力してください。\n";
		}
		/*
		if ( purposeTextField.customItem == "" ){
			errorMessage = errorMessage + "目的を入力してください。\n";
		}
		*/
		
		if ( errorMessage != "" ){
			//alert(errorMessage);
			Ti.UI.createAlertDialog({
				title: 'エラー',
			  	message: errorMessage
			}).show();
		}else{
			
			actInd.show();
			var url = Ti.App.domain + "create_account.json";
			var message = {
				uuid: iOSUniqueID.getUUID,
				idfv: iOSUniqueID.getIdentifierForVendor,
				idfa: iOSUniqueID.getAdvertisingIdentifier,
				channel: "facebook",
				fb_uid: self.uid,
				nickname: nicknameTextField.value,
				gender: self.gender,
				email: self.email,
				age: ageTextField.customItem,
				area: areaTextField.customItem,
				profile_image1: "http://graph.facebook.com/" + self.uid + "/picture",
				profile: profileTextField.value,
      			access_token: Ti.Utils.md5HexDigest(Ti.Utils.md5HexDigest(self.uid))
			};
			
			sendData( url, message, function( data ){
				if (data.success){
					Flurry.logEvent('Registration Window SignUp Finish');
					//通信に成功したら行う処理
					//Ti.API.info("戻り値:" + data.data);
					
					
					Ti.UI.createAlertDialog({
						title: '登録完了',
					  	//message: data.data
					}).show();
					
          
			        // app_token を保存する
			        var obj = JSON.parse(data.data);
			        Ti.App.Properties.setString('app_token', obj.app_token);
			        Ti.App.Properties.setString('my_id', obj.id);
			        Ti.App.Properties.setString('channel', obj.channel);
          
					//イントロダクションウィンドウを開く
					//introductionWindow.open();
					createTabGroup();
					facebookWindow.close();
					
					//登録に成功したらウィンドウを閉じる
					actInd.hide();
					self.close();
					
					
				} else{
					//通信に失敗したら行う処理
					Ti.UI.createAlertDialog({
						title: '登録に失敗しました',
					  	//message: data.data
					}).show();
					actInd.hide();
				}
			});
			
		}
	});
	
	self.add(actInd);
	
	return self;
}

module.exports = registrationWindow;
