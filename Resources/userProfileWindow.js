//type: myProfileだった場合、「トークする」ボタンを非表示
function userProfileWindow( type ) {
	
	//var userID = id;
	
	var self = Titanium.UI.createWindow({  
    	//title:'[ユーザーの名前]',
    	backgroundColor:'#fff'
	});
	
	var profileImage1 = Titanium.UI.createImageView({
    	//image: 'http://profile.ak.fbcdn.net/hprofile-ak-prn2/276018_721214203_1913647351_q.jpg',
    	top: 10,
    	left: 15,
    	width: 90,
    	height: 90
	});
	
	var profileImage2 = Titanium.UI.createImageView({
    	//image: 'http://profile.ak.fbcdn.net/hprofile-ak-prn2/276018_721214203_1913647351_q.jpg',
    	top: 10,
    	left: 115,
    	width: 90,
    	height: 90
	});
	
	var profileImage3 = Titanium.UI.createImageView({
    	//image: 'http://profile.ak.fbcdn.net/hprofile-ak-prn2/276018_721214203_1913647351_q.jpg',
    	top: 10,
    	right: 15,
    	width: 90,
    	height: 90,
	});
	
	var scrollView = Titanium.UI.createScrollView({
		contentWidth: "auto",
		contentHeight: "auto",
		top: 110,
		bottom: 140,
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
	
	var readPastTalkButton = Ti.UI.createButton({
		title: '過去トークを見る',
		bottom: 80,
		right: 20,
		left: 20,
		height: 50,
		borderColor:"#1E90FF",
		borderRadius:5
	});
	
	readPastTalkButton.addEventListener('click', function() {
		var utWindow = require('userTalkedRoomWindow');
		var userTalkedRoomWindow = new utWindow();
		
		var url = Ti.App.domain + "get_user_rooms.json?user_id=" + self.id;
		Ti.API.info("+++ID:" + self.id);
		
		var methodGetData = require('commonMethods').getData;
		//methodGetData("userProfileWindow", url, userTalkedRoomWindow);
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
				}
			} else{
				// 通信に失敗したら行う処理
			}
		});
		
		tabGroup.activeTab.open(userTalkedRoomWindow);
		
		Ti.API.info("URL:" + url);
	});
	
	self.add(profileImage1);
	self.add(profileImage2);
	self.add(profileImage3);
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
	self.add(readPastTalkButton);
	
	if( type != "myProfile"){
		var talkButton = Ti.UI.createButton({
			title: 'トークする',
			bottom: 20,
			right: 20,
			left: 20,
			height: 50,
			borderColor:"#1E90FF",
			borderRadius:5
		});
		self.add(talkButton);
		
		talkButton.addEventListener('click', function() {
			//Ti.API.info(e.row.id);
			//alert("ルームIDは" + e.row.id);
			//tableViewRowClickHandler();
			//Ti.API.info("クリック");
			var cWindow = require('chatWindow');
			//ルームIDの1234567890はダミー
			var chatWindow = new cWindow(1234567890, true);
		
			tabGroup.activeTab.open(chatWindow);
		});
	}
	
	return self;

}

module.exports = userProfileWindow;

