//type: myProfileだった場合、「トークする」ボタンを非表示
function userProfileWindow( userID, type ) {
	
	var self = createWindow();
	var actInd = createActInd();
	var profileBgView = createBgView();	
	var buttonBgView = createButtonBgView();
	var profileImage1 = createProfileImage1();
	var profileImage2 = createProfileImage2();
	var profileImage3 = createProfileImage3();
	var tableView = createTableView(profileBgView.height, buttonBgView.height);
	var tableViewRowData = [];
	var readPastTalkButton = createReadPastTalkButton();
	
	actInd.show();

	var url = Ti.App.domain + "get_detail_profile.json?app_token=" + Ti.App.Properties.getString('app_token') + "&user_id=" + userID;
	getData(url, function( data ){
		if (data.success) {
			
			var json = data.data;
			self.id = userID;
			self.titleControl.text = json[0].nickname;
			profileImage1.image = json[0].profile_image1;
			profileImage2.image = json[0].profile_image2;
			profileImage3.image = json[0].profile_image3;
			tableViewRowData[0] = createTableRow("年代", exchangeFromNumber(json[0].age, "age"), 0);
			tableViewRowData[1] = createTableRow("エリア", exchangeFromNumber(json[0].area, "area"), 1);
			tableViewRowData[2] = createTableRow("目的", exchangeFromNumber(json[0].purpose, "purpose"), 0);
			tableViewRowData[3] = createTableRow("一言", json[0].profile, 1);
			tableViewRowData[4] = createTableRow("身長", exchangeFromNumber(json[0].tall, "tall"), 0);
			tableViewRowData[5] = createTableRow("血液型", exchangeFromNumber(json[0].blood, "blood"), 1);
			tableViewRowData[6] = createTableRow("体型", exchangeFromNumber(json[0].style, "style"), 0);
			tableViewRowData[7] = createTableRow("休日", exchangeFromNumber(json[0].holiday, "holiday"), 1);
			tableViewRowData[8] = createTableRow("お酒", exchangeFromNumber(json[0].alcohol, "alcohol"), 0);
			tableViewRowData[9] = createTableRow("タバコ", exchangeFromNumber(json[0].cigarette, "cigarette"), 1);
			tableViewRowData[10] = createTableRow("給料", exchangeFromNumber(json[0].salary, "salary"), 0);
			tableView.data = tableViewRowData;
		} else{
			// 通信に失敗したら行う処理
		}
		actInd.hide();	
	});
	
	readPastTalkButton.addEventListener('click', function() {
		actInd.show();
		
		var utWindow = require('userTalkedRoomWindow');
		var userTalkedRoomWindow = new utWindow();
		
		var url = Ti.App.domain + "get_user_rooms.json?user_id=" + self.id + "&app_token=" + Ti.App.Properties.getString('app_token');
		Ti.API.info("+++ID:" + self.id);
		
		getData(url, function( data ){
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
	
	if( type != "myProfile"){
		var talkButton = createTalkButton();
		buttonBgView.add(talkButton);
		talkButton.addEventListener('click', function() {
			actInd.show();
			var cWindow = require('chatWindow');
			var chatWindow = new cWindow(Ti.App.Properties.getString('my_id'), self.id, true);
			
			actInd.hide();
			tabGroup.activeTab.open(chatWindow);
		});
	}
	
	profileBgView.add(profileImage1);
	profileBgView.add(profileImage2);
	profileBgView.add(profileImage3);
	buttonBgView.add(readPastTalkButton);	
	self.add(tableView);
	self.add(profileBgView);
	self.add(buttonBgView);
	self.add(actInd);
	return self;

}

module.exports = userProfileWindow;

//############################################################
//############################################################
//############################################################
//############################################################
//ファンクション
//############################################################
//############################################################
//############################################################
//############################################################

function createBgView(){
	var view = Titanium.UI.createView({
		top: 0,
		left: 0,
		right: 0,
		height: 112,
		backgroundImage: "images/bg/profile_photo_bg.png"
	});
	return view;
}

function createButtonBgView(){
	var view = Titanium.UI.createView({
		bottom: 0,
		left: 0,
		right: 0,
		height: 76,
		backgroundImage: "images/bg/profile_btn_bg.png"
	});
	return view;
}

function createProfileImage1(){
	var view = Titanium.UI.createImageView({
		top: 10,
		left: 15,
		width: 90,
		height: 90
	});
	return view;
}

function createProfileImage2(){
	var view = Titanium.UI.createImageView({
		top: 10,
		left: 115,
		width: 90,
		height: 90
	});
	return view;
}

function createProfileImage3(){
	var view = Titanium.UI.createImageView({
		top: 10,
		right: 15,
		width: 90,
		height: 90,
	});
	return view;
}

function createTableView( top, bottom ){
	var view = Titanium.UI.createTableView({
		top: top,
		bottom: bottom,
		showVerticalScrollIndicator: true,
		separatorStyle:'NONE'
	});
	return view;
}

function createTableRow(title, data, backgroundType){
	for (var i=0; i<11; i++){
    
    	var titleLabel = Titanium.UI.createLabel({
        	font:{fontSize:14}, 
        	textAlign:'left',
        	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        	color:'#000',
        	top:9,
        	bottom:9, 
        	left:20, 
	        right:210,
	        text: title
	    });
    
	    var variableLabel = Titanium.UI.createLabel({
        	font:{fontSize:14}, 
        	textAlign:'left',
        	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        	color:'#000',
        	top:9,
        	bottom:9, 
        	left:120, 
	        right:20,
	        text: data
	    });
	    
	   var row = Ti.UI.createTableViewRow({
	        hasChild: false,
	        right:0,
	        left:0,
	        height:48,
	        touchEnabled: false,
	        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	   });
	   
	   if(backgroundType%2 == 0){
	   		row.backgroundImage = 'images/bg/table_bg_white.png';
	   	}else{
	   		row.backgroundImage = 'images/bg/table_bg_gray.png';
	   	}
   	
	   row.add(titleLabel);
	   row.add(variableLabel);

	   return row;
	}
}

function createReadPastTalkButton(){
	view = Ti.UI.createButton({
		title: '過去トークを見る',
		bottom: 15,
		width: 130,
		left: 15,
		top: 15,
		borderColor:"#1E90FF",
		borderRadius:5
	});
	return view;
}

function createTalkButton(){
	view =Ti.UI.createButton({
		title: 'トークする',
		bottom: 15,
		width: 130,
		right: 15,
		top: 15,
		borderColor:"#1E90FF",
		borderRadius:5
	});
	return view;
}


