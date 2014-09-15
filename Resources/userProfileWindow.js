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
	var reportBGView = createReportBGView();
	var reportView = createReportView();
	var reportButton = Titanium.UI.createLabel({
		font:{fontFamily: _font, fontSize:12},
		text:'通報する',
		textAlign: 'center',
		verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		borderRadius: 4,
		height: 25,
		width: 75,
		backgroundColor: _mossGreen,
		color: _white
	});
	var cancelButtonOnReport = reportView.children[2];
	var reportButtonOnReport = reportView.children[3];
	
	actInd.show();

	var url = Ti.App.domain + "get_detail_profile.json?app_token=" + Ti.App.Properties.getString('app_token') + "&user_id=" + userID;
	getData(url, function( data ){
		if (data.success) {
			
			var json = data.data;
			self.id = userID;
			self.titleControl.text = json[0].nickname;
			if(json[0].profile_image1 != null){profileImage1.image = json[0].profile_image1;}
			if(json[0].profile_image2 != null){profileImage2.image = json[0].profile_image2;}
			if(json[0].profile_image3 != null){profileImage3.image = json[0].profile_image3;}
			tableViewRowData[0] = createTableRow("年代", exchangeFromNumber(json[0].age, "age"), 0);
			tableViewRowData[1] = createTableRow("エリア", exchangeFromNumber(json[0].area, "area"), 1);
			//tableViewRowData[2] = createTableRow("目的", exchangeFromNumber(json[0].purpose, "purpose"), 0);
			tableViewRowData[2] = createTableRow("一言", json[0].profile, 0);
			tableViewRowData[3] = createTableRow("身長", exchangeFromNumber(json[0].tall, "tall"), 1);
			tableViewRowData[4] = createTableRow("血液型", exchangeFromNumber(json[0].blood, "blood"), 0);
			tableViewRowData[5] = createTableRow("体型", exchangeFromNumber(json[0].style, "style"), 1);
			tableViewRowData[6] = createTableRow("休日", exchangeFromNumber(json[0].holiday, "holiday"), 0);
			tableViewRowData[7] = createTableRow("お酒", exchangeFromNumber(json[0].alcohol, "alcohol"), 1);
			tableViewRowData[8] = createTableRow("タバコ", exchangeFromNumber(json[0].cigarette, "cigarette"), 0);
			tableViewRowData[9] = createTableRow("給料", exchangeFromNumber(json[0].salary, "salary"), 1);
			tableView.data = tableViewRowData;
		} else{
			// 通信に失敗したら行う処理
		}
		actInd.hide();	
	});
	
	readPastTalkButton.addEventListener('click', function() {
		Flurry.logEvent('UserProfileWindow Push ReadPastButton');	
		actInd.show();
		consumePointDialog("peep", userID, function(data){
			if (data.success){
				var utWindow = require('userTalkedRoomWindow');
				var userTalkedRoomWindow = new utWindow( self.id );
				tabGroup.activeTab.open(userTalkedRoomWindow);
				actInd.hide();
			}else{
				actInd.hide();
			}
		});
	});
	
	if( type != "myProfile"){
		var talkButton = createTalkButton();
		buttonBgView.add(talkButton);
		talkButton.addEventListener('click', function() {
			Flurry.logEvent('UserProfileWindow Push TalkButton');	
			var cWindow = require('chatWindow');
			var chatWindow = new cWindow(Ti.App.Properties.getString('my_id'), self.id, true);
			tabGroup.activeTab.open(chatWindow);
		});
	}
	
	reportButton.addEventListener('click', function() {
		reportView.show();
		reportBGView.show();
	});
	
	cancelButtonOnReport.addEventListener('click', function() {
		reportView.hide();
		reportBGView.hide();
	});
	
	reportButtonOnReport.addEventListener('click', function() {
		actInd.show();
		Flurry.logEvent('UserProfile Send Report');
		var url = Ti.App.domain + "send_report.json";
		var message = {
				app_token: Ti.App.Properties.getString('app_token'),
				reported_id: userID,
				platform: Ti.Platform.name,
				version: Ti.Platform.version,
				manufacturer: Ti.Platform.manufacturer,
				model: Ti.Platform.model,
				body: reportView.children[1].value
		};
		sendData( url, message, function( data ){
			if (data.success) {
				reportView.hide();
				reportBGView.hide();
				Ti.UI.createAlertDialog({
					title: '通報を送信しました'
				}).show();
				actInd.hide();
			} else{
				// 通信に失敗したら行う処理
				Ti.UI.createAlertDialog({
					title: '通報の送信に失敗しました'
				}).show();
				actInd.hide();
			}
		});
	});
	
	profileBgView.add(profileImage1);
	profileBgView.add(profileImage2);
	profileBgView.add(profileImage3);
	buttonBgView.add(readPastTalkButton);
	self.setRightNavButton(reportButton);	
	self.add(tableView);
	self.add(profileBgView);
	self.add(buttonBgView);
	self.add(reportBGView);
	self.add(reportView);
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
		height: 110,
		//backgroundImage: "images/bg/profile_photo_bg.png"
		backgroundColor: _whiteBlue
	});
	return view;
}

