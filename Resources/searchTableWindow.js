function searchTableWindow( age, area, purpose ) {

	var self = createWindow("検索結果");
	var tableView = Titanium.UI.createTableView({});
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
					json[i].id
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

function createRow(nickName, iconImage, profile, info, userID){
	
	var nickNameLabel = Titanium.UI.createLabel({
    	font:{fontFamily: _font, fontSize:12},
    	textAlign: 'left',
    	color: '#000',
    	top: 3, 
    	left: 60, 
    	right: 20,
        height: "auto",
        text: nickName
    });
    
    var profileImage = Titanium.UI.createImageView({
    	top: 5,
    	left: 5,
    	width: 50,
    	height: 50,
    	image: iconImage
    });
    
    var profileLabel = Titanium.UI.createLabel({
    	font:{fontFamily: _font, fontSize:10}, 
    	textAlign:'left',
    	color:'#000',
    	top: 18, 
    	bottom: 20,
    	left: 60, 
    	right: 20,
        text: profile
    });
    
    var infoLabel = Titanium.UI.createLabel({
    	font:{fontFamily: _font, fontSize:9}, 
    	textAlign:'right',
    	color:'#000',
    	bottom: 3, 
    	right: 5, 
    	left: 60, 
        height: "auto",
        text: info
    }); 
    
    var row = Ti.UI.createTableViewRow({
    	hasChild: true,
        height:60,
        id:userID
    });
	
	row.add(nickNameLabel);
	row.add(profileImage);
	row.add(profileLabel);
	row.add(infoLabel);
	
	return row;
}