function settingDetailProfileWindow() {
	
	var self = createWindow("プロフィール編集");
	
	var saveButton = Titanium.UI.createButton({
		title:'保存',
		color: "#fff",
		borderColor:"#fff",
		borderRadius:5
	});
	self.rightNavButton = saveButton;
	
	saveButton.addEventListener('click', function(){
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
			Ti.UI.createAlertDialog({
				title: 'エラー',
			  	message: alertMessage
			}).show();
		}
		
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
	
	var tableViewRowData = [];
	
	//プロフィール写真Row作成
    var imageRow = Ti.UI.createTableViewRow({
        height:140,
    	selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
   	});
  
	var profileLabel1 = Titanium.UI.createLabel({
		text: "メイン写真",
    	font:{fontSize:14}, 
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
    	font:{fontSize:14}, 
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
    	font:{fontSize:14}, 
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
   	
   	
   	//定型Rowを作成
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
	
	
	//テーブルにRowデータを挿入
	var tableView = Titanium.UI.createTableView({
		data: tableViewRowData
	});
	
	self.add(tableView);
	
	return self;
	
	
	
	
	
	
	
	
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
					var pickerView = createPickerView( data, row.children[1] );
					pickerSlideIn( self, pickerView );
	    			break;
	    			
	    		case 'android':
	    			break;
			}
			
		});
	}
}

module.exports = settingDetailProfileWindow;









function createRow( labelText ) {
	
	var row = Ti.UI.createTableViewRow({
        height: 50,
        selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
   	});
   	
   	var label = Titanium.UI.createLabel({
    	font:{fontSize: 13}, 
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

