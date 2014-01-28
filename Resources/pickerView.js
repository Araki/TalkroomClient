/**
 * @author araki-k
 */

var picker_view = Titanium.UI.createView({
	height: 251,
	bottom: 0
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
data[0]=Ti.UI.createPickerRow({title:'Bananas',custom_item:'Bananas'});
data[1]=Ti.UI.createPickerRow({title:'Strawberries',custom_item:'Strawberries'});
data[2]=Ti.UI.createPickerRow({title:'Mangos',custom_item:'Mangos'});
data[3]=Ti.UI.createPickerRow({title:'Grapes',custom_item:'Grapes'});

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