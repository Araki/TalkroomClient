/**
 * @author araki-k
 */

var win = Titanium.UI.createWindow({  
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

win.add(textField);

//=======================================================================================
//外部公開ファンクション
//=======================================================================================

exports.searchWindow = function() {
	return win;
};

exports.textField = function() {
	return textField;
};
