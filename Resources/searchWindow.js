function searchWindow() {

	var self = Titanium.UI.createWindow({  
    	title:'探す',
    	backgroundColor:'#fff'
	});
	
	//=========================================
	//age系要素の定義
	//=========================================
	var ageTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 20,
		right: 50,
		left: 50,
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
	ageData[0] = Ti.UI.createPickerRow({title:'18〜19歳',custom_item:'1'});
	ageData[1] = Ti.UI.createPickerRow({title:'20代前半',custom_item:'2'});
	ageData[2] = Ti.UI.createPickerRow({title:'20代半ば',custom_item:'3'});
	ageData[3] = Ti.UI.createPickerRow({title:'20代後半',custom_item:'4'});
	ageData[4] = Ti.UI.createPickerRow({title:'30代前半',custom_item:'5'});
	ageData[5] = Ti.UI.createPickerRow({title:'30代半ば',custom_item:'6'});
	ageData[6] = Ti.UI.createPickerRow({title:'30代後半',custom_item:'7'});
	ageData[7] = Ti.UI.createPickerRow({title:'40代前半',custom_item:'8'});
	ageData[8] = Ti.UI.createPickerRow({title:'40代半ば',custom_item:'9'});
	ageData[9] = Ti.UI.createPickerRow({title:'40代後半',custom_item:'10'});
	ageData[10] = Ti.UI.createPickerRow({title:'50代以上',custom_item:'11'});

	agePicker.add(ageData);

	//ボタンをタップしたときの挙動
	agePicker.addEventListener('change', function(e){
		ageTextField.value = e.row.title;
	});
	
	ageDoneButton.addEventListener('click', function(e){
		pickerSlideOut(self, agePickerView);
	});

	ageTextField.addEventListener('click', function(){		
		pickerSlideIn(self, agePickerView);
	});
	
	//=========================================
	//area系要素の定義
	//=========================================
	var areaTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 80,
		right: 50,
		left: 50,
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
	areaData[0] = Ti.UI.createPickerRow({title:'北海道',custom_item:'1'});
	areaData[1] = Ti.UI.createPickerRow({title:'青森県',custom_item:'2'});
	areaData[2] = Ti.UI.createPickerRow({title:'岩手県',custom_item:'3'});
	areaData[3] = Ti.UI.createPickerRow({title:'宮城県',custom_item:'4'});
	areaData[4] = Ti.UI.createPickerRow({title:'秋田県',custom_item:'5'});
	areaData[5] = Ti.UI.createPickerRow({title:'山形県',custom_item:'6'});
	areaData[6] = Ti.UI.createPickerRow({title:'福島県',custom_item:'7'});
	areaData[7] = Ti.UI.createPickerRow({title:'茨城県',custom_item:'8'});
	areaData[8] = Ti.UI.createPickerRow({title:'栃木県',custom_item:'9'});
	areaData[9] = Ti.UI.createPickerRow({title:'群馬県',custom_item:'10'});
	areaData[10] = Ti.UI.createPickerRow({title:'埼玉県',custom_item:'11'});
	
	areaPicker.add(areaData);
	
	//ボタンをタップしたときの挙動
	areaPicker.addEventListener('change', function(e){
		areaTextField.value = e.row.title;
	});
	
	areaDoneButton.addEventListener('click', function(e){
		pickerSlideOut(self, areaPickerView);
	});

	areaTextField.addEventListener('click', function(){		
		pickerSlideIn(self, areaPickerView);
	});



	self.add(ageTextField);
	self.add(areaTextField);

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

