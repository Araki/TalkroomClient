function publicRoomWindow() {
	
	var dataList;
	
	var self = createWindow("のぞく");
	var actInd = createActInd();
	
	var tableView = Titanium.UI.createTableView({top:0, bottom:50, separatorStyle:'NONE'});
	
	tableView.addEventListener('click', function(e) {
		actInd.show();
		//consumePointDialog("peep", e.row.roomID, function(data){
			//if (data.success){
				var cWindow = require('chatWindow');
				var chatWindow = new cWindow(e.row.sendfrom, e.row.sendto, false);
				tabGroup.activeTab.open(chatWindow);
				actInd.hide();
			//}else{
				//actInd.hide();
			//}
		//});
	});
	
	var reloadButton = Titanium.UI.createLabel({
			font:{fontFamily: _font, fontSize:16},
			text:'更新',
			textAlign: 'center',
			verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			borderRadius: 4,
			height: 25,
			width: 60,
			backgroundColor: _mossGreen,
			color: _white
	});
	self.rightNavButton = reloadButton;
	
	reloadButton.addEventListener('click', function(){
		loadTableView();
	});
	
	var adView = createBannerAdView();
	
	self.add(adView);
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
	    	/*
	    	var sendfromColor;
	    	var sendtoColor;
	    	if( json[i].sendfrom_gender == "male"){sendfromColor = _darkBlue;}
	    	else{sendfromColor = _vividPink;}
	    	if( json[i].sendto_gender == "male"){sendtoColor = _darkBlue;}
	    	else{sendtoColor = _vividPink;}
	    	
	    	var labelSendFromNickname = Titanium.UI.createLabel({
	        	font:{fontFamily: _font,fontSize:11}, 
	        	textAlign:'left',
	        	verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
	        	color:sendfromColor,
	        	top:5, 
	        	width:100, 
	        	left:55, 
		        height:15,
		        text:json[i].sendfrom_nickname
		    });
		    
		    var labelSendToNickname = Titanium.UI.createLabel({
	        	font:{fontFamily: _font,fontSize:11}, 
	        	textAlign:'left',
	        	verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
	        	color:sendtoColor,
	        	top:50, 
	        	width:100, 
	        	left:55, 
		        height:15,
		        text:json[i].sendto_nickname
		    });
	    	
	    	var sendfromMessage;
	    	var sendtoMessage;
	    	if( json[i].sendfrom_message == null){sendfromMessage = "ー";}
	    	else{ sendfromMessage = json[i].sendfrom_message;}
	    	if( json[i].sendto_message == null){sendtoMessage = "ー";}
	    	else{ sendtoMessage = json[i].sendto_message;}
	    	
	    	var labelSendFromMessage = Titanium.UI.createLabel({
	        	font:{fontFamily: _font,fontSize:16}, 
	        	textAlign:'left',
	        	verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
	        	color:sendfromColor,
	        	bottom:50, 
	        	right:0, 
	        	left:55, 
		        height:20,
		        text:sendfromMessage
		    });
	    
		    var labelSendToMessage = Titanium.UI.createLabel({
		        font:{fontFamily: _font,fontSize:16}, 
		        textAlign:'left',
		        verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		        color:sendtoColor,
		        bottom:5, 
		        right:0, 
		        left:55, 
		        height:20,
		        text: sendtoMessage
		    });
	    
		    var sendFromImage = Titanium.UI.createImageView({
		    	top: 5,
		    	left: 5,
		    	width: 40,
		    	height: 40,
		    	borderRadius:4,
		    	image: json[i].sendfrom_image
		    });
	   
		   var sendToImage = Titanium.UI.createImageView({
		    	top: 50,
		    	left: 5,
		    	width: 40,
		    	height: 40,
		    	borderRadius:4,
		    	image: json[i].sendto_image
		    });
		    
		    var timeLabel = Titanium.UI.createLabel({
		        font:{fontFamily: _font, fontSize:10}, 
		        textAlign:'right',
		        verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		        color:_darkGray,
		        top:5, 
		        right:0,
		        text: json[i].message_number + "トーク / " + json[i].updated_at
		    });
		    
		   var row = Ti.UI.createTableViewRow({
		        hasChild: true,
		        height:95,
		        backgroundImage: '',
		        sendfrom: json[i].sendfrom_id,
		        sendto: json[i].sendto_id
		   });
		   
		   	if(i%2 == 0){
		   		row.backgroundColor = _white;
		   	}else{
		   		row.backgroundColor = _whiteGray;
		   	}
		   	row.add(labelSendFromNickname);
		   	row.add(labelSendToNickname);
		    row.add(sendFromImage);
		    row.add(sendToImage);
		    row.add(labelSendFromMessage);
		    row.add(labelSendToMessage);
		    row.add(timeLabel);
			*/
			var leftBalloonImage = Ti.UI.createView({
				left: 70,
				right: 75,
				top: 20,
				height: 25,
		    	backgroundLeftCap: 21,
				backgroundRightCap: 8,
				backgroundTopCap: 8,
				backgroundBottomCap: 8,
				backgroundImage: 'blue_balloon_left.png',
			});
			
			var rightBalloonImage = Ti.UI.createView({
				left: 75,
				right: 70,
				top: 55,
				height: 25,
		    	backgroundLeftCap: 8,
				backgroundRightCap: 21,
				backgroundTopCap: 8,
				backgroundBottomCap: 8,
				backgroundImage: 'green_balloon_right.png',
			});
			
			var labelSendFromMessage = Titanium.UI.createLabel({
				font:{fontFamily: _font, fontSize:13},
				textAlign: "left",
				verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		       	color:_white,
		       	//backgroundColor: 'red',
		       	left: 18,
		       	right: 5,
		       	height: 13,//Ti.UI.SIZE,//"auto",
		       	center: 0,//top:10,
		    	/*
		    	font:{fontFamily: _font, fontSize:13}, 
		    	textAlign:'left',
		    	verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
		    	color:_darkBlue,
		    	top:25, 
		    	right:80, 
		    	left: 80, 
		        height:20,
		        */
		        text: json[i].sendfrom_message
		    });
		
		    var labelSendToMessage = Titanium.UI.createLabel({
		    	font:{fontFamily: _font, fontSize:13},
				textAlign: "right",
				verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		       	color:_white,
		       	//backgroundColor: 'red',
		       	left: 5,
		       	right: 18,
		       	height: 13,//Ti.UI.SIZE,//"auto",
		       	center: 0,//top:10,
		    	/*
		        font:{fontFamily: _font, fontSize:13}, 
		        textAlign:'left',
		        verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
		        color:_vividPink,
		        bottom:5, 
		        right:80, 
		        left: 80, 
		        height:20,
		        */
		        text: json[i].sendto_message
			});
		    
			var sendFromImage = Titanium.UI.createImageView({
			 	top: 20,
			   	left: 5,
			   	width: 60,
			   	height: 60,
			   	borderRadius: 6,
			   	image: json[i].sendfrom_image
			});
		   
			var sendToImage = Titanium.UI.createImageView({
			   	top: 20,
			   	right: 0,
			   	width: 60,
			   	height: 60,
			   	borderRadius: 6,
			   	image: json[i].sendto_image
			});
			    
			var timeLabel = Titanium.UI.createLabel({
			    font:{fontFamily: _font, fontSize:10}, 
			    textAlign:'right',
			    verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
				color:_darkGray,
				top:0,
				height:20,
				right:0,
				text: json[i].updated_at
		    });
		    
		    var countLabel = Titanium.UI.createLabel({
			    font:{fontFamily: _font, fontSize:10}, 
			    textAlign:'left',
			    verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
				color:_darkGray,
				top:0,
				height:20,
				left: 5,
				text: "トーク数: " + json[i].message_number
		    });
		    
		   var row = Ti.UI.createTableViewRow({
		        hasChild: true,
		        height:90,
		        backgroundImage: '',
		        sendfrom: json[i].sendfrom_id,
		        sendto: json[i].sendto_id,
		        roomID: json[i].room_id
		   });
		   
		   	if(i%2 == 0){
		   		row.backgroundColor = _white;
		   	}else{
		   		row.backgroundColor = _whiteGray;
		   	}
		   	
			row.add(leftBalloonImage);
			row.add(rightBalloonImage);
		    leftBalloonImage.add(labelSendFromMessage);
		    rightBalloonImage.add(labelSendToMessage);
		    row.add(sendFromImage);
		    row.add(sendToImage);
		    row.add(timeLabel);
		    row.add(countLabel);
		    
		   	tableViewRowData.push(row);
		}
	
		tableView.data = tableViewRowData;		
		actInd.hide();
		
	}
	
	
	
	
	return self;
}

module.exports = publicRoomWindow;


