
Ti.API.info("++++++++++++++++++++++");

var picker_view = Titanium.UI.createView({
	height: 251,
	bottom: -251
});

var cancelButton = Titanium.UI.createButton({
	title: 'Cancel',
	style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var doneButton = Titanium.UI.createButton({
	title: 'Done',
	style: Titanium.UI.iPhone.SystemButtonStyle.DONE
});

var spacer = Titanium.UI.createButton({
	systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var toolbar = Titanium.UI.iOS.createToolbar({
	top: 0,
	items: [cancelButton, spacer, doneButton]
});

var picker = Ti.UI.createPicker({
	top: 43
});
picker.selectionIndicator = true;

var data = [];
data[0]=Ti.UI.createPickerRow({title:'18〜19歳',custom_item:'1'});
data[1]=Ti.UI.createPickerRow({title:'20代前半',custom_item:'2'});
data[2]=Ti.UI.createPickerRow({title:'20代半ば',custom_item:'3'});
data[3]=Ti.UI.createPickerRow({title:'20代後半',custom_item:'4'});
data[4]=Ti.UI.createPickerRow({title:'30代前半',custom_item:'5'});
data[5]=Ti.UI.createPickerRow({title:'30代半ば',custom_item:'6'});
data[6]=Ti.UI.createPickerRow({title:'30代後半',custom_item:'7'});
data[7]=Ti.UI.createPickerRow({title:'40代前半',custom_item:'8'});
data[8]=Ti.UI.createPickerRow({title:'40代半ば',custom_item:'9'});
data[9]=Ti.UI.createPickerRow({title:'40代後半',custom_item:'10'});
data[10]=Ti.UI.createPickerRow({title:'50代以上',custom_item:'11'});

picker.add(data);
picker_view.add(toolbar);
picker_view.add(picker);

//=======================================================================================
//外部公開ファンクション
//=======================================================================================

exports.pickerView = function() {
	return picker_view;
};

exports.picker = function() {
	return picker;
};

exports.cancelButton = function() {
	return cancelButton;
};

exports.doneButton = function() {
	return doneButton;
};