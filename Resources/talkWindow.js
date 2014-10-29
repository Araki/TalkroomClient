var actInd = createActInd();

function talkWindow() {
	var self = createWindow("");
	var tableView = Titanium.UI.createTableView({separatorStyle:'NONE',backgroundColor:'#FAFAFA'});
	var statusID = 0;
	
	
	var statusButtonBar = Titanium.UI.iOS.createTabbedBar({
		labels:['新規トーク', 'トーク中', '訪問者'], 
		backgroundColor:"#fff",
		index:0 
	});
	
	statusButtonBar.addEventListener('click', function(e){
		//Ti.API.info("押されたボタンID：" + e.index);
		statusID = e.index;
		
		switch (statusID){
			
			//アタック中ボタンが押されたときの処理
	   		case 0:
				Flurry.logEvent('TalkWindow Push NewTalk');
				loadAttackData( tableView );
		    	break;
		    //トーク中ボタンが押されたときの処理
		  	case 1:
		  		Flurry.logEvent('TalkWindow Push MutualTalk');
				loadTalkData( tableView );
		    	break;
		    //足あとボタンが押されたときの処理
		  	case 2:
		  		Flurry.logEvent('TalkWindow Push FootStamp');
	   			loadFootprintData( tableView );
		    	break;
		}
	});
	
	// Navbarの中央に配置
	self.setTitleControl(statusButtonBar);
	
	//初期表示テーブルの設定
	/*
	var tableView = Titanium.UI.createTableView({
		data: createNewTalkTableView()
	});
	*/
	//loadAttackData(tableView);
	
	tableView.addEventListener('click', function(e) {
	
		if (statusID == 0 || statusID == 1){
			Flurry.logEvent('TalkWindow Go To ChatWindow From New and Mutual');	
			var cWindow = require('chatWindow');
			var chatWindow = new cWindow(e.row.sendfrom, e.row.sendto, true);
			tabGroup.activeTab.open(chatWindow);
			
			if (e.row.unread_messages > 0){
				e.row.unread_messages = 0;
				
				//リストのバッジを削除
				e.row.remove(e.row.children[0]);			
				
				var tabs = tabGroup.tabs;
				var badge = tabs[2].getBadge();
				
				addBadgeToTab(badge - 1);
				Ti.UI.iPhone.appBadge = badge - 1;
			}
		}else{
			Flurry.logEvent('TalkWindow Go To UserProfile From FootStamp');	
			createUserProfileWindow(e.row.id);
			//Ti.API.info("UPWindow" + userProfileWindow);
		}
	});	
	
	loadAttackData( tableView );
	//タブが選択されたときに初期画面を読み込む
	//self.addEventListener('focus', function(e){
	//	loadAttackData( tableView );
 	//});
	
	self.add(tableView);
	self.add(actInd);
	return self;
}

module.exports = talkWindow;

//############################################################
//############################################################
//############################################################
//############################################################
//ファンクション
//############################################################
//############################################################
//############################################################
//############################################################

//===================
//アタック中のデータをテーブルにロードするファンクション
//===================

function loadAttackData( tableView ){
	actInd.show();
	var tableViewRowData = [];
	var url = Ti.App.domain + "get_oneside_rooms.json?app_token=" + Ti.App.Properties.getString('app_token');
	getData(url, function( data ){
		if (data.success) {
			// 通信に成功したら行う処理
			var json = data.data;
			if (json.length == 0){
				var row = Ti.UI.createTableViewRow({
			    	hasChild: false,
			        height:'100%',
			        backgroundColor: _white
			    });
			    
			    var label = Ti.UI.createLabel({
			    	font:{fontFamily: _font, fontSize:13},
			    	textAlign: 'center',
			    	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			    	color: _darkGray,
			        text: "まだトークした人がいません。\nユーザータブからお相手を見つけて\nトークしてみましょう！"
			    });
				row.add(label);
				tableViewRowData.push(row);
			}else{
				for (var i=0; i<json.length; i++){
					var row = createNewTalkTableRow(
						json[i].user_id,
						Ti.App.Properties.getString('my_id'),
						json[i].nickname + "（" + exchangeFromNumber( json[i].age, "age" ) + "）",
						json[i].profile,
						json[i].profile_image,
						json[i].gender,
						json[i].room_updated,
						json[i].room_public,
						json[i].type,
						json[i].unread_messages,
						i
					);
					tableViewRowData.push(row);
				}
			}
		} else{
			// 通信に失敗したら行う処理
			Ti.UI.createAlertDialog({
				title: '通信に失敗しました'
			}).show();
		}
		tableView.data = tableViewRowData;
		actInd.hide();
	});
	
}

