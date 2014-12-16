

function chatWindow(sendfrom, sendto, textField) {
	var rand = Math.floor(Math.random()*2);
	switch(rand){
		case 0:
			nendInterstitialWindow.visible = true;
			break;
		case 1:
			imobileInterstitialWindow.visible = true;
			break;
		default:
			var adview = null;
			break;
	}
	var self = createWindow("トークルーム");
	var roomID;
	var roomPublic;
	var roomMessageCount;
	var visibleTextField = textField;
	var scrollViewHeight = 0;
	var chatArray = new Array();
	var actInd = createActInd();
	var tableViewRowData = [];
	actInd.show();
	
	var baseView = Titanium.UI.createScrollView({
		contentWidth: "auto",
		contentHeight: "auto",
		top: 0,
		bottom:0,
		backgroundColor: _whiteBlue,
		showVerticalScrollIndicator: false
	});
	
	var tableView = Titanium.UI.createTableView({
		top: 0,
		bottom:50,
		backgroundColor: _whiteBlue,
		separatorStyle:'NONE',
	});

	var adView = createBannerAdView();
	
	var toolbarView = Titanium.UI.createView({
		bottom: 0,
		height: 35,
		right:0,
		left:0,
		backgroundColor: _lightBlue
	});
	
	var textField = Titanium.UI.createTextField({
		height:25,
		left:30,
		right:50,
		backgroundColor: _white,
		borderRadius: 4,
		borderColor: _darkBlue,
		//backgroundImage:'inputfield.png',
		font:{font:_font, fontSize:13},
		color:_darkGray,
		appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	    returnKeyType:Titanium.UI.RETURNKEY_DONE,
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var textLengthLabel = Titanium.UI.createLabel({
		text: 0,
		height: 25,
		left: 0,
		width: 25,
		textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
		color: _white,
		font:{fontFamily: _font, fontSize: 12 }
	});
	
	textField.addEventListener('change',function(e){
  		textLengthLabel.text = textField.value.length;
  		if(textField.value.length > 100 ){
  			textLengthLabel.color = _vividPink;
  		}else{
  			textLengthLabel.color = _white;
  		}
	});
	
	var sendButton = Titanium.UI.createButton({
		title: "送信",
		font:{fontFamily: _font, fontSize:14},
		verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		backgroundColor: _mossGreen,
		color: _white,
		borderRadius: 4,
		width:40,
		height:25,
		right:5
	});
	
	tableView.addEventListener('click', function(e) {
		actInd.show();
		if(e.row.id == "addRow"){
			//tableViewRowData.pop();
			tableViewRowData.shift();
			createTalkRow(e.row.data, e.row.startNum, e.row.endNum);
		}
		else{}
		actInd.hide();
	});	
	
	var url = Ti.App.domain + "get_room_message.json?sendfrom=" + sendfrom + "&sendto=" + sendto + "&tf_flag=" + visibleTextField + "&app_token=" + Ti.App.Properties.getString('app_token');
	getData(url, function( data ){
		if (data.success) {
			
			// 通信に成功したら行う処理
			var json = data.data;
			roomID = json.room_id;
			roomPublic = json.public;
			roomMessageCount = json.message_count;
			if (json.messages.length >= 10){
				//Ti.API.info("1########################" + json.messages.length);
				createTalkRow(json, 0, 10);
				tableView.scrollToIndex(tableViewRowData.length - 1, {animated:true});
			}else{
				//Ti.API.info("2########################" + json.messages.length);
				createTalkRow(json, 0, json.messages.length);
				tableView.scrollToIndex(tableViewRowData.length - 1, {animated:true});
			}
		} else{
			// 通信に失敗したら行う処理
		}
		
		if(visibleTextField){//自分がチャットできるルームである場合
			if(roomID != null){//ルームが既にある場合（メッセージが1通以上ある場合）
				if(roomPublic == true){//ルームがパブリックであるときの処理
					changePrivateButton.text = '非公開にする';
					changePrivateButton.backgroundColor = _vividPink;
					changePrivateButton.color = _white;
					changePrivateButton.enabled = true;
				}else{//ルームがプライベートであるときの処理
					changePrivateButton.text = "非公開中";
					changePrivateButton.backgroundColor = _lightGray;
					changePrivateButton.color = _gray;
					changePrivateButton.enabled = false;
				}
			}
		}
		
		
		actInd.hide();
		
	});
	
	function createTalkRow(dataList, startNum, endNum){
		for (var i=startNum; i<endNum; i++){
			//Ti.API.info("i:" + i);
			chatArray[i] = new Array();
			if(dataList.messages[i].sendfrom_list_id != Ti.App.Properties.getString('my_id') && dataList.messages[i].sendto_list_id != Ti.App.Properties.getString('my_id')){
				if(dataList.messages[i].sendfrom_list_id == sendto){
					chatArray[i]["side"] = "right";
				}else{
					chatArray[i]["side"] = "left";
				}
			}else{
				if(dataList.messages[i].sendfrom_list_id == Ti.App.Properties.getString('my_id')){
					chatArray[i]["side"] = "right";
				}else{
					chatArray[i]["side"] = "left";
				}
			}
			chatArray[i]["id"] = dataList.messages[i].sendfrom_list_id;
			chatArray[i]["message"] = dataList.messages[i].body;
			chatArray[i]["image"] = dataList.messages[i].sendfrom_image;
			chatArray[i]["gender"] = dataList.messages[i].sendfrom_gender;
			chatArray[i]["time"] = dataList.messages[i].year + "/" + dataList.messages[i].month + "/" + dataList.messages[i].day + " " + dataList.messages[i].hour + ":" + dataList.messages[i].min;
			
			var cbView = require('chatBalloonView');
			var chatRow = new cbView(chatArray[i]["id"], chatArray[i]["side"], chatArray[i]["message"], chatArray[i]["image"], chatArray[i]["gender"], chatArray[i]["time"], scrollViewHeight);
			//Ti.API.info("length:" + tableViewRowData.length);
			//tableViewRowData.push(chatRow);
			tableViewRowData.unshift(chatRow);
		}
		
		//追加読込Rowの追加判定
		var nextEndNum;
		if(endNum == dataList.messages.length){
			//次に読み込むRowがない場合はaddRowは追加しない 
		}else{
			if(endNum + 10 <= dataList.messages.length){
				nextEndNum = endNum + 10;
			}else{
				nextEndNum = dataList.messages.length;
			}
			var addRow = Ti.UI.createTableViewRow({
				hasChild: false,
				height:25,
				backgroundColor: _mossGreen,
				id: "addRow",
				data: dataList,
				startNum: endNum,
				endNum: nextEndNum,
			});
			addRowLabel = Ti.UI.createLabel({
				text: "過去のトークを読み込む",
				color: _white,//_darkGray,
				font:{fontFamily: _font, fontSize:13},
			});
			addRow.add(addRowLabel);
			//tableViewRowData.push(addRow);
			tableViewRowData.unshift(addRow);
			
		}
		//Ti.API.info("LENGTH:" + tableViewRowData.length);
		tableView.data = tableViewRowData;
		//tableView.scrollToIndex(endNum - startNum, {animated:true});
	}
	
	
	sendButton.addEventListener('click', function(){
		Flurry.logEvent('ChatWindow Push SendButton');
		if( textField.value.length <= 100 ){
			//２回押されないようにsendButtonを一旦無効に
			sendButton.enabled = false;
			
			if(textField.value == "" || textField.value == null){
				
				//チャットのテキストフィールドが空かNULLだった場合
				Ti.UI.createAlertDialog({
			  		message: "メッセージが入力されていません"
			  	}).show();
			  	
			  	//sendButtonを有効に
			  	sendButton.enabled = true;
			  	
			}else{
				actInd.show();
				var message = {
					//sendfrom_list_id: Ti.App.Properties.getString('my_id'),
					app_token: Ti.App.Properties.getString('app_token'),
					sendto_list_id: sendto,
					body: textField.value
				};
				
				url = Ti.App.domain + "create_message.json";
				sendData( url, message, function( data ){
					if (data.success){
						//通信に成功したら行う処理
						Flurry.logEvent('ChatWindow Sent Chat');
						
						var json = JSON.parse(data.data);
						var time = json[0].year + "/" + json[0].month + "/" + json[0].day + " " + json[0].hour + ":" + json[0].min;
						
						var cbView = require('chatBalloonView');
						var chatRow = new cbView(json[0].sendfrom_list_id, "right", json[0].body, json[0].sendfrom_image,　json[0].sendfrom_gender, time, scrollViewHeight);
						tableViewRowData.push(chatRow);
						tableView.data = tableViewRowData;
						tableView.scrollToIndex(tableViewRowData.length - 1, {animated:true});
						textField.value ="";
						textLengthLabel.text = 0;
						
						//sendButtonを有効に
						sendButton.enabled = true;
						
					} else{
						//通信に失敗したら行う処理
						Ti.UI.createAlertDialog({
							title: 'トークが送信できませんでした',
						  	//message: data.data
						}).show();	
						
						//sendButtonを有効に
						sendButton.enabled = true;
						
					}
					actInd.hide();
				});	
			}
		}else{
			//入力された文字が100文字を超えていた場合
			Ti.UI.createAlertDialog({
				title: '入力された文字が100文字を超えているためトークが送信できませんでした',
			}).show();	
		}
	});

	//visibleTextFieldがTRUEならテキストフィールドを表示
	if(visibleTextField){
		tableView.bottom = 85;
		adView.bottom = 35;
		//Ti.API.info("bottomPosition:" + bottomPosition);
		//bottomPosition = bottomPosition + 35;
		//Ti.API.info("bottomPosition:" + bottomPosition);
		toolbarView.add(textLengthLabel);
		toolbarView.add(textField);
		toolbarView.add(sendButton);
		baseView.add(toolbarView);
		
		//非公開化ボタンの設置
		var changePrivateButton = Titanium.UI.createLabel({
			font:{fontFamily: _font, fontSize:12},
			//text:'非公開にする',
			textAlign: 'center',
			verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			borderRadius: 4,
			height: 25,
			width: 75,
			//backgroundColor: _vividPink,
			//color: _white
		});
		
		//通信してroomIDがnullでなければenabledをtrueにする
		changePrivateButton.enabled = false;
		
		self.setRightNavButton(changePrivateButton);
		
		changePrivateButton.addEventListener('click',function(){
			//ButtonのenabledがTRUEのときしか処理しない
			if(changePrivateButton.enabled == true){
				Flurry.logEvent('ChatWindow Push PrivateButton');
				consumePointDialog("private", roomID, function(data){
					if (data.success){
						var url = Ti.App.domain + "change_private_room.json?room_id=" + roomID + "&app_token=" + Ti.App.Properties.getString('app_token');
						getData(url, function( data ){
							if (data.success) {
								// 通信に成功したら行う処理
								changePrivateButton.text = "非公開中";
								changePrivateButton.backgroundColor = _lightGray;
								changePrivateButton.color = _gray;
								changePrivateButton.enabled = false;
								//alert("ルームを非公開にしました！");
								Ti.UI.createAlertDialog({
									title: 'ルームが非公開になりました',
								  	//message: data.data
								}).show();
							} else{
								// 通信に失敗したら行う処理
								//alert("通信に失敗しました");
								Ti.UI.createAlertDialog({
									title: '通信に失敗しました',
								  	//message: data.data
								}).show();
							}
						});
					}
				});
			}
		});
	}
	
	baseView.add(tableView);
	baseView.add(adView);
	self.add(baseView);
	self.add(actInd);
	return self;
}

module.exports = chatWindow;