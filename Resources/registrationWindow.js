function registrationWindow(){
	
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
		height: 30
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

	//closeButton
	var closeButton = Ti.UI.createButton({
		title: '閉じる',
		bottom: 50,
		right: 20,
		left: 20,
		height: 50,
		borderColor:"#1E90FF",
		borderRadius:5
	});
	self.add( closeButton );
	
	closeButton.addEventListener('click', function() {
		self.close();
	});
	

	return self;
}

module.exports = registrationWindow;