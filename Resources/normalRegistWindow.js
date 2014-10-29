function normalRegistWindow(){	
	
	//年齢番号とエリア番号と目的番号の取得
	var ageData = [];
	var areaData = [];
	//var purposeData = [];
	
	var iWindow = require('introductionWindow');
	var introductionWindow = new iWindow();
	var actInd = createActInd();
	
	var ageArray = returnArray("age");
	for (var i=0; i<ageArray.length; i++){
		if(i == 0){
			ageData[i] = Ti.UI.createPickerRow({title:'',custom_item:''});
		}else{
			ageData[i] = Ti.UI.createPickerRow({title:ageArray[i],custom_item:i});
		}
	}
	
	var areaArray = returnArray("area");
	for (var i=0; i<areaArray.length; i++){
		if(i == 0){
			areaData[i] = Ti.UI.createPickerRow({title:'',custom_item:''});
		}else{
			areaData[i] = Ti.UI.createPickerRow({title:areaArray[i],custom_item:i});
		}
	}
	/*
	var purposeArray = returnArray("purpose");
	for (var i=0; i<purposeArray.length; i++){
		if(i == 0){
			purposeData[i] = Ti.UI.createPickerRow({title:'',custom_item:''});
		}else{
			purposeData[i] = Ti.UI.createPickerRow({title:purposeArray[i],custom_item:i});
		}
	}
	*/
	
	var self = Ti.UI.createWindow({backgroundColor: 'white'});
	
	var scrollView = Titanium.UI.createScrollView({
		contentWidth: "auto",
		contentHeight: "auto",
		top: 0,
		backgroundColor: _whiteBlue,
		showVerticalScrollIndicator: true
	});
	self.add(scrollView);//0
	
	var view = Titanium.UI.createView({
		height: 700,
		backgroundColor: _whiteBlue
	});
	scrollView.add(view);//0-0
	
	//プロフィール写真
	var imageLabel =  Titanium.UI.createLabel({
		text: 'プロフィール画像',
		top: 40,
		left: 40,
		right: 40,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 15 }
	});
	view.add(imageLabel);//0-0-0
	
	var profileImage = Titanium.UI.createImageView({
		top: 70,
		left: 40,
		width: 100,
		height: 100,
		backgroundColor: _white,
		image: '/images/no_image_camera.png',
		borderRadius:9,
	});
	view.add(profileImage);
	
	
	//ニックネーム
	var nicknameLabel = Titanium.UI.createLabel({
		text: 'ニックネーム',
		top: 40 + 145,
		left: 40,
		right: 40,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 15 }
	});
	view.add(nicknameLabel);//0-0-0
	
	var nicknameTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	    returnKeyType:Titanium.UI.RETURNKEY_DONE,
		top: 65 + 145,
		right: 40,
		left: 40,
		height: 30,
		borderRadius: 10,
		borderColor: _darkBlue,
		color: _darkBlue,
		backgroundColor: _white,
		font:{fontFamily: _font, fontSize: 15 },
		keyboardToolbar: false
	});
	view.add(nicknameTextField);//0-0-1
	var blackView = Titanium.UI.createView({
		height:'100%',
		width:'100%',
		backgroundColor:'black',
		opacity: 0.3,
	});
	nicknameTextField.addEventListener('focus', function(){
		self.add(blackView);
	});
	nicknameTextField.addEventListener('return', function(){
		self.remove(blackView);
	});
	//性別
	var genderLabel = Titanium.UI.createLabel({
		text: '性別',
		top: 110 + 145,
		left: 40,
		right: 40,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 15 }
	});
	view.add(genderLabel);//0-0-2

	var genderButtonBar = Titanium.UI.iOS.createTabbedBar({
		labels:['男性', '女性'], 
		backgroundColor:_darkBlue,
	    color: _darkBlue,
		top:135 + 145,
	    right: 40,
		left: 40,
		height: 30,
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		font:{fontFamily: _font, fontSize: 15 }
	});
	view.add(genderButtonBar);
	
	//年齢
	var ageLabel = Titanium.UI.createLabel({
		text: '年齢',
		top: 110 + 215,
		left: 40,
		right: 40,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 15 }
	});
	view.add(ageLabel);//0-0-2
	
	var ageTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 135 + 215,
		right: 40,
		left: 40,
		height: 30,
		borderRadius: 10,
		borderColor: _darkBlue,
		color: _darkBlue,
		backgroundColor: _white,
		font:{fontFamily: _font, fontSize: 15 },
		enabled: false,
		keyboardToolbar: false
	});
	view.add(ageTextField);//0-0-3
	
	//テキストフィールドがタップされたときの挙動
	ageTextField.addEventListener('click', function(){
		switch (Titanium.Platform.osname){
			case 'iphone':
				var agePickerView = createPickerView( ageData, ageTextField, self );
				pickerSlideIn(self, agePickerView);
    			break;
    			
    		case 'android':
    			break;
		}
	});
	
	//居住地
	var areaLabel = Titanium.UI.createLabel({
		text: '居住地',
		top: 180 + 215,
		left: 40,
		right: 40,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 15 }
	});
	view.add(areaLabel);//0-0-4
	
	var areaTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 205 + 215,
		right: 40,
		left: 40,
		height: 30,
		borderRadius: 10,
		borderColor: _darkBlue,
		color: _darkBlue,
		backgroundColor: _white,
		font:{fontFamily: _font, fontSize: 15 },
		enabled: false,
		keyboardToolbar: false
	});
	view.add(areaTextField);//0-0-5
	
	//テキストフィールドがタップされたときの挙動
	areaTextField.addEventListener('click', function(){
		switch (Titanium.Platform.osname){
			case 'iphone':
				var areaPickerView = createPickerView( areaData, areaTextField, self );
				pickerSlideIn(self, areaPickerView);
    			break;
    			
    		case 'android':
    			break;
		}
	});
	
	//自己紹介
	var profileLabel = Titanium.UI.createLabel({
		text: '一言',
		top: 245 + 215,
		left: 40,
		right: 40,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 15 }
	});
	view.add(profileLabel);//0-0-6
	
	var profileTextField = Titanium.UI.createTextArea({
        value:'',
        top:270 + 215,
        height:90,
        left:40,
        right:40,
        textAlign:'left',
        borderRadius: 10,
		borderColor: _darkBlue,
		color: _darkBlue,
		backgroundColor: _white,
        font:{fontFamily: _font, fontSize: 15 },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType:Titanium.UI.RETURNKEY_DONE,
	});
	view.add(profileTextField);//0-0-7

	
	var submitButton = Ti.UI.createButton({
		title: '決定',
		font:{fontFamily: _font, fontSize: 19},
		top: 390 + 215,
		right: 40,
		left: 40,
		height: 50,
		//borderColor:"#1E90FF",
		color: _white,
		backgroundColor: _mossGreen,
		borderRadius:10
	});
	view.add( submitButton );//0-0-8
	/*
	var cancelButton = Ti.UI.createButton({
		title: 'キャンセル',
		font:{fontFamily: _font, fontSize: 19},
		top: 460 + 215,
		right: 40,
		left: 40,
		height: 40,
		color: _white,
		backgroundColor: _gray,
		borderRadius:10
	});
	view.add( cancelButton );//0-0-8
	*/
	submitButton.addEventListener('click', function() {
		/*
		Ti.UI.createAlertDialog({
		  	message: "UUID: " + iOSUniqueID.getUUID +
		  			 "\nIDFV" + iOSUniqueID.getIdentifierForVendor +
					 "\nIDFA" + iOSUniqueID.getAdvertisingIdentifier +
		  			 "\nchannel: " + "normal" +
		  			 "\nfb_uid: " + "" +
		  			 "\nemail: " + "" +
		  			 "\nprofileImage: " + profileImage.image + 
		  			 "\nnickname: " + nicknameTextField.value +
		  			 "\ngender: " + gender +
		  			 "\nage: " + ageTextField.customItem +
		  			 "\narea: " + areaTextField.customItem +
		  			 "\nprofile: " + profileTextField.value +
		  			 "\naccess_token: " + Ti.Utils.md5HexDigest(Ti.Utils.md5HexDigest(iOSUniqueID.getUUID))
		}).show();
		*/
		var errorMessage = "";
		if ( profileImage.image == "/images/no_image_camera.png"){
			errorMessage = errorMessage + "プロフィール画像を登録してください。\n";
		}
		if ( nicknameTextField.value == "" ){
			errorMessage = errorMessage + "ニックネームを入力してください。\n";
		}
		if ( genderButtonBar.index == null ){
			errorMessage = errorMessage + "性別を選択してください。\n";
		}
		if ( ageTextField.customItem == null ){
			errorMessage = errorMessage + "年齢を入力してください。\n";
		}
		if ( areaTextField.customItem == null ){
			errorMessage = errorMessage + "居住地を入力してください。\n";
		}
		/*
		if ( purposeTextField.customItem == "" ){
			errorMessage = errorMessage + "目的を入力してください。\n";
		}
		*/
		
		if ( errorMessage != "" ){
			//alert(errorMessage);
			Ti.UI.createAlertDialog({
				title: 'エラー',
			  	message: errorMessage
			}).show();
		}else{
			Flurry.logEvent('SignUp Try');
			var gender;
			if ( genderButtonBar.index == 0 ){
				gender = "male";
			}else if ( genderButtonBar.index = 1){
				gender = "female";
			}
			
			actInd.show();
			var url = Ti.App.domain + "create_account.json";
			var message = {
				uuid: iOSUniqueID.getUUID,
				idfv: iOSUniqueID.getIdentifierForVendor,
				idfa: iOSUniqueID.getAdvertisingIdentifier,
				channel: "normal",
				fb_uid: "",
				nickname: nicknameTextField.value,
				gender: gender,
				email: "",
				age: ageTextField.customItem,
				area: areaTextField.customItem,
				profile_image1: profileImage.image,
				profile: profileTextField.value,
      			access_token: Ti.Utils.md5HexDigest(Ti.Utils.md5HexDigest(iOSUniqueID.getUUID))
			};
			
			sendData( url, message, function( data ){
				if (data.success){
					Flurry.logEvent('Registration Window SignUp Finish');
					//通信に成功したら行う処理
					//Ti.API.info("戻り値:" + data.data);
					
					Ti.UI.createAlertDialog({
						title: '登録完了',
					  	//message: data.data
					}).show();
					
          
			        // app_token を保存する
			        var obj = JSON.parse(data.data);
			        Ti.App.Properties.setString('app_token', obj.app_token);
			        Ti.App.Properties.setString('my_id', obj.id);
			        Ti.App.Properties.setString('channel', obj.channel);
          
					//イントロダクションウィンドウを開く
					//introductionWindow.open();
					createTabGroup();
					facebookWindow.close();
					
					//登録に成功したらウィンドウを閉じる
					actInd.hide();
					self.close();
					
					
				} else{
					//通信に失敗したら行う処理
					Flurry.logEvent('SignUp Failure');
					Ti.UI.createAlertDialog({
						title: '登録に失敗しました',
					  	//message: data.data
					}).show();
					actInd.hide();
				}
			});
		}
	});
	
	profileImage.addEventListener('click', function() {
		showOptionDialog();
	});
	
	function showOptionDialog(){	
		var sourceSelect = Titanium.UI.createOptionDialog({
		    options:['アルバムから選ぶ', 'カメラで撮影する', 'キャンセル'],
		    cancel:2,
		});
		sourceSelect.addEventListener('click',function(e)
		{
		    switch( e.index ) {
		    case 0:
		        showGalleryView();
		        break;
		    case 1:
		        showCameraView();
		        break;
		    }
		});
		sourceSelect.show();
	}
	
	function showCameraView(){
		var currentWindow = self;
		Titanium.Media.showCamera({
			success:function(event)
			{
				var cropRect = event.cropRect;
				var image = event.media;
				if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
				{
					profileImage.image = image.imageAsThumbnail(200);
				}
				else
				{
					alert("got the wrong type back ="+event.mediaType);
				}
			},
			cancel:function()
			{
			},
			error:function(error)
			{
				// create alert
				var a = Titanium.UI.createAlertDialog({title:'カメラ'});
		
				// set message
				if (error.code == Titanium.Media.NO_CAMERA)
				{
					a.setMessage('Please run this test on device');
				}
				else
				{
					a.setMessage('エラー\n' + error.code);
				}
		
				// show alert
				a.show();
			},
			saveToPhotoGallery:false,
			allowEditing:true,
			mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
		});
	}
	
	function showGalleryView(){
		var currentWindow = self;
		Titanium.Media.openPhotoGallery({
			success: function(event) {
		        // カメラロールで写真を選択した時の挙動(カメラと同様)
		        var cropRect = event.cropRect;
				var image = event.media;
				if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
				{
					profileImage.image = image.imageAsThumbnail(200);
				}
		    },
		    error: function(error) {
		        // notify(e.message);
		    },
		    cancel: function() {
		        // キャンセル時の挙動
		    },
		    // 選択直後に拡大縮小移動をするか否かのフラグ
		    allowEditing: true,
		    // 選択可能なメディア種別を配列で指定
		    mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
		});
	}
	
	self.add(actInd);
	
	return self;
}

module.exports = normalRegistWindow;
