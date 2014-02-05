function searchTableWindow() {

	var self = Titanium.UI.createWindow({  
	    title:'検索結果',
	    backgroundColor:'#fff'
	});

	var tableViewRowData = [];
	
	for (var i=0; i<10; i++){
    
    	var label = Titanium.UI.createLabel({
        	font:{fontSize:15}, 
        	textAlign:'left',
        	color:'#000',
        	top:0, 
        	right:30, 
        	width:170, 
	        height:30
	    });
	    
	    var row = Ti.UI.createTableViewRow({
	        height:60,
	        id: ''
	    });
   	
	   row.add(label);

	   tableViewRowData.push(row);
	}

	var tableView = Titanium.UI.createTableView({
		data: tableViewRowData
	});

	self.add(tableView);
	return self;
}


module.exports = searchTableWindow;

