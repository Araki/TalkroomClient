function searchWindow() {
	
	var agePickerCustomItem = "";
	var areaPickerCustomItem = "";
	var purposePickerCustomItem = "";
	

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
		top: 30,
		right: 40,
		left: 85,
		height: 30,
		enabled: false,
		keyboardToolbar: false
	});
	
	//ageピッカービューのインスタンス生成
	var agePView = require('pickerView');
	var agePickerView = new agePView();
	
	var ageChildren = agePickerView.getChildren();
	var ageToolbar = ageChildren[0];
	var agePicker = ageChildren[1];
	
	var ageItems = ageToolbar.getItems();
	var ageDoneButton = ageItems[1];
	
	//ピッカーにageデータを挿入
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

	agePicker.add(ageData);

	//Pickerの選択が変わった時の挙動
	agePicker.addEventListener('change', function(e){
		ageTextField.value = e.row.title;
		agePickerCustomItem = e.row.custom_item;
		//Ti.API.info("agePickerCustomItem:" + agePickerCustomItem);
	});
	//Pickerのツールバーの完了ボタンが押された時の挙動
	ageDoneButton.addEventListener('click', function(e){
		pickerSlideOut(self, agePickerView);
	});
	//テキストフィールドがタップされたときの挙動
	ageTextField.addEventListener('click', function(){		
		pickerSlideIn(self, agePickerView);
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
		top: 90,
		right: 40,
		left: 85,
		height: 30,
		enabled: false,
		keyboardToolbar: false
	});
	
	//areaピッカービューのインスタンス生成
	var areaPView = require('pickerView');
	var areaPickerView = new areaPView();
	
	var areaChildren = areaPickerView.getChildren();
	var areaToolbar = areaChildren[0];
	var areaPicker = areaChildren[1];
	
	var areaItems = areaToolbar.getItems();
	var areaDoneButton = areaItems[1];

	//ピッカーにageデータを挿入
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
	
	areaPicker.add(areaData);
	
	//Pickerの選択が変わった時の挙動
	areaPicker.addEventListener('change', function(e){
		areaTextField.value = e.row.title;
		areaPickerCustomItem = e.row.custom_item;
		//Ti.API.info("areaPickerCustomItem:" + areaPickerCustomItem);
	});
	//Pickerのツールバーの完了ボタンが押された時の挙動
	areaDoneButton.addEventListener('click', function(e){
		pickerSlideOut(self, areaPickerView);
	});
	//テキストフィールドがタップされたときの挙動
	areaTextField.addEventListener('click', function(){		
		pickerSlideIn(self, areaPickerView);
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
		top: 150,
		right: 40,
		left: 85,
		enabled: false,
		height: 30,
		keyboardToolbar: false
	});
	
	//purposeピッカービューのインスタンス生成
	var purposePView = require('pickerView');
	var purposePickerView = new purposePView();
	
	var purposeChildren = purposePickerView.getChildren();
	var purposeToolbar = purposeChildren[0];
	var purposePicker = purposeChildren[1];
	
	var purposeItems = purposeToolbar.getItems();
	var purposeDoneButton = purposeItems[1];

	//ピッカーにageデータを挿入
	var purposeData = [];
	purposeData[0] = Ti.UI.createPickerRow({title:'すべて',custom_item:''});
	purposeData[1] = Ti.UI.createPickerRow({title:'メル友探し',custom_item:'1'});
	purposeData[2] = Ti.UI.createPickerRow({title:'友達・遊び相手探し',custom_item:'2'});
	purposeData[3] = Ti.UI.createPickerRow({title:'恋人探し',custom_item:'3'});
	purposeData[4] = Ti.UI.createPickerRow({title:'結婚相手探し',custom_item:'4'});

	purposePicker.add(purposeData);
	
	//Pickerの選択が変わった時の挙動
	purposePicker.addEventListener('change', function(e){
		purposeTextField.value = e.row.title;
		purposePickerCustomItem = e.row.custom_item;
		//Ti.API.info("purposePickerCustomItem:" + purposePickerCustomItem);
	});
	//Pickerのツールバーの完了ボタンが押された時の挙動
	purposeDoneButton.addEventListener('click', function(e){
		pickerSlideOut(self, purposePickerView);
	});
	//テキストフィールドがタップされたときの挙動
	purposeTextField.addEventListener('click', function(){		
		pickerSlideIn(self, purposePickerView);
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
		
		var url = "http://localhost:3000/get_search_users.json?age=" + 
					agePickerCustomItem +
					"&area=" +
					areaPickerCustomItem +
					"&purpose=" +
					purposePickerCustomItem;
		
		var methodGetData = require('commonMethods').getData;
		methodGetData("searchWindow", url, searchTableWindow);
		
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
	
function pickerSlideOut(win, view){
	var view = view;
	var win = win;
	
	view.animate({
		bottom: -251,
		duration: 300
	}, function(){
		win.remove(view);
	});
}

