function settingDetailProfileWindow() {
	
	var self = Titanium.UI.createWindow({  
    	title:'プロフィール編集',
    	backgroundColor:'#fff'
	});
	
	var saveButton = Titanium.UI.createButton({title:'保存'});
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
				user_id: Ti.App.userID,
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
	
	var tableViewRowData = [];
	
	//プロフィール写真Row作成
    var imageRow = Ti.UI.createTableViewRow({
        height:100,
    	selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
   	});
    
	var profileImage1 = Titanium.UI.createImageView({
    	image: 'http://graph.facebook.com/721214203/picture',
    	top: 20,
    	left: 45,
    	width: 50,
    	height: 50
    });
    imageRow.add(profileImage1);
    
    var profileImage2 = Titanium.UI.createImageView({
    	image: 'http://graph.facebook.com/721214203/picture',
    	top: 20,
    	left: 135,
    	width: 50,
    	height: 50
    });
    imageRow.add(profileImage2);

	var profileImage3 = Titanium.UI.createImageView({
    	image: 'http://graph.facebook.com/721214203/picture',
    	top: 20,
    	left: 225,
    	width: 50,
    	height: 50
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
	
	
	
	
	
	
	function setPickerView( row, rowName ){
		row.children[1].enabled = false;
		row.children[1].keyboardToolbar = false;
		row.children[1].addEventListener('click', function(){
			var data = [];
			var commonMethods = require('commonMethods');
			var array = commonMethods.returnArray(rowName);
			
			for (var i=0; i<array.length; i++){
				if(i == 0){
					data[i] = Ti.UI.createPickerRow({title: '',custom_item:''});
				}else{
					data[i] = Ti.UI.createPickerRow({title: array[i],custom_item:i});
				}
			}
			
			switch (Titanium.Platform.osname){
				case 'iphone':
					var pickerView = commonMethods.createPickerView( data, row.children[1] );
					commonMethods.pickerSlideIn( self, pickerView );
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

