function pickerView(data, tf) {
	
	var dataList = data;
	var textField = tf;
	//var customItem = selectItem;

	var self = Titanium.UI.createView({
		height: 251,
		bottom: -251
	});
	
	var doneButton = Titanium.UI.createButton({
		title: '完了',
		style: Titanium.UI.iPhone.SystemButtonStyle.DONE
	});

	var spacer = Titanium.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var toolbar = Titanium.UI.iOS.createToolbar({
		top: 0,
		items: [spacer, doneButton]
	});

	var picker = Ti.UI.createPicker({
		top: 43
	});
	picker.selectionIndicator = true;
	
	picker.add(dataList);
	
	//Pickerのツールバーの完了ボタンが押された時の挙動
	doneButton.addEventListener('click', function(e){
		pickerSlideOut(Ti.UI.currentWindow, self);
	});
	
	//Pickerの選択が変わった時の挙動
	picker.addEventListener('change', function(e){
		textField.value = e.row.title;
		textField.customItem = e.row.custom_item;
		//Ti.API.info("CUSTOM ITEM:" + customItem);
		//Ti.API.info("agePickerCustomItem:" + agePickerCustomItem);
	});

	self.add(toolbar);
	self.add(picker);
	
	return self;

}

module.exports = pickerView;

function pickerSlideOut(win, view){
	var view = view;
	var win = win;
	
	view.animate({
		bottom: -251,
		duration: 300
	}, function(){
		//win.remove(view);
	});
}