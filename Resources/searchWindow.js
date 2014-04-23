function searchWindow() {
	
	var ageData = [];
	var areaData = [];
	var purposeData = [];
	
	var commonMethods = require('commonMethods');
	
	var ageArray = commonMethods.returnArray("age");
	for (var i=0; i<ageArray.length; i++){
		if(i == 0){
			ageData[i] = Ti.UI.createPickerRow({title:ageArray[i],custom_item:''});
		}else{
			ageData[i] = Ti.UI.createPickerRow({title:ageArray[i],custom_item:i});
		}
	}
	
	var areaArray = commonMethods.returnArray("area");
	for (var i=0; i<areaArray.length; i++){
		if(i == 0){
			areaData[i] = Ti.UI.createPickerRow({title:areaArray[i],custom_item:''});
		}else{
			areaData[i] = Ti.UI.createPickerRow({title:areaArray[i],custom_item:i});
		}
	}
	
	var purposeArray = commonMethods.returnArray("purpose");
	for (var i=0; i<purposeArray.length; i++){
		if(i == 0){
			purposeData[i] = Ti.UI.createPickerRow({title:purposeArray[i],custom_item:''});
		}else{
			purposeData[i] = Ti.UI.createPickerRow({title:purposeArray[i],custom_item:i});
		}
	}
	

	var self = Titanium.UI.createWindow({  
    	title:'探す',
    	backgroundColor:'#fff'
	});
	
	//=========================================
	//age系要素の定義
	//=========================================
	var ageLabel = Titanium.UI.createLabel({
		text: '年齢',
		top: 30,
		left: 40,
		width: 40,
		height: 30,
		font: { fontSize: 12 }
	});
	
	var ageTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		value: "すべて",
		customItem: "",
		top: 30,
		right: 40,
		left: 85,
		height: 30,
		enabled: false,
		keyboardToolbar: false
	});
	
	//テキストフィールドがタップされたときの挙動
	ageTextField.addEventListener('click', function(){
		switch (Titanium.Platform.osname){
			case 'iphone':
				
				var commonMethods = require('commonMethods');
				var agePickerView = commonMethods.createPickerView( ageData, ageTextField );
				commonMethods.pickerSlideIn( self, agePickerView );
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
		top: 90,
		left: 40,
		width: 40,
		height: 30,
		font: { fontSize: 12 }
	});
	
	var areaTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		value: "すべて",
		customItem: "",
		top: 90,
		right: 40,
		left: 85,
		height: 30,
		enabled: false,
		keyboardToolbar: false
	});

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

	//=========================================
	//purpose系要素の定義
	//=========================================
	var purposeLabel = Titanium.UI.createLabel({
		text: '目的',
		top: 150,
		left: 40,
		width: 40,
		height: 30,
		font: { fontSize: 12 }
	});
	
	var purposeTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		value: "すべて",
		customItem: "",
		top: 150,
		right: 40,
		left: 85,
		enabled: false,
		height: 30,
		keyboardToolbar: false
	});
	
	//テキストフィールドがタップされたときの挙動
	purposeTextField.addEventListener('click', function(){
		switch (Titanium.Platform.osname){
			case 'iphone':
			
				var commonMethods = require('commonMethods');
				var purposePickerView = commonMethods.createPickerView( purposeData, purposeTextField );
				commonMethods.pickerSlideIn( self, purposePickerView );
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
		top: 220,
		right: 40,
		left: 40,
		height: 40,
		borderColor:"#1E90FF",
		borderRadius:5
	});
	
	searchButton.addEventListener('click', function(){
		
		var url = Ti.App.domain + "get_search_users.json?age=" + 
				  ageTextField.customItem +
				  "&area=" +
				  areaTextField.customItem +
				  "&purpose=" +
				  purposeTextField.customItem +
				  "&user_id=" +
				  Ti.App.userID;
		
		var commonMethods = require('commonMethods');
		var methodGetData = commonMethods.getData;
	
		methodGetData(url, function( data ){
			
			if (data.success) {
				// 通信に成功したら行う処理
				var json = data.data;
				
				var stWindow = require('searchTableWindow');
				var searchTableWindow = new stWindow(json.length);
				
				for (var i=0; i<json.length; i++){
					Ti.API.info("JSON:" + json[i].id);
					searchTableWindow.children[0].data[0].rows[i].children[0].text = json[i].nickname + "（" + commonMethods.exchangeFromNumber( json[i].age, "age" ) + "）";
					searchTableWindow.children[0].data[0].rows[i].children[1].image = json[i].profile_image1;
					searchTableWindow.children[0].data[0].rows[i].children[2].text = json[i].profile;
					searchTableWindow.children[0].data[0].rows[i].children[3].text = commonMethods.exchangeFromNumber( json[i].area, "area" ) + " | " + commonMethods.exchangeFromNumber( json[i].purpose, "purpose" ) + " | " + json[i].last_logined;
					searchTableWindow.children[0].data[0].rows[i].id = json[i].id;
				}
				
				tabGroup.activeTab.open(　searchTableWindow　);
				
			} else{
				// 通信に失敗したら行う処理
			}
		});		
	});

	self.add(ageLabel);
	self.add(areaLabel);
	self.add(purposeLabel);
	self.add(ageTextField);
	self.add(areaTextField);
	self.add(purposeTextField);
	self.add(searchButton);
	return self;
}

module.exports = searchWindow;



