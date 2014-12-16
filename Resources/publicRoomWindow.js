function publicRoomWindow() {
	
	var dataList;
	var tableViewRowData = [];
	var self = createWindow("ルーム");
	var actInd = createActInd();
	
	var tableView = Titanium.UI.createTableView({top:0, bottom:50, separatorStyle:'NONE'});
	
	tableView.addEventListener('click', function(e) {
		if(e.row.id == "normal"){
			Flurry.logEvent('PublicRoomWindow Go To ChatWindow');
			actInd.show();
			var cWindow = require('chatWindow');
			var chatWindow = new cWindow(e.row.sendfrom, e.row.sendto, false);
			tabGroup.activeTab.open(chatWindow);
			actInd.hide();
		}else if(e.row.id == "addRow"){
			tableViewRowData.pop();
			createView(dataList, e.row.startNum, e.row.endNum);
		}
		
		
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
		Flurry.logEvent('PublicRoomWindow Reload');
		tableViewRowData = [];
		loadTableView();
		tableView.scrollToTop(0, true);
	});
	
	var adView = createBannerAdView();
	
	self.add(adView);
	self.add(tableView);
	self.add(actInd);
	
	/*
	//タブが選択されたときに初期画面を読み込む
	self.addEventListener('focus', function(e){
		//直近のルーム100件取得
		//その後、次に要素を取得し表示する関数を実行
		//次の10件を読み込むで更に要素を取得し表示する関数を実行
		
		if(dataList == null){
			
		}
		
 	});
 	*/
 	loadTableView();
 	
 	function loadTableView(){
 		actInd.show();
		
		//100件のルームIDとアップデート日時を取得
		var url = Ti.App.domain + "get_recent_rooms.json?app_token=" + Ti.App.Properties.getString('app_token');
		getData(url, function( data ){
			if (data.success) {
				// 通信に成功したら行う処理
				dataList = data.data;
				if (dataList.length >= 10){
					createView(dataList, 0, 10);
				}else{
					createView(dataList, 0, json.length);
				}
				actInd.hide();
			} else{
				// 通信に失敗したら行う処理
				actInd.hide();
			}
		});
 	}
	
	//============================
	//View画面作成
	//============================
	function createView(dataList, startNum, endNum){
		actInd.show();
		var json;
		var url = Ti.App.domain + "get_room_summary_data.json?app_token=" + Ti.App.Properties.getString('app_token') + "&room_ids=";
		for (var i=startNum; i<endNum; i++){
			if (i == startNum){
				url = url + dataList[i].room_id;
			}else{
				//Ti.API.info("#####i:" + i);
				url = url + "," + dataList[i].room_id;
			}
		}
		//Ti.API.info("URL;" + url);
		getData(url, function( data ){
			if (data.success) {
				// 通信に成功したら行う処理
				json = data.data;
				pushTableView();
				actInd.hide();
					
			} else{
				// 通信に失敗したら行う処理
				actInd.hide();
			}
		});
		//==================
		function pushTableView(){
			for (var i=0; i<json.length; i++){
				//Ti.API.info("pushTable:" + i + "json:" + json + "starNum:" + startNum + "endNum:" + endNum);
				
				//Ti.API.info("sendfrom_mssage:" + json[i]);
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
			       	left: 18,
			       	right: 5,
			       	height: 13,
			       	center: 0,
			        text: json[i].sendfrom_message
			    });
			
			    var labelSendToMessage = Titanium.UI.createLabel({
			    	font:{fontFamily: _font, fontSize:13},
					textAlign: "right",
					verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
			       	color:_white,
			       	left: 5,
			       	right: 18,
			       	height: 13,
			       	center: 0,
			        text: json[i].sendto_message
				});
			    
				var sendFromImage = Titanium.UI.createImageView({
				 	top: 20,
				   	left: 5,
				   	width: 60,
				   	height: 60,
				   	borderRadius: 6,
				   	borderWidth: 2,
				   	borderColor: _white,
				   	image: json[i].sendfrom_image
				});
				if(json[i].sendfrom_gender == 'male'){
					sendFromImage.borderColor = _darkBlue;
				}else if(json[i].sendfrom_gender == 'female'){
					sendFromImage.borderColor = _vividPink;
				}
			   
				var sendToImage = Titanium.UI.createImageView({
				   	top: 20,
				   	right: 0,
				   	width: 60,
				   	height: 60,
				   	borderRadius: 6,
				   	borderWidth: 2,
				   	borderColor: _white,
				   	image: json[i].sendto_image
				});
				if(json[i].sendto_gender == 'male'){
					sendToImage.borderColor = _darkBlue;
				}else if(json[i].sendto_gender == 'female'){
					sendToImage.borderColor = _vividPink;
				}
				    
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
			        roomID: json[i].room_id,
			        id: "normal"
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
			
			//追加読込Rowの追加判定
			var nextEndNum;
			if(endNum == dataList.length){
				//次に読み込むRowがない場合はaddRowは追加しない 
			}else{
				if(endNum + 10 <= dataList.length){
					nextEndNum = endNum + 10;
				}else{
					nextEndNum = dataList.length;
				}
				var addRow = Ti.UI.createTableViewRow({
					hasChild: false,
					height:25,
					backgroundColor: _mossGreen,
					id: "addRow",
					data: dataList,
					startNum: endNum,
					endNum: nextEndNum,
				});
				addRowLabel = Ti.UI.createLabel({
					text: "次の結果を読み込む",
					color: _white,//_darkGray,
					font:{fontFamily: _font, fontSize:13},
				});
				addRow.add(addRowLabel);
				tableViewRowData.push(addRow);
			}
			
			tableView.data = tableViewRowData;	
			
				
			//actInd.hide();
		}
	}
	
	
	
	
	return self;
}

module.exports = publicRoomWindow;


