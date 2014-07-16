function talkWindow() {
	var self = createWindow("");
	var statusID = 0;
	
	var statusButtonBar = Titanium.UI.createTabbedBar({
		labels:['新規トーク', 'トーク中', '足あと'], 
		backgroundColor:"#fff",
		index:0 
	});
	
	statusButtonBar.addEventListener('click', function(e){
		Ti.API.info("押されたボタンID：" + e.index);
		
		statusID = e.index;
		
		switch (statusID){
			
			//アタック中ボタンが押されたときの処理
	   		case 0:
				loadAttackData( tableView );
		    	break;
		    //トーク中ボタンが押されたときの処理
		  	case 1:
				loadTalkData( tableView );
		    	break;
		    //足あとボタンが押されたときの処理
		  	case 2:
	   			loadFootprintData( tableView );
		    	break;
		}
	});
	
	// Navbarの中央に配置
	self.setTitleControl(statusButtonBar);
	
	//初期表示テーブルの設定
	var tableView = Titanium.UI.createTableView({
		data: createNewTalkTableView()
	});
	
	tableView.addEventListener('click', function(e) {
		Ti.API.info(e.row.id);
		Ti.API.info("クリック");
		if (statusID == 0 || statusID == 1){
			var cWindow = require('chatWindow');
			var chatWindow = new cWindow(e.row.sendfrom, e.row.sendto, true);
			tabGroup.activeTab.open(chatWindow);
		}else{			
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
	return self;
}

module.exports = talkWindow;




//===================
//アタック中のデータをテーブルにロードするファンクション
//===================

function loadAttackData( tableView ){
	//現在表示されているテーブルを初期化
	tableView.data = createNewTalkTableView();
	
	var commonMethods = require('commonMethods');
	
	var url = Ti.App.domain + "get_oneside_rooms.json?app_token=" + Ti.App.Properties.getString('app_token');
	var methodGetData = commonMethods.getData;
	methodGetData(url, function( data ){
		if (data.success) {
			// 通信に成功したら行う処理
			var json = data.data;
			Ti.API.info("アタック中テーブル");
			for (var i=0; i<json.length; i++){
				Ti.API.info("profile_image" + json[i].profile_image);
				tableView.data[0].rows[i].sendto = json[i].user_id;
				tableView.data[0].rows[i].sendfrom = Ti.App.Properties.getString('my_id');
				tableView.data[0].rows[i].children[0].image = json[i].profile_image;
				tableView.data[0].rows[i].children[1].text = json[i].profile;
				tableView.data[0].rows[i].children[2].text = json[i].room_updated;
				tableView.data[0].rows[i].children[3].text = json[i].nickname;
				
				if (json[i].room_public == "0" ){ 
					tableView.data[0].rows[i].children[4].text = "非公開 | " +json[i].type;
				}else if ( json[i].room_public == "1" ){
					tableView.data[0].rows[i].children[4].text = "公開 | " + json[i].type;
				}
			}
		} else{
			// 通信に失敗したら行う処理
		}
	});
}



//===================
//トーク中のデータをテーブルにロードするファンクション
//===================

function loadTalkData( tableView ){
	//現在表示されているテーブルを初期化
	tableView.data = createTalkTableView();
	
	var commonMethods = require('commonMethods');
	
	var url = Ti.App.domain + "get_bothside_rooms.json?app_token=" + Ti.App.Properties.getString('app_token');
	var methodGetData = commonMethods.getData;
	//methodGetData("talkTableView", url, tableView);
	methodGetData(url, function( data ){
		if (data.success) {
			// 通信に成功したら行う処理
			var json = data.data;
			Ti.API.info("トーク中テーブル");
			for (var i=0; i<json.length; i++){
				Ti.API.info("profile_image" + json[i].profile_image);
				tableView.data[0].rows[i].sendto = json[i].sendto_id;
				tableView.data[0].rows[i].sendfrom = Ti.App.Properties.getString('my_id');
				tableView.data[0].rows[i].children[0].image = json[i].profile_image;
				tableView.data[0].rows[i].children[1].text = json[i].profile;
				tableView.data[0].rows[i].children[2].text = json[i].room_updated;
				tableView.data[0].rows[i].children[3].text = json[i].nickname;
				Ti.API.info("PUBLIC: " + json[i].room_public);
				if (json[i].room_public == "0" ){ 
					tableView.data[0].rows[i].children[4].text = "非公開";
				}else if ( json[i].room_public == "1" ){
					tableView.data[0].rows[i].children[4].text = "公開";
				}
			}
		} else{
			// 通信に失敗したら行う処理
		}
	});
}



//===================
//足あとのデータをテーブルにロードするファンクション
//===================

function loadFootprintData( tableView ){
	//現在表示されているテーブルを初期化
	tableView.data = createFootprintTableView();
	
	var commonMethods = require('commonMethods');
	
	var url = Ti.App.domain + "get_visits.json?app_token=" + Ti.App.Properties.getString('app_token');
	var methodGetData = commonMethods.getData;

	methodGetData(url, function( data ){
		if (data.success) {
			// 通信に成功したら行う処理
			var json = data.data;
			Ti.API.info("足あとテーブル");
			for (var i=0; i<json.length; i++){
				tableView.data[0].rows[i].id = json[i].id;
				tableView.data[0].rows[i].children[0].text = json[i].nickname;
				tableView.data[0].rows[i].children[1].image = json[i].profile_image1;
				tableView.data[0].rows[i].children[2].text = json[i].profile;
				tableView.data[0].rows[i].children[3].text = commonMethods.exchangeFromNumber( json[i].area, "area" ) + " | " + commonMethods.exchangeFromNumber( json[i].purpose, "purpose" ) + " | " + json[i].updated_at;
			}
		} else{
			// 通信に失敗したら行う処理
		}
	});
}





//===================
//アタック中のテーブル生成ファンクション
//===================
function createNewTalkTableView() {
	
	var tableViewRowData = [];
	
	for (var i=0; i<10; i++){
    
		var nameLabel = Titanium.UI.createLabel({
        	font:{fontSize:13}, 
        	textAlign:'left',
        	color:'#000',
        	top: 5, 
        	left:60,
	        height:15
	    });    
    
    	var profileMessage = Titanium.UI.createLabel({
        	font:{fontSize:10}, 
        	textAlign:'left',
        	verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        	color:'#000',
        	top: 25, 
        	left:60,
        	right:30, 
	        height:40
	    });

	   var profileImage = Titanium.UI.createImageView({
	    	image: '',
	    	top: 5,
	    	left: 5,
	    	width: 50,
	    	height: 50
	    });
	    
	    var timeLabel = Titanium.UI.createLabel({
	        font:{fontSize:10}, 
	        textAlign:'right',
	        color:'#000',
	        top:5, 
	        right:5
	    });
	    
	    var publicLabel = Titanium.UI.createLabel({
	        font:{fontSize:10}, 
	        textAlign:'right',
	        color:'#000',
	        bottom:5, 
	        right:5
	    });
	    
	   var row = Ti.UI.createTableViewRow({
	   		hasChild: true,
	        height:60,
	        id: ''
	   });
   	
	   row.add(profileImage);
	   row.add(profileMessage);
	   row.add(timeLabel);
	   row.add(nameLabel);
	   row.add(publicLabel);

	   tableViewRowData.push(row);
	}
	
	return tableViewRowData;

}

//===================
//トーク中のテーブル生成ファンクション
//===================
function createTalkTableView() {
	
	var tableViewRowData = [];
	
	for (var i=0; i<10; i++){
    
		var nameLabel = Titanium.UI.createLabel({
        	font:{fontSize:13}, 
        	textAlign:'left',
        	color:'#000',
        	top: 5, 
        	left:60,
	        height:15
	    });    
    
    	var profileMessage = Titanium.UI.createLabel({
        	font:{fontSize:10}, 
        	textAlign:'left',
        	verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        	color:'#000',
        	top: 25, 
        	left:60,
        	right:30, 
	        height:40
	    });

	   var profileImage = Titanium.UI.createImageView({
	    	image: '',
	    	top: 5,
	    	left: 5,
	    	width: 50,
	    	height: 50
	    });
	    
	    var timeLabel = Titanium.UI.createLabel({
	        font:{fontSize:10}, 
	        textAlign:'right',
	        color:'#000',
	        top:5, 
	        right:5
	    });
	    
	    var publicLabel = Titanium.UI.createLabel({
	        font:{fontSize:10}, 
	        textAlign:'right',
	        color:'#000',
	        bottom:5, 
	        right:5
	    });
	    
	   var row = Ti.UI.createTableViewRow({
	   		hasChild: true,
	        height:60,
	        id: ''
	   });
   	
	   row.add(profileImage);
	   row.add(profileMessage);
	   row.add(timeLabel);
	   row.add(nameLabel);
	   row.add(publicLabel);

	   tableViewRowData.push(row);
	}
	
	return tableViewRowData;

}

//===================
//あしあとのテーブル生成ファンクション
//===================
function createFootprintTableView() {
	Ti.API.info("createFootprintTableViewが起動");
	var tableViewRowData = [];
	
	for (var i=0; i<10; i++){
		var nickNameLabel = Titanium.UI.createLabel({
        	font:{fontSize:12}, 
        	textAlign: 'left',
        	color: '#000',
        	top: 3, 
        	left: 60, 
        	right: 20,
	        height: "auto",
	        //backgroundColor: "blue"
	    });
	    
	    var profileImage = Titanium.UI.createImageView({
	    	image: '',//'http://profile.ak.fbcdn.net/hprofile-ak-prn2/276018_721214203_1913647351_q.jpg',
	    	top: 5,
	    	left: 5,
	    	width: 50,
	    	height: 50
	    });
	    
	    var profileLabel = Titanium.UI.createLabel({
        	font:{fontSize:10}, 
        	textAlign:'left',
        	color:'#000',
        	top: 18, 
        	bottom: 20,
        	left: 60, 
        	right: 20,
	        //backgroundColor: "green"
	    });
	    
	    var infoLabel = Titanium.UI.createLabel({
        	font:{fontSize:9}, 
        	textAlign:'right',
        	color:'#000',
        	bottom: 3, 
        	right: 5, 
        	left: 60, 
	        height: "auto",
	        //backgroundColor: "red"
	    });
	    
	    var row = Ti.UI.createTableViewRow({
	    	hasChild: true,
	        height:60,
	    });
	    
	    row.add(nickNameLabel);
	    row.add(profileImage);
	    row.add(profileLabel);
	    row.add(infoLabel);
	    
	    tableViewRowData.push(row);
	}
	
	return tableViewRowData;

}

function createUserProfileWindow(user_id){

	Ti.API.info("ユーザーIDは" + user_id);
	var userID = user_id;
	
	var url = Ti.App.domain + "get_detail_profile.json?app_token=" + Ti.App.Properties.getString('app_token') + "&user_id=" + userID;
	Ti.API.info("URL:" + url);
	
	var commonMethods = require('commonMethods');
	var methodGetData = commonMethods.getData;
	//methodGetData("searchTableWindow", url, userProfileWindow);
	
	methodGetData(url, function( data ){
		
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
			userProfileWindow.children[0].data[0].rows[0].children[1].text = commonMethods.exchangeFromNumber(json[0].age, "age");
			userProfileWindow.children[0].data[0].rows[1].children[0].text = "エリア";
			userProfileWindow.children[0].data[0].rows[1].children[1].text = commonMethods.exchangeFromNumber(json[0].area, "area");
			userProfileWindow.children[0].data[0].rows[2].children[0].text = "目的";
			userProfileWindow.children[0].data[0].rows[2].children[1].text = commonMethods.exchangeFromNumber(json[0].purpose, "purpose");
			userProfileWindow.children[0].data[0].rows[3].children[0].text = "一言";
			userProfileWindow.children[0].data[0].rows[3].children[1].text = json[0].profile;
			userProfileWindow.children[0].data[0].rows[4].children[0].text = "身長";
			userProfileWindow.children[0].data[0].rows[4].children[1].text = commonMethods.exchangeFromNumber(json[0].tall, "tall");
			userProfileWindow.children[0].data[0].rows[5].children[0].text = "血液型";
			userProfileWindow.children[0].data[0].rows[5].children[1].text = commonMethods.exchangeFromNumber(json[0].blood, "blood");
			userProfileWindow.children[0].data[0].rows[6].children[0].text = "体型";
			userProfileWindow.children[0].data[0].rows[6].children[1].text = commonMethods.exchangeFromNumber(json[0].style, "style");
			userProfileWindow.children[0].data[0].rows[7].children[0].text = "休日";
			userProfileWindow.children[0].data[0].rows[7].children[1].text = commonMethods.exchangeFromNumber(json[0].holiday, "holiday");
			userProfileWindow.children[0].data[0].rows[8].children[0].text = "お酒";
			userProfileWindow.children[0].data[0].rows[8].children[1].text = commonMethods.exchangeFromNumber(json[0].alcohol, "alcohol");
			userProfileWindow.children[0].data[0].rows[9].children[0].text = "タバコ";
			userProfileWindow.children[0].data[0].rows[9].children[1].text = commonMethods.exchangeFromNumber(json[0].cigarette, "cigarette"); 
			userProfileWindow.children[0].data[0].rows[10].children[0].text = "給料";
			userProfileWindow.children[0].data[0].rows[10].children[1].text = commonMethods.exchangeFromNumber(json[0].salary, "salary");
			
			//return userProfileWindow;
			tabGroup.activeTab.open( userProfileWindow );
		} else{
			// 通信に失敗したら行う処理
		}
	});
}
	
