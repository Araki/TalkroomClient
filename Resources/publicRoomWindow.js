function publicRoomWindow() {
	
	var dataList;
	
	var self = createWindow("のぞく");
	
	var actInd = createActInd();
	
	var tableView = Titanium.UI.createTableView({});
	tableView.addEventListener('click', function(e) {
		consumePointDialog("peep", function(data){
			if (data.success){
				var cWindow = require('chatWindow');
				var chatWindow = new cWindow(e.row.sendfrom, e.row.sendto, false);
				tabGroup.activeTab.open(chatWindow);
			}
		});
	});	
	
	self.add(tableView);
	self.add(actInd);
	

	//タブが選択されたときに初期画面を読み込む
	self.addEventListener('focus', function(e){
		//直近のルーム100件取得
		//その後、次に要素を取得し表示する関数を実行
		//次の10件を読み込むで更に要素を取得し表示する関数を実行
		
		if(dataList == null){
			loadTableView();
		}
		
 	});
 	
 	function loadTableView(){
 		actInd.show();
		
		//100件のルームIDとアップデート日時を取得
		var url = Ti.App.domain + "get_recent_rooms.json?app_token=" + Ti.App.Properties.getString('app_token');
		getData(url, function( data ){
			if (data.success) {
				// 通信に成功したら行う処理
				dataList = data.data;
				Ti.API.info(dataList[0]);
				
				var url = Ti.App.domain + "get_room_summary_data.json?app_token=" + Ti.App.Properties.getString('app_token') + "&room_ids=";
				for (var i=0; i<dataList.length; i++){
					if (i == 0){
						url = url + dataList[i].room_id;
						Ti.API.info("ROOM_ID:" + dataList[i]["room_id"]);
						Ti.API.info("URL:" + url);
					}else{
						url = url + "," + dataList[i].room_id;
						Ti.API.info("ROOM_ID:" + dataList[i].room_id);
						Ti.API.info("URL:" + url);
					}
				}
				
				getData(url, function( data ){
					if (data.success) {
						// 通信に成功したら行う処理
						var json = data.data;
						createView(json);
							
					} else{
						// 通信に失敗したら行う処理
					}
				});
				
			} else{
				// 通信に失敗したら行う処理
			}
		});
 	}
	
	
	
	//============================
	//View画面作成
	//============================
	function createView(json){
		
		var tableViewRowData = [];
		for (var i=0; i<json.length; i++){
	    
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
		        backgroundImage: '',
		        id: ''
		   });
	   	
		   row.add(sendFromImage);
		   row.add(sendToImage);
		   row.add(labelSendFromMessage);
		   row.add(labelSendToMessage);
		   row.add(timeLabel);
	
		   tableViewRowData.push(row);
		}
	
		//var tableView = Titanium.UI.createTableView({
		//	data: tableViewRowData
		//});
		//self.add(tableView);
		
		tableView.data = tableViewRowData;
		
		for (var i=0; i< json.length; i++){
			Ti.API.info("###ROOM_ID:" + json[i].room_id);
			Ti.API.info("JSONデータ:::::" + json[i].sendfrom_image);
			tableView.data[0].rows[i].children[0].image = json[i].sendfrom_image;
			tableView.data[0].rows[i].children[1].image = json[i].sendto_image;
			tableView.data[0].rows[i].children[2].text = json[i].sendfrom_message;
			tableView.data[0].rows[i].children[3].text = json[i].sendto_message;
			tableView.data[0].rows[i].children[4].text = json[i].updated_at;
			tableView.data[0].rows[i].sendfrom = json[i].sendfrom_id;
			tableView.data[0].rows[i].sendto = json[i].sendto_id;
			//row.id = json[i].room_id;
		}
		
		actInd.hide();
		
	}
	
	
	
	
	return self;
}

module.exports = publicRoomWindow;

