function searchTableWindow( url ) {

	var self = createWindow("検索結果");
	var tableView = Titanium.UI.createTableView({});
	var tableViewRowData = [];

	var actInd = createActInd();
	actInd.show();
	
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
		
		//アクティビティインジケーターを表示
		actInd.show();
		
		Ti.API.info("ユーザーIDは" + e.row.id);
		var userID = e.row.id;
		
		var url = Ti.App.domain + "get_detail_profile.json?app_token=" + Ti.App.Properties.getString('app_token') + "&user_id=" + userID;
		Ti.API.info("URL:" + url);
		
		getData(url, function( data ){
			
			if (data.success) {
				// 通信に成功したら行う処理
				var json = data.data;
				
				var upWindow = require('userProfileWindow');
				var userProfileWindow = new upWindow();
				
				userProfileWindow.id = userID;
				userProfileWindow.titleControl.text = json[0].nickname;
				userProfileWindow.children[1].children[0].image = json[0].profile_image1;
				userProfileWindow.children[1].children[1].image = json[0].profile_image2;
				userProfileWindow.children[1].children[2].image = json[0].profile_image3;
				userProfileWindow.children[0].data[0].rows[0].children[0].text = "年代";
				userProfileWindow.children[0].data[0].rows[0].children[1].text = exchangeFromNumber(json[0].age, "age");
				userProfileWindow.children[0].data[0].rows[1].children[0].text = "エリア";
				userProfileWindow.children[0].data[0].rows[1].children[1].text = exchangeFromNumber(json[0].area, "area");
				userProfileWindow.children[0].data[0].rows[2].children[0].text = "目的";
				userProfileWindow.children[0].data[0].rows[2].children[1].text = exchangeFromNumber(json[0].purpose, "purpose");
				userProfileWindow.children[0].data[0].rows[3].children[0].text = "一言";
				userProfileWindow.children[0].data[0].rows[3].children[1].text = json[0].profile;
				userProfileWindow.children[0].data[0].rows[4].children[0].text = "身長";
				userProfileWindow.children[0].data[0].rows[4].children[1].text = exchangeFromNumber(json[0].tall, "tall");
				userProfileWindow.children[0].data[0].rows[5].children[0].text = "血液型";
				userProfileWindow.children[0].data[0].rows[5].children[1].text = exchangeFromNumber(json[0].blood, "blood");
				userProfileWindow.children[0].data[0].rows[6].children[0].text = "体型";
				userProfileWindow.children[0].data[0].rows[6].children[1].text = exchangeFromNumber(json[0].style, "style");
				userProfileWindow.children[0].data[0].rows[7].children[0].text = "休日";
				userProfileWindow.children[0].data[0].rows[7].children[1].text = exchangeFromNumber(json[0].holiday, "holiday");
				userProfileWindow.children[0].data[0].rows[8].children[0].text = "お酒";
				userProfileWindow.children[0].data[0].rows[8].children[1].text = exchangeFromNumber(json[0].alcohol, "alcohol");
				userProfileWindow.children[0].data[0].rows[9].children[0].text = "タバコ";
				userProfileWindow.children[0].data[0].rows[9].children[1].text = exchangeFromNumber(json[0].cigarette, "cigarette"); 
				userProfileWindow.children[0].data[0].rows[10].children[0].text = "給料";
				userProfileWindow.children[0].data[0].rows[10].children[1].text = exchangeFromNumber(json[0].salary, "salary");
				
				//アクティビティインジケーターを非表示
				actInd.hide();
				
				tabGroup.activeTab.open( userProfileWindow );
				
			} else{
				// 通信に失敗したら行う処理
			}
		});
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
    	font:{fontSize:12},
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
    	font:{fontSize:10}, 
    	textAlign:'left',
    	color:'#000',
    	top: 18, 
    	bottom: 20,
    	left: 60, 
    	right: 20,
        text: profile
    });
    
    var infoLabel = Titanium.UI.createLabel({
    	font:{fontSize:9}, 
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