function createNewTalkTableRow(sendto, sendfrom, name, profile, profile_image, gender, time, room_public, type, unread_messages, backgroundType) {
	var nameLabel = Titanium.UI.createLabel({
		font:{fontFamily: _font, fontSize:13, fontWeight:"bold"},
		textAlign: 'left',
		verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		color: _vividPink,
		top: 5, 
		left: 85, 
		right: 0,
		height: "auto",
		text: name
	});    
	
	var profileMessage = Titanium.UI.createLabel({
		font:{fontFamily: _font, fontSize:12}, 
		textAlign:'left',
		verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		color: _darkGray,
		top: 25, 
		bottom: 20,
		left: 85, 
		right: 16,
		text: profile
	});
	
	var profileImage = Titanium.UI.createImageView({
		top: 5,
		left: 5,
		width: 70,
		height: 70,
		borderRadius:7,
		borderWidth:2,
		borderColor: _white,
		image: profile_image
	});
	
	if(gender =='male'){
    	nameLabel.color = _darkBlue;
    	profileImage.borderColor = _darkBlue;
    }else if(gender == 'female'){
    	nameLabel.color = _vividPink;
    	profileImage.borderColor = _vividPink;
    }
	    
	var timeLabel = Titanium.UI.createLabel({
		font:{fontFamily: _font, fontSize:10}, 
		textAlign:'right',
		verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		color:_darkGray,
		top:5, 
		right:0,
		text: time
	});
	
	var publicLabel = Titanium.UI.createLabel({
		font:{fontFamily: _font, fontSize:11}, 
		textAlign:'center',
		verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		height: 15,
		width: 50,
		bottom:5, 
		right:0,
		borderRadius: 2
	});
	
	if(room_public == 0){
		publicLabel.text = "非公開";
		publicLabel.backgroundColor = _gray;
		publicLabel.color = _darkGray;
	}else{
		publicLabel.text = "公開中";
		publicLabel.backgroundColor = _vividPink;
		publicLabel.color = _white;
	}
	
	var typeLabel = Titanium.UI.createLabel({
		font:{fontFamily: _font, fontSize:11}, 
		textAlign:'center',
		verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		height: 15,
		width: 50,
		bottom:5, 
		right:55,
		borderRadius: 2
	});
	
	if(type == "sent"){
		typeLabel.text = "送信";
		typeLabel.backgroundColor = _gray;
		typeLabel.color = _darkGray;
	}else{
		typeLabel.text = "受信";
		typeLabel.backgroundColor = _vividPink;
		typeLabel.color = _white;
	}
    
	var row = Ti.UI.createTableViewRow({
		hasChild: true,
		height:80,
		sendto: sendto,
		sendfrom: sendfrom
	});
	
	if(backgroundType%2 == 0){
		row.backgroundColor = _white;
	}else{
		row.backgroundColor = _whiteGray;
	}
	
	if(unread_messages > 0){
		row.unread_messages = unread_messages;
		
		var unreadLabel = Titanium.UI.createLabel({
			font:{fontFamily: _font, fontSize:10},
			textAlign: 'center',
			verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			color: _white,
			center: 0, 
			right: 0,
			height: 16,
			width: 16,
	    	backgroundImage: "images/circle_green.png",
			text: unread_messages
		});
		row.add(unreadLabel);
	}
	row.add(profileImage);
	row.add(profileMessage);
	row.add(timeLabel);
	row.add(nameLabel);
	row.add(publicLabel);
	row.add(typeLabel);
	
	return row;
}




