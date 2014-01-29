function searchWindow() {

	var searchWindow;
	var textField;
	var pickerView;
	var picker;
	var cancelButton;
	var doneButton;
	
	var slideIn = Titanium.UI.createAnimation({
		bottom: 0,
		duration: 300
	});
	
	var slideOut = Titanium.UI.createAnimation({
		bottom: -251,
		duration: 300
	});

	var self = Titanium.UI.createWindow({  
    	title:'探す',
    	backgroundColor:'#fff'
	});
	
	var textField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 20,
		right: 50,
		left: 50,
		enabled: false,
		keyboardToolbar: false
	});
		
	self.add(textField);
	
	var pView = require('pickerView').pickerView;
	pickerView = new pView();
	
	var p = require('pickerView').picker;
	picker = new p();
	
	var cButton = require('pickerView').cancelButton;
	cancelButton = new cButton();
	
	var dButton = require('pickerView').doneButton;
	doneButton = new dButton();

	//ボタンをタップしたときの挙動
	picker.addEventListener('change', function(e){
		textField.value = e.row.title;
	});

	cancelButton.addEventListener('click', function(e){
		textField.value = "";
		pickerSlideOut(self, pickerView);
	});
	
	doneButton.addEventListener('click', function(e){
		pickerSlideOut(self, pickerView);
	});

	//createSearchWindow();

	textField.addEventListener('click', function(){
		Ti.API.info("clicked");
		self.add(pickerView);
		pickerSlideIn(pickerView);
	});
	
	return self;
}

function pickerSlideIn(view) {
	var view = view;
	
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

module.exports = searchWindow;

