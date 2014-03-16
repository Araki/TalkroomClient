function settingProfileWindow() {
	
	var self = Titanium.UI.createWindow({  
    	title:'一言編集',
    	backgroundColor:'#fff'
	});
	
	var saveButton = Titanium.UI.createButton({title:'保存'});
	self.rightNavButton = saveButton;
	
	
	saveButton.addEventListener('click', function(){
					
		var xhr = Titanium.Network.createHTTPClient();
		xhr.timeout = 10000;
			
		url = Ti.App.domain + "update_profile.json";
		xhr.open('POST', url);
			
		xhr.onload = function(){
			Ti.API.info("返って来たデータ:" + this.responseText);
			var profile = this.responseText;
				
			Ti.UI.createAlertDialog({
				title: 'データ送信成功',
			  	message: profile
			}).show();
		  		
			//textArea.value = profile;
		};
		
		var message = {
				user_id: Ti.App.userID,
				profile: textArea.value
			};
		
		xhr.send(message);
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