function facebookWindow() {
	
	var self = Titanium.UI.createWindow({  
	   	title:'フェイスブック',
	   	backgroundColor:'#fff'
	});
	
	var fb = require('facebook');
	fb.appid = '349815825157641';
	fb.permissions = ['publish_stream'];
	fb.forceDialogAuth = true;
	
	fb.addEventListener('login', function(e) {
	    if (e.success) {
	        alert('Logged in');
	        fb.requestWithGraphPath(
			    'me',
			    {},
			     "GET",
			    function(e) {
			         if (e.success) {
			            var obj = JSON.parse(e.result);
			            /*
			            for (key in obj) {
					　  		alert(key + " : " + obj[key]);
					　  	}
						for (key in obj.location){
							alert(key + " : " + obj.location[key]);
						}
						*/
			            Ti.API.info("Facebook:" + obj);
			            alert("fb_name: " + obj.name);
			            alert("FIRST NAME" + obj.first_name);
			            alert("LAST NAME" + obj.last_name);
			            alert("gender: " + obj.gender);
			            alert("UID:" + obj.id);
			            
						var registWindow = require('registrationWindow');
						var registrationWindow = new registWindow();
						registrationWindow.children[1].value = obj.name;
						//registrationWindow.children[3].value = "不明";
						registrationWindow.children[5].value = obj.location["name"];
						registrationWindow.open();
			        }
			    }
			);
	    } else if (e.error) {
	    	alert( e.error );
	    } else if ( e.cancelled ) {
	    	alert( e.cancelled );
	    }
	});
	
	fb.addEventListener('logout', function(e) {
	    alert('Logged out');
	});
	
	// Add the button.  Note that it doesn't need a click event listener.
	self.add(fb.createLoginButton({
	    top : 50,
	    style : fb.BUTTON_STYLE_WIDE
	}));
	
	
	
	
	
	
	var closeButton = Ti.UI.createButton({
		title: 'TabGroupへ',
		bottom: 50,
		right: 20,
		left: 20,
		height: 50,
		borderColor:"#1E90FF",
		borderRadius:5
	});
	self.add( closeButton );
	
	closeButton.addEventListener('click', function() {
		//tabGroupを開く
		createTabGroup();
		//このウィンドウを閉じる
		self.close();
	});

	return self;
}

module.exports = facebookWindow;