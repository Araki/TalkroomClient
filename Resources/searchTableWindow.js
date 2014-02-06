function searchTableWindow() {

	var self = Titanium.UI.createWindow({  
	    title:'検索結果',
	    backgroundColor:'#fff'
	});

	var tableViewRowData = [];
	
	for (var i=0; i<10; i++){
    
    	var nickNameLabel = Titanium.UI.createLabel({
        	font:{fontSize:12}, 
        	textAlign: 'left',
        	color: '#000',
        	top: 3, 
        	left: 60, 
        	right: 20,
	        height: "auto",
	        //backgroundColor: "blue"
	    });
	    
	    var profileImage = Titanium.UI.createImageView({
	    	image: 'http://profile.ak.fbcdn.net/hprofile-ak-prn2/276018_721214203_1913647351_q.jpg',
	    	top: 5,
	    	left: 5,
	    	width: 50,
	    	height: 50
	    });
	    
	    var profileLabel = Titanium.UI.createLabel({
        	font:{fontSize:10}, 
        	textAlign:'left',
        	color:'#000',
        	top: 18, 
        	bottom: 20,
        	left: 60, 
        	right: 20,
	        //backgroundColor: "green"
	    });
	    
	    var infoLabel = Titanium.UI.createLabel({
        	font:{fontSize:9}, 
        	textAlign:'right',
        	color:'#000',
        	bottom: 3, 
        	right: 5, 
        	left: 60, 
	        height: "auto",
	        //backgroundColor: "red"
	    });
	    
	    var row = Ti.UI.createTableViewRow({
	        height:60,
	        id: ''
	    });
   	
	   row.add(nickNameLabel);
	   row.add(profileImage);
	   row.add(profileLabel);
	   row.add(infoLabel);

	   tableViewRowData.push(row);
	}

	var tableView = Titanium.UI.createTableView({
		data: tableViewRowData
	});

	self.add(tableView);
	return self;
}


module.exports = searchTableWindow;

