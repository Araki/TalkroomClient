function pickerView() {

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

	self.add(toolbar);
	self.add(picker);
	
	return self;

}

module.exports = pickerView;

