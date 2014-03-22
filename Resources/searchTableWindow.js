function searchTableWindow( numberOfRow ) {

	var self = Titanium.UI.createWindow({  
	    title:'検索結果',
	    backgroundColor:'#fff'
	});

	var tableViewRowData = [];
	
	for (var i=0; i<numberOfRow; i++){
    
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
	    	image: '',//'http://profile.ak.fbcdn.net/hprofile-ak-prn2/276018_721214203_1913647351_q.jpg',
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
	    	hasChild: true,
	        height:60,
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
	
	tableView.addEventListener('click', function(e) {
		
		Ti.API.info("ユーザーIDは" + e.row.id);
		var userID = e.row.id;
		
		var url = Ti.App.domain + "get_detail_profile.json?user_id=" + userID;
		Ti.API.info("URL:" + url);
		
		var commonMethods = require('commonMethods');
		var methodGetData = commonMethods.getData;
		//methodGetData("searchTableWindow", url, userProfileWindow);
		
		methodGetData(url, function( data ){
			
			if (data.success) {
				// 通信に成功したら行う処理
				var json = data.data;
				
				var upWindow = require('userProfileWindow');
				var userProfileWindow = new upWindow();
				
				userProfileWindow.id = userID;
				userProfileWindow.title = json[0].nickname;
				userProfileWindow.children[0].image = json[0].profile_image1;
				userProfileWindow.children[1].image = json[0].profile_image2;
				userProfileWindow.children[2].image = json[0].profile_image3;
				userProfileWindow.children[3].children[0].children[0].text = "年代： " + commonMethods.exchangeFromNumber(json[0].age, "age");
				userProfileWindow.children[3].children[0].children[1].text = "エリア： " + commonMethods.exchangeFromNumber(json[0].area, "area");
				userProfileWindow.children[3].children[0].children[2].text = "目的： " + commonMethods.exchangeFromNumber(json[0].purpose, "purpose");
				userProfileWindow.children[3].children[0].children[3].text = "一言： " + json[0].profile;
				userProfileWindow.children[3].children[0].children[4].text = "身長： " + commonMethods.exchangeFromNumber(json[0].tall, "tall");
				userProfileWindow.children[3].children[0].children[5].text = "血液型： " + commonMethods.exchangeFromNumber(json[0].blood, "blood");
				userProfileWindow.children[3].children[0].children[6].text = "体型： " + commonMethods.exchangeFromNumber(json[0].style, "style");
				userProfileWindow.children[3].children[0].children[7].text = "休日： " + commonMethods.exchangeFromNumber(json[0].holiday, "holiday");
				userProfileWindow.children[3].children[0].children[8].text = "お酒： " + commonMethods.exchangeFromNumber(json[0].alcohol, "alcohol");
				userProfileWindow.children[3].children[0].children[9].text = "タバコ： " + commonMethods.exchangeFromNumber(json[0].cigarette, "cigarette"); 
				userProfileWindow.children[3].children[0].children[10].text = "給料： " + commonMethods.exchangeFromNumber(json[0].salary, "salary");
				
				tabGroup.activeTab.open( userProfileWindow );
				
			} else{
				// 通信に失敗したら行う処理
			}
		});
	});	

	self.add(tableView);
	return self;
}


module.exports = searchTableWindow;

