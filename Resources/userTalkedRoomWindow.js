function userTalkedRoomWindow() {

	var self = Titanium.UI.createWindow({  
	    title:'過去のトーク',
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
        	left: 115, 
	        height:30
	    });
    
	    var labelSendToMessage = Titanium.UI.createLabel({
	        font:{fontSize:13}, 
	        textAlign:'left',
	        color:'#000',
	        top:30, 
	        right:30, 
	        left: 115, 
	        height:30
	    });
    
	    var sendFromImage = Titanium.UI.createImageView({
	    	top: 5,
	    	left: 5,
	    	width: 50,
	    	height: 50
	    });
   
	   var sendToImage = Titanium.UI.createImageView({
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
	
	tableView.addEventListener('click', function(e) {
		
		Ti.API.info(e.row.id);
		//alert("ルームIDは" + e.row.id);
		//tableViewRowClickHandler();
		Ti.API.info("クリック");
		var cWindow = require('chatWindow');
		var chatWindow = new cWindow(e.row.id);
	
		tabGroup.activeTab.open(chatWindow);
		
	});	

	self.add(tableView);
	
	return self;
}


module.exports = userTalkedRoomWindow;
