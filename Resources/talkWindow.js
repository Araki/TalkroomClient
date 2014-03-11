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
	   			//現在表示されているテーブルを初期化
	   			tableView.data = createAttackTableView();
	   			
	   			var url = Ti.App.domain + "get_oneside_rooms.json?user_id=" + Ti.App.userID;
				var methodGetData = require('commonMethods').getData;
				methodGetData("attackTableView", url, tableView);
				
		    	break;
		    	
		    //トーク中ボタンが押されたときの処理
		  	case 1:
		    	//現在表示されているテーブルを初期化
		    	tableView.data = createTalkTableView();
		    	break;
		    	
		    //足あとボタンが押されたときの処理
		  	case 2:
		    	//現在表示されているテーブルを初期化
	   			tableView.data = createFootprintTableView();
		    	break;
		}
	});	
	
	// Navbarの中央に配置
	self.setTitleControl(statusButtonBar);
	
	//初期表示テーブルの設定
	var tableView = Titanium.UI.createTableView({
		data: createAttackTableView()
	});
	
	var url = Ti.App.domain + "get_oneside_rooms.json?user_id=" + Ti.App.userID;
	Ti.API.info("URL:" + url);
	var methodGetData = require('commonMethods').getData;
	methodGetData("attackTableView", url, tableView);
	
	self.add(tableView);
	return self;
}

module.exports = talkWindow;

//===================
//アタック中のテーブル生成ファンクション
//===================
function createAttackTableView() {
	Ti.API.info("createAttackTableViewが起動");
	var tableViewRowData = [];
	
	for (var i=0; i<10; i++){
    
    	var profileMessage = Titanium.UI.createLabel({
        	font:{fontSize:13}, 
        	textAlign:'left',
        	color:'#000',
        	top:0, 
        	left:60,
        	right:30, 
        	//width:170, 
	        height:30
	    });
    	/*
	    var labelSendToMessage = Titanium.UI.createLabel({
	        font:{fontSize:13}, 
	        textAlign:'left',
	        color:'#000',
	        top:30, 
	        right:30, 
	        width:170, 
	        height:30
	    });
    	*/
    	/*
	    var sendFromImage = Titanium.UI.createImageView({
	    	image: '',
	    	top: 5,
	    	left: 5,
	    	width: 50,
	    	height: 50
	    });
   		*/
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
	    
	   var row = Ti.UI.createTableViewRow({
	        height:60,
	        id: ''
	   });
   	
	   row.add(profileImage);
	   //row.add(sendToImage);
	   row.add(profileMessage);
	   //row.add(labelSendToMessage);
	   row.add(timeLabel);

	   tableViewRowData.push(row);
	}
	
	return tableViewRowData;

}

//===================
//トーク中のテーブル生成ファンクション
//===================
function createTalkTableView() {
	Ti.API.info("createTalkTableViewが起動");
	var tableViewRowData = [];
	
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