function userTalkedRoomWindow( user_id ) {
	
	var self = createWindow("過去のトーク");
	var tableView = Titanium.UI.createTableView({});
	var tableViewRowData = [];
	var actInd = createActInd();
	actInd.show();
	
	var url = Ti.App.domain + "get_user_rooms.json?user_id=" + user_id + "&app_token=" + Ti.App.Properties.getString('app_token');
	getData(url, function( data ){
		if (data.success) {
			// 通信に成功したら行う処理
			var json = data.data;
			for (var i=0; i<json.length; i++){
				row = createRow(
					json[i].room_id, 
					json[i].sendfrom_image, 
					json[i].sendto_image, 
					json[i].sendfrom_message, 
					json[i].sendto_message, 
					json[i].updated_at,
					json[i].sendfrom_id,
					json[i].sendto_id
				);
			   tableViewRowData.push(row);
			}	
		}else{
			// 通信に失敗したら行う処理
		}
		tableView.data = tableViewRowData;
		actInd.hide();	
	});
	
	tableView.addEventListener('click', function(e) {
		Ti.API.info(e.row.id);
		//alert("ルームIDは" + e.row.id);
		//tableViewRowClickHandler();
		Ti.API.info("クリック");
		var cWindow = require('chatWindow');
		var chatWindow = new cWindow(e.row.sendfrom, e.row.sendto, false);
		tabGroup.activeTab.open(chatWindow);
	});	

	self.add(tableView);
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

function createRow(room_id, sendfrom_image, sendto_image, sendfrom_message, sendto_message, time, sendfrom_id, sendto_id){
	
	var labelSendFromMessage = Titanium.UI.createLabel({
    	font:{fontFamily: _font, fontSize:13}, 
    	textAlign:'left',
    	color:'#000',
    	top:0, 
    	right:30, 
    	left: 115, 
        height:30,
        text: sendfrom_message
    });

    var labelSendToMessage = Titanium.UI.createLabel({
        font:{fontFamily: _font, fontSize:13}, 
        textAlign:'left',
        color:'#000',
        top:30, 
        right:30, 
        left: 115, 
        height:30,
        text: sendto_message
	});
    
	var sendFromImage = Titanium.UI.createImageView({
	 	top: 5,
	   	left: 5,
	   	width: 50,
	   	height: 50,
	   	image: sendfrom_image
	});
   
	var sendToImage = Titanium.UI.createImageView({
	   	top: 5,
	   	left: 60,
	   	width: 50,
	   	height: 50,
	   	image: sendto_image
	});
	    
	var timeLabel = Titanium.UI.createLabel({
	    font:{fontFamily: _font, fontSize:10}, 
	    textAlign:'right',
		color:'#000',
		top:5, 
		right:5,
		text: time
    });
    
   var row = Ti.UI.createTableViewRow({
   		hasChild: true,
        height:60,
        id: room_id,
        sendfrom: sendfrom_id,
        sendto: sendto_id
   });

   row.add(labelSendFromMessage);
   row.add(labelSendToMessage);
   row.add(sendFromImage);
   row.add(sendToImage);
   row.add(timeLabel);
	
	return row;
}

