function talkWindow() {
	var self = Titanium.UI.createWindow({  
    	//title:'トーク',
    	backgroundColor:'#fff'
	});
	
	var statusButtonBar = Titanium.UI.createTabbedBar({
		labels:['アタック中', 'トーク中', '足あと'], 
		index:0 
	});
	
	statusButtonBar.addEventListener('click', function(e){
		Ti.API.info("押されたボタンID：" + e.index);
		
		switch (e.index){
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
		data: createAttackTableView()
	});
	
	tableView.addEventListener('click', function(e) {
		Ti.API.info(e.row.id);
		Ti.API.info("クリック");
		var cWindow = require('chatWindow');
		var chatWindow = new cWindow(e.row.sendfrom, e.row.sendto, true);
	
		tabGroup.activeTab.open(chatWindow);
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
	tableView.data = createAttackTableView();
	
	var url = Ti.App.domain + "get_oneside_rooms.json?user_id=" + Ti.App.userID;
	var methodGetData = require('commonMethods').getData;
	methodGetData(url, function( data ){
		if (data.success) {
			// 通信に成功したら行う処理
			var json = data.data;
			Ti.API.info("アタック中テーブル");
			for (var i=0; i<json.length; i++){
				Ti.API.info("profile_image" + json[i].profile_image);
				tableView.data[0].rows[i].sendto = json[i].sendto_id;
				tableView.data[0].rows[i].sendfrom = Ti.App.userID;
				tableView.data[0].rows[i].children[0].image = json[i].profile_image;
				tableView.data[0].rows[i].children[1].text = json[i].profile;
				tableView.data[0].rows[i].children[2].text = json[i].room_updated;
				tableView.data[0].rows[i].children[3].text = json[i].nickname;
				
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
//トーク中のデータをテーブルにロードするファンクション
//===================

function loadTalkData( tableView ){
	//現在表示されているテーブルを初期化
	tableView.data = createTalkTableView();
	
	var url = Ti.App.domain + "get_bothside_rooms.json?user_id=" + Ti.App.userID;
	var methodGetData = require('commonMethods').getData;
	//methodGetData("talkTableView", url, tableView);
	methodGetData(url, function( data ){
		if (data.success) {
			// 通信に成功したら行う処理
			var json = data.data;
			Ti.API.info("トーク中テーブル");
			for (var i=0; i<json.length; i++){
				Ti.API.info("profile_image" + json[i].profile_image);
				tableView.data[0].rows[i].sendto = json[i].sendto_id;
				tableView.data[0].rows[i].sendfrom = Ti.App.userID;
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
}





//===================
//アタック中のテーブル生成ファンクション
//===================
function createAttackTableView() {
	
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
	
	return tableViewRowData;

}