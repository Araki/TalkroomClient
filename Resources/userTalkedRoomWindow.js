var tableView;
var tableViewRowData = [];

function userTalkedRoomWindow( user_id ) {
	tableView = Titanium.UI.createTableView({top:0, bottom:50, separatorStyle:'NONE'});
	tableViewRowData = [];
	var self = createWindow("過去のトーク");
	var adView = createBannerAdView();
	var actInd = createActInd();
	actInd.show();
	
	var url = Ti.App.domain + "get_user_rooms.json?user_id=" + user_id + "&app_token=" + Ti.App.Properties.getString('app_token');
	getData(url, function( data ){
		if (data.success) {
			// 通信に成功したら行う処理
			var json = data.data;
			if (json.length >= 10){
				createRow(json, 0, 10);
			}else{
				createRow(json, 0, json.length);
			}
		}else{
			// 通信に失敗したら行う処理
		}
		//tableView.data = tableViewRowData;
		actInd.hide();	
	});
	
	tableView.addEventListener('click', function(e) {
		Flurry.logEvent('UserTalkedRoomWindow Go To ChatWindow');
		actInd.show();
		if(e.row.id == "addRow"){
			tableViewRowData.pop();
			createRow(e.row.data, e.row.startNum, e.row.endNum);
			actInd.hide();
		}
		else{
			var cWindow = require('chatWindow');
			var chatWindow = new cWindow(e.row.sendfrom, e.row.sendto, false);
			tabGroup.activeTab.open(chatWindow);
			actInd.hide();
		}
	});	
	
	self.add(tableView);
	self.add(adView);
	self.add(actInd);	
	return self;
}

module.exports = userTalkedRoomWindow;

//############################################################
//############################################################
//############################################################
//############################################################
//ファンクション
//############################################################
//############################################################
//############################################################
//############################################################

function createRow(dataList, startNum, endNum){
	for (var i=startNum; i<endNum; i++){
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
	        text: dataList[i].sendfrom_message
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
	        text: dataList[i].sendto_message
		});
	    
		var sendFromImage = Titanium.UI.createImageView({
		 	top: 20,
		   	left: 5,
		   	width: 60,
		   	height: 60,
		   	borderRadius: 6,
		   	borderWidth: 2,
		   	borderColor: _white,
		   	image: dataList[i].sendfrom_image
		});
		
		if(dataList[i].sendfrom_gender == 'male'){
			sendFromImage.borderColor = _darkBlue;
		}else if(dataList[i].sendfrom_gender == 'female'){
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
		   	image: dataList[i].sendto_image
		});
		
		if(dataList[i].sendto_gender == 'male'){
			sendToImage.borderColor = _darkBlue;
		}else if(dataList[i].sendto_gender == 'female'){
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
			text: dataList[i].updated_at
	    });
	    
	    var row = Ti.UI.createTableViewRow({
	   		hasChild: true,
	        height:90,
	        id: dataList[i].room_id,
	        sendfrom: dataList[i].sendfrom_id,
	        sendto: dataList[i].sendto_id
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
}

