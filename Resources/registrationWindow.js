function registrationWindow(){	
	
	//年齢番号とエリア番号と目的番号の取得
	var ageData = [];
	var areaData = [];
	var purposeData = [];
	
	var commonMethods = require('commonMethods');
	var iWindow = require('introductionWindow');
	var introductionWindow = new iWindow();
	
	var ageArray = commonMethods.returnArray("age");
	for (var i=0; i<ageArray.length; i++){
		if(i == 0){
			ageData[i] = Ti.UI.createPickerRow({title:'',custom_item:''});
		}else{
			ageData[i] = Ti.UI.createPickerRow({title:ageArray[i],custom_item:i});
		}
	}
	
	var areaArray = commonMethods.returnArray("area");
	for (var i=0; i<areaArray.length; i++){
		if(i == 0){
			areaData[i] = Ti.UI.createPickerRow({title:'',custom_item:''});
		}else{
			areaData[i] = Ti.UI.createPickerRow({title:areaArray[i],custom_item:i});
		}
	}
	
	var purposeArray = commonMethods.returnArray("purpose");
	for (var i=0; i<purposeArray.length; i++){
		if(i == 0){
			purposeData[i] = Ti.UI.createPickerRow({title:'',custom_item:''});
		}else{
			purposeData[i] = Ti.UI.createPickerRow({title:purposeArray[i],custom_item:i});
		}
	}
	
	
	var self = Ti.UI.createWindow({backgroundColor: 'white'});
	
	//ニックネーム
	var nicknameLabel = Titanium.UI.createLabel({
		text: 'ニックネーム',
		top: 30,
		left: 40,
		width: 40,
		height: 30,
		font: { fontSize: 12 }
	});
	self.add(nicknameLabel);
	
	var nicknameTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 30,
		right: 40,
		left: 85,
		height: 30,
		keyboardToolbar: false
	});
	self.add(nicknameTextField);

	//年齢
	var ageLabel = Titanium.UI.createLabel({
		text: '年齢',
		top: 80,
		left: 40,
		width: 40,
		height: 30,
		font: { fontSize: 12 }
	});
	self.add(ageLabel);
	
	var ageTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 80,
		right: 40,
		left: 85,
		height: 30,
		enabled: false,
		keyboardToolbar: false
	});
	self.add(ageTextField);
	
	//テキストフィールドがタップされたときの挙動
	ageTextField.addEventListener('click', function(){
		switch (Titanium.Platform.osname){
			case 'iphone':
    			var commonMethods = require('commonMethods');
				var agePickerView = commonMethods.createPickerView( ageData, ageTextField );
				commonMethods.pickerSlideIn(self, agePickerView);
    			break;
    			
    		case 'android':
    			break;
		}
	});
	
	//居住地
	var areaLabel = Titanium.UI.createLabel({
		text: '居住地',
		top: 130,
		left: 40,
		width: 40,
		height: 30,
		font: { fontSize: 12 }
	});
	self.add(areaLabel);
	
	var areaTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 130,
		right: 40,
		left: 85,
		height: 30,
		enabled: false,
		keyboardToolbar: false
	});
	self.add(areaTextField);
	
	//テキストフィールドがタップされたときの挙動
	areaTextField.addEventListener('click', function(){
		switch (Titanium.Platform.osname){
			case 'iphone':
    			var commonMethods = require('commonMethods');
				var areaPickerView = commonMethods.createPickerView( areaData, areaTextField );
				commonMethods.pickerSlideIn(self, areaPickerView);
    			break;
    			
    		case 'android':
    			break;
		}
	});
	
	//目的
	var purposeLabel = Titanium.UI.createLabel({
		text: '目的',
		top: 180,
		left: 40,
		width: 40,
		height: 30,
		font: { fontSize: 12 }
	});
	self.add(purposeLabel);
	
	var purposeTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 180,
		right: 40,
		left: 85,
		height: 30,
		enabled: false,
		keyboardToolbar: false
	});
	self.add(purposeTextField);
	
	//テキストフィールドがタップされたときの挙動
	purposeTextField.addEventListener('click', function(){
		switch (Titanium.Platform.osname){
			case 'iphone':
    			var commonMethods = require('commonMethods');
				var purposePickerView = commonMethods.createPickerView( purposeData, purposeTextField );
				commonMethods.pickerSlideIn(self, purposePickerView);
    			break;
    			
    		case 'android':
    			break;
		}
	});
	
	//一言
	var profileLabel = Titanium.UI.createLabel({
		text: '一言',
		top: 230,
		left: 40,
		width: 40,
		height: 30,
		font: { fontSize: 12 }
	});
	self.add(profileLabel);
	
	var profileTextField = Titanium.UI.createTextArea({
        value:'',
        top:260,
        height:80,
        left:40,
        right:40,
        textAlign:'left',
        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType:Titanium.UI.RETURNKEY_DONE,
        borderWidth:2,
        borderColor:'#bbb',
        borderRadius:5
	});
	self.add(profileTextField);

	
	var submitButton = Ti.UI.createButton({
		title: '決定',
		bottom: 50,
		right: 20,
		left: 20,
		height: 50,
		borderColor:"#1E90FF",
		borderRadius:5
	});
	self.add( submitButton );
	
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
		if ( purposeTextField.customItem == "" ){
			errorMessage = errorMessage + "目的を入力してください。\n";
		}
		
		if ( errorMessage != "" ){
			alert(errorMessage);
		}else{
			var url = Ti.App.domain + "create_account.json";
			var message = {
				channel: "facebook",
				fb_uid: self.uid,
				nickname: nicknameTextField.value,
				gender: self.gender,
				email: self.email,
				age: ageTextField.customItem,
				purpose: purposeTextField.customItem,
				area: areaTextField.customItem,
				profile_image1: "http://graph.facebook.com/" + self.uid + "/picture",
				profile: profileTextField.value,
				point: 0,
      			access_token: Ti.Utils.md5HexDigest(Ti.Utils.md5HexDigest(self.uid))
				//Facebook Friendsを取得し知り合いが検索に出ないようにする機能は必要になったときに実装し初期バージョンでは実装しない
				//friends_list: self.friends_list
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
					
          
			        // app_token を保存する
			        var obj = JSON.parse(data.data);
			        Ti.App.Properties.setString('app_token', obj.app_token);
			        Ti.App.Properties.setString('my_id', obj.id);
          
					//イントロダクションウィンドウを開く
					introductionWindow.open();
					//登録に成功したらウィンドウを閉じる
					self.close();
					
					
				} else{
					//通信に失敗したら行う処理
					Ti.UI.createAlertDialog({
						title: 'エラー',
					  	message: data.data
					}).show();
					
				}
			});
			
		}
	});
	

	return self;
}

module.exports = registrationWindow;
