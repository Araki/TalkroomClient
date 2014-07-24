function settingDetailProfileWindow() {
	
	var self = createWindow("プロフィール編集");
	var tableView = Titanium.UI.createTableView({});
	var tableViewRowData = [];
	var actInd = createActInd();
	actInd.show();
	
	//==================================================
   	//ユーザーデータの読み込み
   	//==================================================
   	var url = Ti.App.domain + "get_detail_profile.json?user_id=" + Ti.App.Properties.getString('my_id') +"&app_token=" + Ti.App.Properties.getString('app_token');
	getData(url, function( data ){
		if (data.success) {
			// 通信に成功したら行う処理
			var json = data.data;
			
			profileImage1.image = json[0].profile_image1 + "?" + new Date().getTime();
			profileImage1.url = json[0].profile_image1 + "?" + new Date().getTime();
			if(json[0].profile_image2 != null){
				profileImage2.image = json[0].profile_image2 + "?" + new Date().getTime();
				profileImage2.url = json[0].profile_image2 + "?" + new Date().getTime();
			}else{
				profileImage2.image = "images/choice_image.png";
			}
			if(json[0].profile_image3 != null){
				profileImage3.image = json[0].profile_image3 + "?" + new Date().getTime();
				profileImage3.url = json[0].profile_image3 + "?" + new Date().getTime();
			}else{
				profileImage3.image = "images/choice_image.png";
			}
			
			nicknameRow.children[1].value = json[0].nickname;
			ageRow.children[1].value = exchangeFromNumber( json[0].age, "age" );
			ageRow.children[1].customItem = json[0].age;
			purposeRow.children[1].value = exchangeFromNumber( json[0].purpose, "purpose" );
			purposeRow.children[1].customItem = json[0].purpose;
			areaRow.children[1].value = exchangeFromNumber( json[0].area, "area" );
			areaRow.children[1].customItem = json[0].area;
			tallRow.children[1].value = exchangeFromNumber( json[0].tall, "tall" );
			tallRow.children[1].customItem = json[0].tall;
			bloodRow.children[1].value = exchangeFromNumber( json[0].blood, "blood" );
			bloodRow.children[1].customItem = json[0].blood;
			styleRow.children[1].value = exchangeFromNumber( json[0].style, "style" );
			styleRow.children[1].customItem = json[0].style;
			holidayRow.children[1].value = exchangeFromNumber( json[0].holiday, "holiday" );
			holidayRow.children[1].customItem = json[0].holiday;
			alcoholRow.children[1].value = exchangeFromNumber( json[0].alcohol, "alcohol" );
			alcoholRow.children[1].customItem = json[0].alcohol;
			cigaretteRow.children[1].value = exchangeFromNumber( json[0].cigarette, "cigarette" );
			cigaretteRow.children[1].customItem = json[0].cigarette;
			salaryRow.children[1].value = exchangeFromNumber( json[0].salary, "salary" );
			salaryRow.children[1].customItem = json[0].salary;
			
			tableView.data = tableViewRowData;
			
		} else{
			// 通信に失敗したら行う処理
		}
		actInd.hide();
	});
	
	var saveButton = Titanium.UI.createButton({
		title:'保存',
		font:{fontFamily: _font},
		color: "#fff",
		borderColor:"#fff",
		borderRadius:5
	});
	self.rightNavButton = saveButton;
	
	//==================================================
   	//保存ボタンが押されたときの挙動
   	//==================================================
	saveButton.addEventListener('click', function(){
		actInd.show();
		var alertMessage = "";
		if( nicknameRow.children[1].value == ''){
			alertMessage = alertMessage + "ニックネームを入力してください。\n";
		}
		if( ageRow.children[1].customItem == ''){
			alertMessage = alertMessage + "年代を入力してください。\n";
		}
		if( purposeRow.children[1].customItem == ''){
			alertMessage = alertMessage + "目的を入力してください。\n";
		}
		if( areaRow.children[1].customItem == ''){
			alertMessage = alertMessage + "エリアを入力してください。\n";
		}
		
		if( alertMessage != "" ){
			actInd.hide();
			Ti.UI.createAlertDialog({
				title: 'エラー',
			  	message: alertMessage
			}).show();
			return;
		}
		/*
		Ti.UI.createAlertDialog({
			title: 'customItem',
		  	message: "ニックネーム：" + nicknameRow.children[1].value +
		  			 "\n年代：" + ageRow.children[1].customItem +
		  	         "\n目的：" + purposeRow.children[1].customItem +
		  	         "\nエリア：" + areaRow.children[1].customItem +
		  	         "\n身長：" + tallRow.children[1].customItem +
		  	         "\n血液型：" + bloodRow.children[1].customItem +
		  	         "\nスタイル：" + styleRow.children[1].customItem +
		  	         "\n休日：" + holidayRow.children[1].customItem +
		  	         "\nお酒：" + alcoholRow.children[1].customItem +
		  	         "\nタバコ：" + cigaretteRow.children[1].customItem +
		  	         "\n年収：" + salaryRow.children[1].customItem
		}).show();
		*/
		var url = Ti.App.domain + "update_detail_profile.json";
		var message = {
				//user_id: Ti.App.Properties.getString('my_id'),
				app_token: Ti.App.Properties.getString('app_token'),
				nickname: nicknameRow.children[1].value,
			    age: ageRow.children[1].customItem,
			    purpose: purposeRow.children[1].customItem,
			    area: areaRow.children[1].customItem,
			    tall: tallRow.children[1].customItem,
			    blood: bloodRow.children[1].customItem,
			    style: styleRow.children[1].customItem,
			    holiday: holidayRow.children[1].customItem,
			    alcohol: alcoholRow.children[1].customItem,
			    cigarette: cigaretteRow.children[1].customItem,
			    salary: salaryRow.children[1].customItem
		};
		
		sendData( url, message, function( data ){
			
			if (data.success){
				//通信に成功したら行う処理
				Ti.API.info("戻り値:" + data.data);
				Ti.UI.createAlertDialog({
					title: 'プロフィールを更新しました',
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

	//==================================================
   	//画面UIの作成
   	//==================================================
    var imageRow = Ti.UI.createTableViewRow({
        height:140,
    	selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
   	});
  
	var profileLabel1 = Titanium.UI.createLabel({
		text: "メイン写真",
    	font:{fontFamily: _font, fontSize:14}, 
    	textAlign:'center',
    	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
    	color:'#000',
    	top:5,
    	height:20, 
    	left:15, 
        width: 90
    });
    imageRow.add(profileLabel1);
    
	var profileImage1 = Titanium.UI.createImageView({
    	top: 30,
    	left: 15,
    	width: 90,
    	height: 90,
    	borderRadius:10
    });
    
    profileImage1.addEventListener('click', function(e){
    	showOptionDialog("profile_image1");
    });
    imageRow.add(profileImage1);
    
    var profileLabel2 = Titanium.UI.createLabel({
		text: "サブ写真①",
    	font:{fontFamily: _font, fontSize:14}, 
    	textAlign:'center',
    	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
    	color:'#000',
    	top:5,
    	height:20, 
    	left:115, 
        width: 90
    });
    imageRow.add(profileLabel2);
    
    var profileImage2 = Titanium.UI.createImageView({
    	top: 30,
    	left: 115,
    	width: 90,
    	height: 90,
    	borderRadius:10
    });
    profileImage2.addEventListener('click', function(e){
    	showOptionDialog("profile_image2");
    });
    imageRow.add(profileImage2);
    
    var profileLabel3 = Titanium.UI.createLabel({
		text: "サブ写真②",
    	font:{fontFamily: _font, fontSize:14}, 
    	textAlign:'center',
    	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
    	color:'#000',
    	top:5,
    	height:20, 
    	left:215, 
        width: 90
    });
    imageRow.add(profileLabel3);

	var profileImage3 = Titanium.UI.createImageView({
    	top: 30,
    	left: 215,
    	width: 90,
    	height: 90,
    	borderRadius:45
    });
    profileImage3.addEventListener('click', function(e){
    	showOptionDialog("profile_image3");
    });
    imageRow.add(profileImage3);

   	tableViewRowData.push(imageRow);
   	
   	var nicknameRow = createRow("ニックネーム");
   	tableViewRowData.push(nicknameRow);   
   	
   	var ageRow = createRow("年代");
   	setPickerView(ageRow, 'age');
	tableViewRowData.push(ageRow);
	
   	var purposeRow = createRow("目的");
   	setPickerView(purposeRow, 'purpose');
   	tableViewRowData.push(purposeRow);
 	
   	var areaRow = createRow("エリア");
   	setPickerView(areaRow, 'area');
   	tableViewRowData.push(areaRow);
 	
   	var tallRow = createRow("身長");
   	setPickerView(tallRow, 'tall');
   	tableViewRowData.push(tallRow);
	
   	var bloodRow = createRow("血液型");
   	setPickerView(bloodRow, 'blood');
   	tableViewRowData.push(bloodRow);
	
   	var styleRow = createRow("スタイル");
   	setPickerView(styleRow, 'style');
   	tableViewRowData.push(styleRow);
	
   	var holidayRow = createRow("休日");
   	setPickerView(holidayRow, 'holiday');
   	tableViewRowData.push(holidayRow);
		
   	var alcoholRow = createRow("お酒");
   	setPickerView(alcoholRow, 'alcohol');
   	tableViewRowData.push(alcoholRow);
 	
   	var cigaretteRow = createRow("タバコ");
   	setPickerView(cigaretteRow, 'cigarette');
   	tableViewRowData.push(cigaretteRow);
	
   	var salaryRow = createRow("年収");
   	setPickerView(salaryRow, 'salary');
   	tableViewRowData.push(salaryRow);
	
	//==================================================
	//写真がタップされたときのオプションダイアログ
	//==================================================
	function showOptionDialog( whichImage ){	
		if(whichImage == "profile_image1" ){
			var sourceSelect = Titanium.UI.createOptionDialog({
			    options: ['Facebook写真を設定する', 'アルバムから選ぶ', 'カメラで撮影する', 'キャンセル'],
			    cancel:3
			});
			sourceSelect.addEventListener('click',function(e)
			{
			    switch( e.index ) {
			    case 0:
			    	registFBProfileImage(self);
			    	break;
			    case 1:
			        showGallery(self, whichImage);
			        break;
			    case 2:
			        showCamera(self, whichImage);
			        break;
			    }
			});
			sourceSelect.show();
		}else{
			var sourceSelect = Titanium.UI.createOptionDialog({
			    options:['アルバムから選ぶ', 'カメラで撮影する', 'キャンセル'],
			    cancel:2,
			});
			sourceSelect.addEventListener('click',function(e)
			{
			    switch( e.index ) {
			    case 0:
			        showGallery(self, whichImage);
			        break;
			    case 1:
			        showCamera(self, whichImage);
			        break;
			    }
			});
			sourceSelect.show();
		}
	}
	
	//==================================================
	//ピッカービューの表示
	//==================================================
	function setPickerView( row, rowName ){
		row.children[1].enabled = false;
		row.children[1].keyboardToolbar = false;
		row.children[1].addEventListener('click', function(){
			var data = [];
			var array = returnArray(rowName);
			
			for (var i=0; i<array.length; i++){
				if(i == 0){
					data[i] = Ti.UI.createPickerRow({title: '',custom_item:''});
				}else{
					data[i] = Ti.UI.createPickerRow({title: array[i],custom_item:i});
				}
			}
			
			switch (Titanium.Platform.osname){
				case 'iphone':
					var pickerView = createPickerView( data, row.children[1], self );
					pickerSlideIn( self, pickerView );
	    			break;
	    			
	    		case 'android':
	    			break;
			}
			
		});
	}
	
	self.add(tableView);
	self.add(actInd);
	return self;
}

module.exports = settingDetailProfileWindow;

//############################################################
//############################################################
//############################################################
//############################################################
//ファンクション
//############################################################
//############################################################
//############################################################
//############################################################

function createRow( labelText ) {
	
	var row = Ti.UI.createTableViewRow({
        height: 50,
        selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
   	});
   	
   	var label = Titanium.UI.createLabel({
    	font:{fontFamily: _font, fontSize: 13}, 
    	text: labelText,
    	textAlign: 'right',
    	color: 'black',
    	top: 10, 
    	bottom: 10,
    	left: 20, 
    	width: 80
    });
    row.add(label);
    
    var textField = Titanium.UI.createTextField({
		font:{fontSize: 13},
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		color: 'black',
		top: 10, 
    	bottom: 10,
    	right: 20, 
    	width: 180,
	});
	
	row.add(textField);
	
	return row;

}

