function settingProfileWindow() {
	
	var self = createWindow("一言編集");
	
	var saveButton = Titanium.UI.createButton({title:'保存', borderColor:"#fff", borderRadius:5});
	self.rightNavButton = saveButton;
	
	saveButton.addEventListener('click', function(){
		
		var url = Ti.App.domain + "update_profile.json";
		var message = {
				//user_id: Ti.App.Properties.getString('my_id'),
				app_token: Ti.App.Properties.getString('app_token'),
				profile: textArea.value
		};
		
		var methodSendData = require('commonMethods').sendData;
		methodSendData( url, message, function( data ){
			if (data.success){
				//通信に成功したら行う処理
				Ti.API.info("戻り値:" + data.data);
				
				Ti.UI.createAlertDialog({
					title: 'データ送信成功',
				  	message: data.data
				}).show();
				
			} else{
				//通信に失敗したら行う処理
				Ti.UI.createAlertDialog({
					title: 'エラー',
				  	message: data.data
				}).show();
				
			}
		});		
	});
		
	
	var textArea = Titanium.UI.createTextArea({
	        value:'',
	        top:30,
	        bottom:250,
	        left:20,
	        right:20,
	        font:{fontSize:13,fontFamily:'', fontWeight:''},
	        color:'',
	        textAlign:'left',
	        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
	        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	        returnKeyType:Titanium.UI.RETURNKEY_DONE,
	        borderWidth:2,
	        borderColor:'#bbb',
	        borderRadius:5
	});
	
	self.add(textArea);
	
	return self;
}

module.exports = settingProfileWindow;