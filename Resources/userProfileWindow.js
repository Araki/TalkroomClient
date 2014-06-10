//type: myProfileだった場合、「トークする」ボタンを非表示
function userProfileWindow( type ) {
	
	var actInd = Titanium.UI.createActivityIndicator({
		height:'100%',
		width:'100%',
		font: {fontFamily:'Helvetica Neue', fontSize:16, fontWeight:'bold'},
		color: 'white',
		backgroundColor:'black',
		opacity: 0.5,
		//borderRadius:5,
		style:(Ti.Platform.name === 'iPhone OS' ? Ti.UI.iPhone.ActivityIndicatorStyle.BIG : Ti.UI.ActivityIndicatorStyle.BIG), //DARK,PLAIN
		//message: "ローディング中"
	});
	
	var self = createWindow();
	
	var profileBgView = Titanium.UI.createView({
		top: 0,
		left: 0,
		right: 0,
		height: 112,
		backgroundImage: "images/bg/profile_photo_bg.png"
	});
	
	var buttonBgView = Titanium.UI.createView({
		bottom: 0,
		left: 0,
		right: 0,
		height: 76,
		backgroundImage: "images/bg/profile_btn_bg.png"
	});
	
	var profileImage1 = Titanium.UI.createImageView({
    	top: 10,
    	left: 15,
    	width: 90,
    	height: 90
	});
	
	var profileImage2 = Titanium.UI.createImageView({
    	top: 10,
    	left: 115,
    	width: 90,
    	height: 90
	});
	
	var profileImage3 = Titanium.UI.createImageView({
    	top: 10,
    	right: 15,
    	width: 90,
    	height: 90,
	});
	
	//=================================================	
	
	var tableView = Titanium.UI.createTableView({
		top: profileBgView.height,
		bottom: buttonBgView.height,
		showVerticalScrollIndicator: true,
		separatorStyle:'NONE'
	});
	
	var tableViewRowData = [];
	for (var i=0; i<11; i++){
    
    	var titleLabel = Titanium.UI.createLabel({
        	font:{fontSize:14}, 
        	textAlign:'left',
        	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        	color:'#000',
        	top:9,
        	bottom:9, 
        	left:20, 
	        right:210
	    });
    
	    var variableLabel = Titanium.UI.createLabel({
        	font:{fontSize:14}, 
        	textAlign:'left',
        	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        	color:'#000',
        	top:9,
        	bottom:9, 
        	left:120, 
	        right:20
	    });
	    
	   var row = Ti.UI.createTableViewRow({
	        hasChild: false,
	        right:0,
	        left:0,
	        height:48,
	        touchEnabled: false,
	        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	   });
	   
	   if(i%2 == 0){
	   		row.backgroundImage = 'images/bg/table_bg_white.png';
	   	}else{
	   		row.backgroundImage = 'images/bg/table_bg_gray.png';
	   	}
   	
	   row.add(titleLabel);
	   row.add(variableLabel);

	   tableViewRowData.push(row);
	}
	
	tableView.data = tableViewRowData;
	//=================================================
	/*
	var scrollView = Titanium.UI.createScrollView({
		contentWidth: "auto",
		contentHeight: "auto",
		top: profileBgView.height,
		bottom: buttonBgView.height,
		showVerticalScrollIndicator: true,
		//backgroundColor: "blue"
	});
	
	var detailView = Titanium.UI.createView({
		//backgroundColor: "red"//'#fff'
	});
	
	var ageLabel = Titanium.UI.createLabel({
        font:{fontSize:14}, 
        textAlign:'left',
        color:'#000',
        top: 10, 
        left: 15, 
        //text: "年代： ",
	    //backgroundColor: "green"
	});
	
	var areaLabel = Titanium.UI.createLabel({
        font:{fontSize:14}, 
        textAlign:'left',
        color:'#000',
        top: 40, 
        left: 15, 
        //text: "エリア： ",
	    //backgroundColor: "green"
	});
	
	var purposeLabel = Titanium.UI.createLabel({
        font:{fontSize:14}, 
        textAlign:'left',
        color:'#000',
        top: 70, 
        left: 15, 
        //text: "目的： ",
	    //backgroundColor: "green"
	});
	
	var profileLabel = Titanium.UI.createLabel({
        font:{fontSize:14}, 
        textAlign:'left',
        color:'#000',
        top: 100, 
        left: 15, 
        //text: "一言： ",
	    //backgroundColor: "green"
	});
	
	var tallLabel = Titanium.UI.createLabel({
        font:{fontSize:14}, 
        textAlign:'left',
        color:'#000',
        top: 130, 
        left: 15, 
        //text: "身長： ",
	    //backgroundColor: "green"
	});
	
	var bloodLabel = Titanium.UI.createLabel({
        font:{fontSize:14}, 
        textAlign:'left',
        color:'#000',
        top: 160, 
        left: 15, 
        //text: "血液型： ",
	    //backgroundColor: "green"
	});
	
	var styleLabel = Titanium.UI.createLabel({
        font:{fontSize:14}, 
        textAlign:'left',
        color:'#000',
        top: 190, 
        left: 15, 
        //text: "体型： ",
	    //backgroundColor: "green"
	});
	
	var holidayLabel = Titanium.UI.createLabel({
        font:{fontSize:14}, 
        textAlign:'left',
        color:'#000',
        top: 220, 
        left: 15, 
        //text: "休日： ",
	    //backgroundColor: "green"
	});
	
	var alcoholLabel = Titanium.UI.createLabel({
        font:{fontSize:14}, 
        textAlign:'left',
        color:'#000',
        top: 250, 
        left: 15, 
        //text: "お酒： ",
	    //backgroundColor: "green"
	});
	
	var cigaretteLabel = Titanium.UI.createLabel({
        font:{fontSize:14}, 
        textAlign:'left',
        color:'#000',
        top: 280, 
        left: 15, 
        //text: "タバコ： ",
	    //backgroundColor: "green"
	});
	
	var salaryLabel = Titanium.UI.createLabel({
        font:{fontSize:14}, 
        textAlign:'left',
        color:'#000',
        top: 310, 
        left: 15, 
        //text: "給料： ",
	    //backgroundColor: "green"
	});
	*/
	
	var readPastTalkButton = Ti.UI.createButton({
		title: '過去トークを見る',
		bottom: 15,
		width: 130,
		left: 15,
		top: 15,
		borderColor:"#1E90FF",
		borderRadius:5
	});
	
	readPastTalkButton.addEventListener('click', function() {
		actInd.show();
		
		var utWindow = require('userTalkedRoomWindow');
		var userTalkedRoomWindow = new utWindow();
		
		var url = Ti.App.domain + "get_user_rooms.json?user_id=" + self.id + "&app_token=" + Ti.App.Properties.getString('app_token');
		Ti.API.info("+++ID:" + self.id);
		
		var methodGetData = require('commonMethods').getData;
		methodGetData(url, function( data ){
			if (data.success) {
				// 通信に成功したら行う処理
				var json = data.data;
				for (var i=0; i<json.length; i++){
					userTalkedRoomWindow.children[0].data[0].rows[i].children[0].image = json[i].sendfrom_image;
					userTalkedRoomWindow.children[0].data[0].rows[i].children[1].image = json[i].sendto_image;
					userTalkedRoomWindow.children[0].data[0].rows[i].children[2].text = json[i].sendfrom_message;
					userTalkedRoomWindow.children[0].data[0].rows[i].children[3].text = json[i].sendto_message;
					userTalkedRoomWindow.children[0].data[0].rows[i].children[4].text = json[i].updated_at;
					userTalkedRoomWindow.children[0].data[0].rows[i].id = json[i].room_id;
					userTalkedRoomWindow.children[0].data[0].rows[i].sendto = json[i].sendto_id;//self.id;
					userTalkedRoomWindow.children[0].data[0].rows[i].sendfrom = json[i].sendfrom_id;
				}
			} else{
				// 通信に失敗したら行う処理
			}
		});
		actInd.hide();
		tabGroup.activeTab.open(userTalkedRoomWindow);
		
		Ti.API.info("URL:" + url);
	});
	
	profileBgView.add(profileImage1);
	profileBgView.add(profileImage2);
	profileBgView.add(profileImage3);
	buttonBgView.add(readPastTalkButton);
	
	if( type != "myProfile"){
		var talkButton = Ti.UI.createButton({
			title: 'トークする',
			bottom: 15,
			width: 130,
			right: 15,
			top: 15,
			borderColor:"#1E90FF",
			borderRadius:5
		});
		buttonBgView.add(talkButton);
		
		talkButton.addEventListener('click', function() {
			actInd.show();
			var cWindow = require('chatWindow');
			var chatWindow = new cWindow(Ti.App.Properties.getString('my_id'), self.id, true);
			
			actInd.hide();
			tabGroup.activeTab.open(chatWindow);
		});
	}
	
	self.add(tableView);
	self.add(profileBgView);
	self.add(buttonBgView);
	/*
	self.add(scrollView);
	scrollView.add(detailView);
	detailView.add(ageLabel);
	detailView.add(areaLabel);
	detailView.add(purposeLabel);
	detailView.add(profileLabel);
	detailView.add(tallLabel);
	detailView.add(bloodLabel);
	detailView.add(styleLabel);
	detailView.add(holidayLabel);
	detailView.add(alcoholLabel);
	detailView.add(cigaretteLabel);
	detailView.add(salaryLabel);
	*/
	
	
	
	
	
	
	self.add(actInd);
	return self;

}

module.exports = userProfileWindow;

