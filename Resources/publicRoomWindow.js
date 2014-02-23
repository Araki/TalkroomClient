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
        	width:170, 
	        height:30
	    });
    
	    var labelSendToMessage = Titanium.UI.createLabel({
	        font:{fontSize:13}, 
	        textAlign:'left',
	        color:'#000',
	        top:30, 
	        right:30, 
	        width:170, 
	        height:30
	    });
    
	    var sendFromImage = Titanium.UI.createImageView({
	    	image: 'http://profile.ak.fbcdn.net/hprofile-ak-prn2/276018_721214203_1913647351_q.jpg',
	    	top: 5,
	    	left: 5,
	    	width: 50,
	    	height: 50
	    });
   
	   var sendToImage = Titanium.UI.createImageView({
	    	image: 'http://static4.wikia.nocookie.net/__cb20120615021732/spongebob/images/6/6e/50px-5143827.png',
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
	
	var url = "http://localhost:3000/get_recent_rooms.json";
	var methodGetData = require('commonMethods').getData;
	methodGetData("publicRoomWindow", url, tableView);

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

	return self;
}


module.exports = publicRoomWindow;

