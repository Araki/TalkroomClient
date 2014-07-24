function searchTableWindow( age, area, purpose ) {

	var self = createWindow("検索結果");
	var tableView = Titanium.UI.createTableView({separatorStyle:'NONE'});
	var tableViewRowData = [];
	var actInd = createActInd();
	actInd.show();
	
	var url = Ti.App.domain + "get_search_users.json?age=" + 
				  age +
				  "&area=" +
				  area +
				  "&purpose=" +
				  purpose  +
				  "&app_token=" +
				  Ti.App.Properties.getString('app_token');
				  
	getData(url, function( data ){
		
		if (data.success) {
			// 通信に成功したら行う処理
			var json = data.data;
			
			for (var i=0; i<json.length; i++){
				row = createRow(
					json[i].nickname + "（" + exchangeFromNumber( json[i].age, "age" ) + "）", 
					json[i].profile_image1, 
					json[i].profile, 
					exchangeFromNumber( json[i].area, "area" ) + " | " + exchangeFromNumber( json[i].purpose, "purpose" ) + " | " + json[i].last_logined, 
					json[i].id,
					i
				);
			   tableViewRowData.push(row);
			}	
		} else{
			// 通信に失敗したら行う処理
		}
		tableView.data = tableViewRowData;
		
		//アクティビティインジケーターを非表示
		actInd.hide();	
	});
	
	
	tableView.addEventListener('click', function(e) {
		
		var userID = e.row.id;
		var upWindow = require('userProfileWindow');
		var userProfileWindow = new upWindow(userID);
		tabGroup.activeTab.open( userProfileWindow );
		
	});	

	self.add(tableView);
	self.add(actInd);
	return self;
}

module.exports = searchTableWindow;

//############################################################
//############################################################
//############################################################
//############################################################
//ファンクション
//############################################################
//############################################################
//############################################################
//############################################################

function createRow(nickName, iconImage, profile, info, userID, backgroundType){
	
	var nickNameLabel = Titanium.UI.createLabel({
    	font:{fontFamily: _font, fontSize:13, fontWeight:"bold"},
    	textAlign: 'left',
    	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
    	color: _vividPink,
    	top: 5, 
    	left: 85, 
    	right: 0,
        height: "auto",
        text: nickName
    });
    
    var profileImage = Titanium.UI.createImageView({
    	top: 5,
    	left: 5,
    	width: 70,
    	height: 70,
    	borderRadius:7,
    	//borderColor:_darkBlue,
    	//borderWidth:1,
    	image: iconImage
    });
    
    var profileLabel = Titanium.UI.createLabel({
    	font:{fontFamily: _font, fontSize:12}, 
    	textAlign:'left',
    	verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
    	color: _darkGray,
    	top: 25, 
    	bottom: 20,
    	left: 85, 
    	right: 0,
        text: profile
    });
    
    var infoLabel = Titanium.UI.createLabel({
    	font:{fontFamily: _font, fontSize:10}, 
    	textAlign:'right',
    	verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
    	color:_darkGray,
    	bottom: 5, 
    	right: 0, 
    	left: 85, 
        height: "auto",
        text: info
    }); 
    
    var row = Ti.UI.createTableViewRow({
    	hasChild: true,
        height:80,
        id:userID
    });
    
    if(backgroundType%2 == 0){
   		row.backgroundColor = _white;
   	}else{
   		row.backgroundColor = _whiteGray;
   	}
	
	row.add(nickNameLabel);
	row.add(profileImage);
	row.add(profileLabel);
	row.add(infoLabel);
	
	return row;
}