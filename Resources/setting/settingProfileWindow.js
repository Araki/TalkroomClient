function settingProfileWindow() {
	
	var self = createWindow("一言編集");
	var actInd = createActInd();
	actInd.show();
	
	var url = Ti.App.domain + "get_detail_profile.json?user_id=" + Ti.App.Properties.getString('my_id') +"&app_token=" + Ti.App.Properties.getString('app_token');
	getData(url, function( data ){		
		if (data.success) {
			// 通信に成功したら行う処理
			var json = data.data;
			textArea.value = json[0].profile;
		} else{
			// 通信に失敗したら行う処理
		}
		actInd.hide();
	});
	
	var saveButton = Titanium.UI.createLabel({
			font:{fontFamily: _font, fontSize:16},
			text:'保存',
			textAlign: 'center',
			verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			borderRadius: 4,
			height: 25,
			width: 60,
			backgroundColor: _mossGreen,
			color: _white
	});
	self.rightNavButton = saveButton;
	
	saveButton.addEventListener('click', function(){
		actInd.show();
		var url = Ti.App.domain + "update_profile.json";
		var message = {
				//user_id: Ti.App.Properties.getString('my_id'),
				app_token: Ti.App.Properties.getString('app_token'),
				profile: textArea.value
		};
		
		sendData( url, message, function( data ){
			if (data.success){
				//通信に成功したら行う処理
				Ti.API.info("戻り値:" + data.data);
				
				Ti.UI.createAlertDialog({
					title: '一言を更新しました',
				  	//message: data.data
				}).show();
				
				
				
			} else{
				//通信に失敗したら行う処理
				Ti.UI.createAlertDialog({
					title: 'エラー',
				  	message: data.data
				}).show();
				
			}
			actInd.hide();
		});		
	});
		
	
	var textArea = Titanium.UI.createTextArea({
	        value:'',
	        top:50,
	        bottom:250,
	        left:20,
	        right:20,
	        font:{fontSize:13,fontFamily:_font, fontWeight:''},
	        color: _darkGray,
	        backgroundColor:_white,
	        textAlign:'left',
	        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
	        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	        returnKeyType:Titanium.UI.RETURNKEY_DONE,
	        borderWidth:2,
	        borderColor:_darkBlue,
	        borderRadius:10
	});
	
	self.addEventListener("open", function(){
		textArea.focus();
	});
	
	self.add(textArea);
	self.add(actInd);
	return self;
}

module.exports = settingProfileWindow;