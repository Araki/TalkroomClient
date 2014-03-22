function publicRoomWindow() {

	var self = Titanium.UI.createWindow({  
	    title:'のぞく',
	    backgroundColor:'#fff'
	});

	var tableViewRowData = [];
	
	for (var i=0; i<10; i++){
    
    	var labelSendFromMessage = Titanium.UI.createLabel({
        	font:{fontSize:13}, 
        	textAlign:'left',
        	color:'#000',
        	top:0, 
        	right:30, 
        	left:115, 
	        height:30
	    });
    
	    var labelSendToMessage = Titanium.UI.createLabel({
	        font:{fontSize:13}, 
	        textAlign:'left',
	        color:'#000',
	        top:30, 
	        right:30, 
	        left:115, 
	        height:30
	    });
    
	    var sendFromImage = Titanium.UI.createImageView({
	    	image: '',
	    	top: 5,
	    	left: 5,
	    	width: 50,
	    	height: 50
	    });
   
	   var sendToImage = Titanium.UI.createImageView({
	    	image: '',
	    	top: 5,
	    	left: 60,
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
	        hasChild: true,
	        height:60,
	        id: ''
	   });
   	
	   row.add(sendFromImage);
	   row.add(sendToImage);
	   row.add(labelSendFromMessage);
	   row.add(labelSendToMessage);
	   row.add(timeLabel);

	   tableViewRowData.push(row);
	}

	var tableView = Titanium.UI.createTableView({
		data: tableViewRowData
	});

	self.add(tableView);

	tableView.addEventListener('click', function(e) {
		Ti.API.info(e.row.id);
		//alert("ルームIDは" + e.row.id);
		//tableViewRowClickHandler();
		Ti.API.info("クリック");
		var cWindow = require('chatWindow');
		var chatWindow = new cWindow(e.row.id, false);
	
		tabGroup.activeTab.open(chatWindow);
	});	
	
	//タブが選択されたときに初期画面を読み込む
	self.addEventListener('focus', function(e){
		var url = Ti.App.domain + "get_recent_rooms.json";
		var methodGetData = require('commonMethods').getData;
		methodGetData(url, function( data ){
			if (data.success) {
				// 通信に成功したら行う処理
				var json = data.data;
				for (var i=0; i<json.length; i++){
					Ti.API.info("JSONデータ:::::" + json[i].sendfrom_image);
					tableView.data[0].rows[i].children[0].image = json[i].sendfrom_image;
					tableView.data[0].rows[i].children[1].image = json[i].sendto_image;
					tableView.data[0].rows[i].children[2].text = json[i].sendfrom_message;
					tableView.data[0].rows[i].children[3].text = json[i].sendto_message;
					tableView.data[0].rows[i].children[4].text = json[i].updated_at;
					row.id = json[i].room_id;
				}
			} else{
				// 通信に失敗したら行う処理
			}
		});
 	});

	return self;
}


module.exports = publicRoomWindow;

