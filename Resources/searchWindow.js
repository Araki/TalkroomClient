function searchWindow() {
	
	var self = createWindow("探す");
	
	var baseView = Titanium.UI.createView({
		top: 0,
		bottom: 0,
		backgroundColor: _lightBlue
	});
	var ageData = [];
	var areaData = [];
	var purposeData = [];
	
	var ageArray = returnArray("age");
	for (var i=0; i<ageArray.length; i++){
		if(i == 0){
			ageData[i] = Ti.UI.createPickerRow({title:ageArray[i],custom_item:''});
		}else{
			ageData[i] = Ti.UI.createPickerRow({title:ageArray[i],custom_item:i});
		}
	}
	
	var areaArray = returnArray("area");
	for (var i=0; i<areaArray.length; i++){
		if(i == 0){
			areaData[i] = Ti.UI.createPickerRow({title:areaArray[i],custom_item:''});
		}else{
			areaData[i] = Ti.UI.createPickerRow({title:areaArray[i],custom_item:i});
		}
	}
	
	var purposeArray = returnArray("purpose");
	for (var i=0; i<purposeArray.length; i++){
		if(i == 0){
			purposeData[i] = Ti.UI.createPickerRow({title:purposeArray[i],custom_item:''});
		}else{
			purposeData[i] = Ti.UI.createPickerRow({title:purposeArray[i],custom_item:i});
		}
	}
	
	//=========================================
	//age系要素の定義
	//=========================================
	var ageLabel = Titanium.UI.createLabel({
		text: '年齢',
		top: 30,
		left: 30,
		width: 60,
		height: 30,
		color: _white,
		font:{fontFamily: _font, fontSize: 17 }
	});
	
	var ageTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		font:{fontFamily: _font, fontSize: 17},
		value: "すべて",
		customItem: "",
		textAlign: "center",
		top: 30,
		right: 30,
		left: 100,
		height: 30,
		enabled: false,
		color: _lightBlue,
		keyboardToolbar: false,
		borderRadius: 10
	});
	
	//テキストフィールドがタップされたときの挙動
	ageTextField.addEventListener('click', function(){
		switch (Titanium.Platform.osname){
			case 'iphone':
				
				var agePickerView = createPickerView( ageData, ageTextField, self );
				pickerSlideIn( self, agePickerView );
    			break;
    			
    		case 'android':
    			break;
		}
		
	});
	
	//=========================================
	//area系要素の定義
	//=========================================
	var areaLabel = Titanium.UI.createLabel({
		text: 'エリア',
		top: 80,
		left: 30,
		width: 60,
		height: 30,
		color: _white,
		font:{fontFamily: _font, fontSize: 17 }
	});
	
	var areaTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		font:{fontFamily: _font, fontSize: 17},
		value: "すべて",
		customItem: "",
		textAlign: "center",
		top: 80,
		right: 30,
		left: 100,
		height: 30,
		enabled: false,
		color: _lightBlue,
		keyboardToolbar: false,
		borderRadius: 10
	});

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

	//=========================================
	//purpose系要素の定義
	//=========================================
	var purposeLabel = Titanium.UI.createLabel({
		text: '目的',
		top: 130,
		left: 30,
		width: 60,
		height: 30,
		color: _white,
		font:{fontFamily: _font, fontSize: 17 }
	});
	
	var purposeTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		font:{fontFamily: _font, fontSize: 17},
		value: "すべて",
		customItem: "",
		textAlign: "center",
		top: 130,
		right: 30,
		left: 100,
		enabled: false,
		height: 30,
		color: _lightBlue,
		keyboardToolbar: false,
		borderRadius: 10
	});
	
	//テキストフィールドがタップされたときの挙動
	purposeTextField.addEventListener('click', function(){
		switch (Titanium.Platform.osname){
			case 'iphone':
			
				var purposePickerView = createPickerView( purposeData, purposeTextField, self );
				pickerSlideIn( self, purposePickerView );
    			break;
    			
    		case 'android':
    			break;
		}	
	});

	//=========================================
	//決定ボタン
	//=========================================
	
	var searchButton = Ti.UI.createButton({
		title: 'この条件で探す',
		font:{fontFamily: _font, fontSize: 18},
		top: 190,
		right: 65,
		left: 65,
		height: 35,
		//borderColor:"#1E90FF",
		color: _white,
		backgroundColor: _vividPink,
		borderRadius:10
	});
	
	searchButton.addEventListener('click', function(){
		
		var stWindow = require('searchTableWindow');
		var searchTableWindow = new stWindow(
			ageTextField.customItem,
			areaTextField.customItem,
			purposeTextField.customItem
			);
		
		tabGroup.activeTab.open(　searchTableWindow　);		
	});
	
	
	baseView.add(ageLabel);
	baseView.add(areaLabel);
	baseView.add(purposeLabel);
	baseView.add(ageTextField);
	baseView.add(areaTextField);
	baseView.add(purposeTextField);
	baseView.add(searchButton);
	self.add(baseView);
	return self;
}

module.exports = searchWindow;