//===================
//トーク中のデータをテーブルにロードするファンクション
//===================

function loadTalkData( tableView ){
	actInd.show();
	var tableViewRowData = [];	
	var url = Ti.App.domain + "get_bothside_rooms.json?app_token=" + Ti.App.Properties.getString('app_token');
	getData(url, function( data ){
		if (data.success) {
			// 通信に成功したら行う処理
			var json = data.data;
			if (json.length == 0){
				var row = Ti.UI.createTableViewRow({
			    	hasChild: false,
			        height:'100%',
			        backgroundColor: _white
			    });
			    
			    var label = Ti.UI.createLabel({
			    	font:{fontFamily: _font, fontSize:13},
			    	textAlign: 'center',
			    	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			    	color: _darkGray,
			        text: "まだ相互にトークしている人がいません。"
			    });
				row.add(label);
				tableViewRowData.push(row);
			}else{
				for (var i=0; i<json.length; i++){
					var row = createTalkTableRow(
						json[i].sendto_id,
						Ti.App.Properties.getString('my_id'),
						json[i].nickname + "（" + exchangeFromNumber( json[i].age, "age" ) + "）",
						json[i].profile_image,
						json[i].profile,
						json[i].gender,
						json[i].room_updated,
						json[i].room_public,
						json[i].unread_messages,
						i
					);
					tableViewRowData.push(row);
				}
			}
		} else{
			// 通信に失敗したら行う処理
			Ti.UI.createAlertDialog({
				title: '通信に失敗しました'
			}).show();
		}
		tableView.data = tableViewRowData;
		actInd.hide();
	});
}
function createTalkTableRow(sendto, sendfrom, name, profile_image, profile, gender, time, room_public, unread_messages, backgroundType) {

	var nameLabel = Titanium.UI.createLabel({
		font:{fontFamily: _font, fontSize:13, fontWeight:"bold"},
    	textAlign: 'left',
    	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
    	color: _vividPink,
    	top: 5, 
    	left: 85, 
    	right: 0,
        height: "auto",
	    text: name
	});    
	
	var profileMessage = Titanium.UI.createLabel({
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
	
	var profileImage = Titanium.UI.createImageView({
	    top: 5,
    	left: 5,
    	width: 70,
    	height: 70,
    	borderRadius:7,
    	borderWidth:2,
    	borderColor: _white,
		image: profile_image
	});
	
	if(gender =='male'){
    	nameLabel.color = _darkBlue;
    	profileImage.borderColor = _darkBlue;
    }else if(gender == 'female'){
    	nameLabel.color = _vividPink;
    	profileImage.borderColor = _vividPink;
    }
	
	var timeLabel = Titanium.UI.createLabel({
	    font:{fontFamily: _font, fontSize:10}, 
		textAlign:'right',
		verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		color:_darkGray,
		top:5, 
		right:0,
	    text: time
	});
	
   var publicLabel = Titanium.UI.createLabel({
		font:{fontFamily: _font, fontSize:11}, 
		textAlign:'center',
		verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		height: 15,
		width: 50,
		bottom:5, 
		right:0,
		borderRadius: 2
	});
	
	if(room_public == 0){
		publicLabel.text = "非公開";
		publicLabel.backgroundColor = _gray;
		publicLabel.color = _darkGray;
	}else{
		publicLabel.text = "公開中";
		publicLabel.backgroundColor = _vividPink;
		publicLabel.color = _white;
	}
   
	var row = Ti.UI.createTableViewRow({
   		hasChild: true,
        height:80,
        sendto: sendto,
        sendfrom: sendfrom
	});
   
	if(backgroundType%2 == 0){
		row.backgroundColor = _white;
	}else{
		row.backgroundColor = _whiteGray;
	}
	
	if(unread_messages > 0){
		row.unread_messages = unread_messages;
		
		var unreadLabel = Titanium.UI.createLabel({
			font:{fontFamily: _font, fontSize:10},
			textAlign: 'center',
			verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			color: _white,
			center: 0, 
			right: 0,
			height: 16,
			width: 16,
	    	backgroundImage: "images/circle_green.png",
			text: unread_messages
		});
		row.add(unreadLabel);
	}

	row.add(profileImage);
	row.add(profileMessage);
	row.add(timeLabel);
	row.add(nameLabel);
	row.add(publicLabel);
	
	return row;

}


//===================
//足あとのデータをテーブルにロードするファンクション
//===================

function loadFootprintData( tableView ){
	actInd.show();
	var tableViewRowData = [];
	var url = Ti.App.domain + "get_visits.json?app_token=" + Ti.App.Properties.getString('app_token');
	getData(url, function( data ){
		if (data.success) {
			// 通信に成功したら行う処理
			var json = data.data;
			if (json.length == 0){
				var row = Ti.UI.createTableViewRow({
			    	hasChild: false,
			        height:'100%',
			        backgroundColor: _white
			    });
			    
			    var label = Ti.UI.createLabel({
			    	font:{fontFamily: _font, fontSize:13},
			    	textAlign: 'center',
			    	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			    	color: _darkGray,
			        text: "まだあなたのプロフィールページ\nに訪問した人はいません。"
			    });
				row.add(label);
				tableViewRowData.push(row);
			}else{
				for (var i=0; i<json.length; i++){
					var row = createFootprintTableRow(
						json[i].id,
						json[i].nickname + "（" + exchangeFromNumber( json[i].age, "age" ) + "）",
						json[i].profile_image1,
						json[i].profile,
						json[i].gender,
						json[i].area,
						json[i].purpose,
						json[i].updated_at,
						i
					);
					tableViewRowData.push(row);
				}
			}
		} else{
			// 通信に失敗したら行う処理
			Ti.UI.createAlertDialog({
				title: '通信に失敗しました'
			}).show();
		}
		tableView.data = tableViewRowData;
		actInd.hide();
	});
}
function createFootprintTableRow(id, name, profile_image, profile, gender, area, purpose, time, backgroundType) {

	var nickNameLabel = Titanium.UI.createLabel({
    	font:{fontFamily: _font, fontSize:13, fontWeight:"bold"},
    	textAlign: 'left',
    	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
    	color: _vividPink,
    	top: 5, 
    	left: 85, 
    	right: 0,
        height: "auto",
        text: name
    });
    
    var profileImage = Titanium.UI.createImageView({
    	top: 5,
    	left: 5,
    	width: 70,
    	height: 70,
    	borderRadius:7,
    	borderWidth:2,
    	borderColor: _white,
    	image: profile_image
    });
    
    if(gender =='male'){
    	nickNameLabel.color = _darkBlue;
    	profileImage.borderColor = _darkBlue;
    }else if(gender == 'female'){
    	nickNameLabel.color = _vividPink;
    	profileImage.borderColor = _vividPink;
    }
    
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
    	font:{fontSize:10}, 
		textAlign:'right',
		color:_darkGray,
		bottom:5, 
		right:0,
        text: exchangeFromNumber( area, "area" ) + 
        	  //" | " + exchangeFromNumber( purpose, "purpose" ) + 
        	  " | " + time
    });
    
    var row = Ti.UI.createTableViewRow({
    	hasChild: true,
        height:80,
        id: id
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

function createUserProfileWindow(user_id){
	var upWindow = require('userProfileWindow');
	var userProfileWindow = new upWindow(user_id, "");
	tabGroup.activeTab.open( userProfileWindow );
}
	