function createButtonBgView(){
	var view = Titanium.UI.createView({
		bottom: 0,
		left: 0,
		right: 0,
		height: 55,
		//backgroundImage: "images/bg/profile_btn_bg.png"
		backgroundColor: _whiteBlue
	});
	return view;
}

function createProfileImage1(){
	var view = Titanium.UI.createImageView({
		top: 10,
		left: 15,
		width: 90,
		height: 90,
		image: '/images/no_image.png',
		borderRadius:9,
	});
	return view;
}

function createProfileImage2(){
	var view = Titanium.UI.createImageView({
		top: 10,
		left: 115,
		width: 90,
		height: 90,
		image: '/images/no_image.png',
		borderRadius:9,
	});
	return view;
}

function createProfileImage3(){
	var view = Titanium.UI.createImageView({
		top: 10,
		right: 15,
		width: 90,
		height: 90,
		image: '/images/no_image.png',
		borderRadius:9,
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
	for (var i=0; i<10; i++){
    
    	var titleLabel = Titanium.UI.createLabel({
        	font:{fontFamily: _font, fontSize:15}, 
        	textAlign:'left',
        	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        	color: _darkGray,
        	top:9,
        	bottom:9, 
        	left:20, 
	        right:210,
	        text: title
	    });
    
	    var variableLabel = Titanium.UI.createLabel({
        	font:{fontFamily: _font, fontSize:14}, 
        	textAlign:'left',
        	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        	color: _darkGray,
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
	        height:40,
	        touchEnabled: false,
	        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	   });
	   
	   if(backgroundType%2 == 0){
	   		row.backgroundColor = _white;
	   	}else{
	   		row.backgroundColor = _whiteGray;
	   	}
   	
	   row.add(titleLabel);
	   row.add(variableLabel);

	   return row;
	}
}

function createReadPastTalkButton(){
	view = Ti.UI.createButton({
		title: '過去トーク',
		font:{fontFamily: _font, fontSize: 18},
		height: 35,
		width: 130,
		left: 15,
		top: 10,
		color:_white,
		backgroundColor:_vividPink,
		borderRadius:10
	});
	return view;
}

function createTalkButton(){
	view =Ti.UI.createButton({
		title: 'トークする',
		font:{fontFamily: _font, fontSize:18},
		height: 35,
		width: 130,
		right: 15,
		top: 10,
		color: _white,
		backgroundColor:_mossGreen,
		borderRadius:10
	});
	return view;
}

function createReportBGView(){
	
	Ti.API.info("!!!!!!!!!!!!!!!!!!");
	
	var view = Titanium.UI.createView({
		bottom: 0,
		left: 0,
		right: 0,
		top: 0,
		backgroundColor:'black',
		opacity: 0.3,
		visible: false
	});
	return view;
}

function createReportView(){
	var view = Titanium.UI.createView({
		bottom: 30,
		left: 30,
		right: 30,
		top: 30,
		backgroundColor:_white,
		borderRadius:10,
		visible: false
	});
	
	var title = Titanium.UI.createLabel({
		top: 10,
		right: 10,
		left: 10,
		text: '通報内容を具体的にご記入ください',
		textAlign:'center',
		font:{fontFamily: _font, fontSize:14},
		color: _vividPink
	});
	
	var textField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 40,
		right: 10,
		left: 10,
		bottom: 50,
		verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DONE,
		autocapitalization: false,
		autocorrect:false,
	    borderColor:_darkBlue,
	    color: _darkGray,
	    backgroundColor: _white,
	    borderRadius:5,
	    font: {fontFamily: _font, fontSize: 14 }
	});
	
	cancelButton = Ti.UI.createButton({
		title: 'キャンセル',
		font:{fontFamily: _font, fontSize:18},
		height: 30,
		width: 110,
		left: 10,
		bottom: 10,
		color: _white,
		backgroundColor:_mossGreen,
		borderRadius:10
	});
	
	reportButton = Ti.UI.createButton({
		title: '通報',
		font:{fontFamily: _font, fontSize:18},
		height: 30,
		width: 110,
		right: 10,
		bottom: 10,
		color: _white,
		backgroundColor: _vividPink,
		borderRadius:10
	});
	
	view.add(title);
	view.add(textField);
	view.add(cancelButton);
	view.add(reportButton);
		
	return view;
}


