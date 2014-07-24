function publicRoomWindow() {
	
	var dataList;
	
	var self = createWindow("のぞく");
	
	var actInd = createActInd();
	
	var tableView = Titanium.UI.createTableView({separatorStyle:'NONE'});
	tableView.addEventListener('click', function(e) {
		actInd.show();
		consumePointDialog("peep", function(data){
			if (data.success){
				var cWindow = require('chatWindow');
				var chatWindow = new cWindow(e.row.sendfrom, e.row.sendto, false);
				tabGroup.activeTab.open(chatWindow);
				actInd.hide();
			}else{
				actInd.hide();
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
				//Ti.API.info(dataList[0]);
				
				var url = Ti.App.domain + "get_room_summary_data.json?app_token=" + Ti.App.Properties.getString('app_token') + "&room_ids=";
				for (var i=0; i<dataList.length; i++){
					if (i == 0){
						url = url + dataList[i].room_id;
						//Ti.API.info("ROOM_ID:" + dataList[i]["room_id"]);
						//Ti.API.info("URL:" + url);
					}else{
						url = url + "," + dataList[i].room_id;
						//Ti.API.info("ROOM_ID:" + dataList[i].room_id);
						//Ti.API.info("URL:" + url);
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
	        	font:{fontFamily: _font,fontSize:13}, 
	        	textAlign:'left',
	        	verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
	        	color:_darkBlue,
	        	bottom:30, 
	        	right:0, 
	        	left:137, 
		        height:20,
		        text:json[i].sendfrom_message
		    });
	    
		    var labelSendToMessage = Titanium.UI.createLabel({
		        font:{fontFamily: _font,fontSize:13}, 
		        textAlign:'left',
		        verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
		        color:_vividPink,
		        bottom:10, 
		        right:0, 
		        left:137, 
		        height:20,
		        text: json[i].sendto_message
		    });
	    
		    var sendFromImage = Titanium.UI.createImageView({
		    	top: 5,
		    	left: 5,
		    	width: 60,
		    	height: 60,
		    	borderRadius:6,
		    	image: json[i].sendfrom_image
		    });
	   
		   var sendToImage = Titanium.UI.createImageView({
		    	top: 5,
		    	left: 70,
		    	width: 60,
		    	height: 60,
		    	borderRadius:6,
		    	image: json[i].sendto_image
		    });
		    
		    var timeLabel = Titanium.UI.createLabel({
		        font:{fontFamily: _font, fontSize:10}, 
		        textAlign:'right',
		        verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		        color:_darkGray,
		        top:5, 
		        right:0,
		        text: json[i].updated_at
		    });
		    
		   var row = Ti.UI.createTableViewRow({
		        hasChild: true,
		        height:70,
		        backgroundImage: '',
		        sendfrom: json[i].sendfrom_id,
		        sendto: json[i].sendto_id
		   });
		   
		   if(i%2 == 0){
		   		row.backgroundColor = _white;
		   	}else{
		   		row.backgroundColor = _whiteGray;
		   	}
	   	
		   row.add(sendFromImage);
		   row.add(sendToImage);
		   row.add(labelSendFromMessage);
		   row.add(labelSendToMessage);
		   row.add(timeLabel);
	
		   tableViewRowData.push(row);
		}
	
		tableView.data = tableViewRowData;		
		actInd.hide();
		
	}
	
	
	
	
	return self;
}

module.exports = publicRoomWindow;

