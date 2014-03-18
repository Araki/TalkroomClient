function settingDetailProfileWindow() {
	
	var self = Titanium.UI.createWindow({  
    	title:'プロフィール編集',
    	backgroundColor:'#fff'
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
   	var nameRow = createRow("ニックネーム");
   	tableViewRowData.push(nameRow);   	

   	var ageRow = createRow("年代");
	tableViewRowData.push(ageRow);
	
   	var purposeRow = createRow("目的");
   	tableViewRowData.push(purposeRow);
 	
   	var areaRow = createRow("エリア");
   	tableViewRowData.push(areaRow);
 	
   	var tallRow = createRow("身長");
   	tableViewRowData.push(tallRow);
	
   	var bloodRow = createRow("血液型");
   	tableViewRowData.push(bloodRow);
	
   	var styleRow = createRow("スタイル");
   	tableViewRowData.push(styleRow);
	
   	var holidayRow = createRow("休日");
   	tableViewRowData.push(holidayRow);
		
   	var alcoholRow = createRow("お酒");
   	tableViewRowData.push(alcoholRow);
 	
   	var cigaretteRow = createRow("タバコ");
   	tableViewRowData.push(cigaretteRow);
	
   	var salaryRow = createRow("年収");
   	tableViewRowData.push(salaryRow);
	
	
	//テーブルにRowデータを挿入
	var tableView = Titanium.UI.createTableView({
		data: tableViewRowData
	});
	
	self.add(tableView);
	
	return self;
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
    	width: 180
	});
	row.add(textField);
	
	return row;

}