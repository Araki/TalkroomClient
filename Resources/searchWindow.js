function searchWindow() {
	
	
	var ageData = [];
	ageData[0] = Ti.UI.createPickerRow({title:'すべて',custom_item:''});
	ageData[1] = Ti.UI.createPickerRow({title:'18〜19歳',custom_item:'1'});
	ageData[2] = Ti.UI.createPickerRow({title:'20代前半',custom_item:'2'});
	ageData[3] = Ti.UI.createPickerRow({title:'20代半ば',custom_item:'3'});
	ageData[4] = Ti.UI.createPickerRow({title:'20代後半',custom_item:'4'});
	ageData[5] = Ti.UI.createPickerRow({title:'30代前半',custom_item:'5'});
	ageData[6] = Ti.UI.createPickerRow({title:'30代半ば',custom_item:'6'});
	ageData[7] = Ti.UI.createPickerRow({title:'30代後半',custom_item:'7'});
	ageData[8] = Ti.UI.createPickerRow({title:'40代前半',custom_item:'8'});
	ageData[9] = Ti.UI.createPickerRow({title:'40代半ば',custom_item:'9'});
	ageData[10] = Ti.UI.createPickerRow({title:'40代後半',custom_item:'10'});
	ageData[11] = Ti.UI.createPickerRow({title:'50代以上',custom_item:'11'});
	
	var areaData = [];
	areaData[0] = Ti.UI.createPickerRow({title:'すべて',custom_item:''});
	areaData[1] = Ti.UI.createPickerRow({title:'北海道',custom_item:'1'});
	areaData[2] = Ti.UI.createPickerRow({title:'青森県',custom_item:'2'});
	areaData[3] = Ti.UI.createPickerRow({title:'岩手県',custom_item:'3'});
	areaData[4] = Ti.UI.createPickerRow({title:'宮城県',custom_item:'4'});
	areaData[5] = Ti.UI.createPickerRow({title:'秋田県',custom_item:'5'});
	areaData[6] = Ti.UI.createPickerRow({title:'山形県',custom_item:'6'});
	areaData[7] = Ti.UI.createPickerRow({title:'福島県',custom_item:'7'});
	areaData[8] = Ti.UI.createPickerRow({title:'茨城県',custom_item:'8'});
	areaData[9] = Ti.UI.createPickerRow({title:'栃木県',custom_item:'9'});
	areaData[10] = Ti.UI.createPickerRow({title:'群馬県',custom_item:'10'});
	areaData[11] = Ti.UI.createPickerRow({title:'埼玉県',custom_item:'11'});
	
	var purposeData = [];
	purposeData[0] = Ti.UI.createPickerRow({title:'すべて',custom_item:''});
	purposeData[1] = Ti.UI.createPickerRow({title:'メル友探し',custom_item:'1'});
	purposeData[2] = Ti.UI.createPickerRow({title:'友達・遊び相手探し',custom_item:'2'});
	purposeData[3] = Ti.UI.createPickerRow({title:'恋人探し',custom_item:'3'});
	purposeData[4] = Ti.UI.createPickerRow({title:'結婚相手探し',custom_item:'4'});
	

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
    			var agePView = require('pickerView');
				var agePickerView = new agePView(ageData, ageTextField);
				pickerSlideIn(self, agePickerView);
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
    			var areaPView = require('pickerView');
				var areaPickerView = new areaPView(areaData, areaTextField);
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
    			var purposePView = require('pickerView');
				var purposePickerView = new purposePView(purposeData, purposeTextField);
				pickerSlideIn(self, purposePickerView);
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
		height: 40
	});
	
	searchButton.addEventListener('click', function(){
		var stWindow = require('searchTableWindow');
		var searchTableWindow = new stWindow();
		
		var url = Ti.App.domain + "get_search_users.json?age=" + 
				  ageTextField.customItem +
				  "&area=" +
				  areaTextField.customItem +
				  "&purpose=" +
				  purposeTextField.customItem;
		
		var commonMethods = require('commonMethods');
		var methodGetData = commonMethods.getData;
		//methodGetData("searchWindow", url, searchTableWindow);
		methodGetData(url, function( data ){
			if (data.success) {
				// 通信に成功したら行う処理
				var json = data.data;
				for (var i=0; i<json.length; i++){
					Ti.API.info("JSON:" + json[i].id);
					searchTableWindow.children[0].data[0].rows[i].children[0].text = json[i].nickname + "（" + commonMethods.exchangeAgeFromNumber( json[i].age ) + "）";
					searchTableWindow.children[0].data[0].rows[i].children[1].image = json[i].profile_image1;
					searchTableWindow.children[0].data[0].rows[i].children[2].text = json[i].profile;
					searchTableWindow.children[0].data[0].rows[i].children[3].text = commonMethods.exchangeAreaFromNumber( json[i].area ) + " | " + commonMethods.exchangePurposeFromNumber( json[i].purpose ) + " | " + json[i].last_logined;
					searchTableWindow.children[0].data[0].rows[i].id = json[i].id;
				}
			} else{
				// 通信に失敗したら行う処理
			}
		});
		
		tabGroup.activeTab.open(searchTableWindow);
		
		Ti.API.info("URL:" + url);
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

//=========================================
//ファンクションの定義
//=========================================
function pickerSlideIn(win, view) {
	var view = view;
	var win = win;
	win.add(view);
	
	view.animate({
		bottom: 0,
		duration: 300
	});	
}
	


