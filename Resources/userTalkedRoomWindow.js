function userTalkedRoomWindow( user_id ) {
	
	var self = createWindow("過去のトーク");
	var tableView = Titanium.UI.createTableView({separatorStyle:'NONE'});
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
					json[i].sendto_id,
					i
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

function createRow(room_id, sendfrom_image, sendto_image, sendfrom_message, sendto_message, time, sendfrom_id, sendto_id, backgroundType){
	
	var labelSendFromMessage = Titanium.UI.createLabel({
    	font:{fontFamily: _font, fontSize:13}, 
    	textAlign:'left',
    	verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
    	color:_darkBlue,
    	bottom:30, 
    	right:0, 
    	left: 137, 
        height:20,
        text: sendfrom_message
    });

    var labelSendToMessage = Titanium.UI.createLabel({
        font:{fontFamily: _font, fontSize:13}, 
        textAlign:'left',
        verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
        color:_vividPink,
        bottom:10, 
        right:0, 
        left: 137, 
        height:20,
        text: sendto_message
	});
    
	var sendFromImage = Titanium.UI.createImageView({
	 	top: 5,
	   	left: 5,
	   	width: 60,
	   	height: 60,
	   	borderRadius: 6,
	   	image: sendfrom_image
	});
   
	var sendToImage = Titanium.UI.createImageView({
	   	top: 5,
	   	left: 70,
	   	width: 60,
	   	height: 60,
	   	borderRadius: 6,
	   	image: sendto_image
	});
	    
	var timeLabel = Titanium.UI.createLabel({
	    font:{fontFamily: _font, fontSize:10}, 
	    textAlign:'right',
	    verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		color:_darkGray,
		top:5, 
		right:0,
		text: time
    });
    
   var row = Ti.UI.createTableViewRow({
   		hasChild: true,
        height:70,
        id: room_id,
        sendfrom: sendfrom_id,
        sendto: sendto_id
   });
   
   if(backgroundType%2 == 0){
   		row.backgroundColor = _white;
	}else{
   		row.backgroundColor = _whiteGray;
   	}

   row.add(labelSendFromMessage);
   row.add(labelSendToMessage);
   row.add(sendFromImage);
   row.add(sendToImage);
   row.add(timeLabel);
	
	return row;
}

