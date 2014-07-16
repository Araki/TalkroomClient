

function chatWindow(sendfrom, sendto, textField) {
	
	var chatArray = new Array();
	
	var roomID;
	var roomPublic;
	var roomMessageCount;
	
	var visibleTextField = textField;
	var scrollViewHeight = 0;
	
	var url = Ti.App.domain + "get_room_message.json?sendfrom=" + sendfrom + "&sendto=" + sendto + "&app_token=" + Ti.App.Properties.getString('app_token');
	getData(url, function( data ){
		if (data.success) {
			
			// 通信に成功したら行う処理
			Ti.API.info("json:" + data.data);
			var json = data.data;
			roomID = json.room_id;
			roomPublic = json.public;
			Ti.API.info("######PUBLIC:" + roomPublic);
			roomMessageCount = json.message_count;
			
			for (var i=json.messages.length-1; i>=0; i--){
				chatArray[i] = new Array();
				if(json.messages[i].sendfrom_list_id != Ti.App.Properties.getString('my_id') && json.messages[i].sendto_list_id != Ti.App.Properties.getString('my_id')){
					if(json.messages[i].sendfrom_list_id == sendto){
						chatArray[i]["side"] = "right";
					}else{
						chatArray[i]["side"] = "left";
					}
				}else{
					if(json.messages[i].sendfrom_list_id == Ti.App.Properties.getString('my_id')){
						chatArray[i]["side"] = "right";
					}else{
						chatArray[i]["side"] = "left";
					}
				}
				chatArray[i]["id"] = json.messages[i].sendfrom_list_id;
				chatArray[i]["message"] = json.messages[i].body;
				chatArray[i]["image"] = json.messages[i].sendfrom_image;
				chatArray[i]["time"] = json.messages[i].year + "/" + json.messages[i].month + "/" + json.messages[i].day + " " + json.messages[i].hour + ":" + json.messages[i].min;
				
				var cbView = require('chatBalloonView');
				var chatView = new cbView(chatArray[i]["id"], chatArray[i]["side"], chatArray[i]["message"], chatArray[i]["image"], chatArray[i]["time"], scrollViewHeight);
				scrollView.add(chatView);
				scrollViewHeight = scrollViewHeight + chatView.height;
				Ti.API.info("++++ScrollViewHeight:" + scrollViewHeight);
			}		
		} else{
			// 通信に失敗したら行う処理
		}
		
		//スクロールの初期表示位置を指定
		//chatができるときは420
		//chatができないときは455
		//マルチデバイス対応するために420や455を変数としたい
		if(scrollViewHeight > 420){
			scrollView.setContentOffset({x:0, y:scrollViewHeight - 420}, {animated:false});
		}
		
		if(visibleTextField){//自分がチャットできるルームである場合
			if(roomID != null){//ルームが既にある場合（メッセージが1通以上ある場合）
				if(roomPublic == true){//ルームがパブリックであるときの処理
					changePrivateButton.enabled = true;
				}else{//ルームがプライベートであるときの処理
					//ルームがプライベートのとき、「非公開ボタン」を「非公開中」などに変更して押せないようにする。
					changePrivateButton.enabled = false;
					//changePrivateButton.image = "";
					
				}
			}
		}
	});
	
	
	var self = createWindow("チャット");
	
	var scrollView = Titanium.UI.createScrollView({
		contentWidth: "auto",
		contentHeight: "auto",
		top: 0,
		showVerticalScrollIndicator: true
	});
	
	var baseView = Titanium.UI.createScrollView({
		contentWidth: "auto",
		contentHeight: "auto",
		top: 0,
		bottom:0,
		showVerticalScrollIndicator: true
	});
	
	var toolbarView = Titanium.UI.createView({
		bottom: 0,
		height: 35,
		right:0,
		left:0,
		backgroundColor: "#999"
	});
	
	var textField = Titanium.UI.createTextField({
		height:32,
		left:5,
		right:77,
		backgroundImage:'inputfield.png',
		font:{fontSize:13},
		color:'#777',
		paddingLeft:10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
	});
	
	var sendButton = Titanium.UI.createButton({
		backgroundImage:'send.png',
		backgroundSelectedImage:'send_selected.png',
		width:67,
		height:32,
		right:5
	});
	
	sendButton.addEventListener('click', function(){
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
					Ti.API.info("戻り値:" + data.data);
					
					var json = JSON.parse(data.data);
					var time = json[0].year + "/" + json[0].month + "/" + json[0].day + " " + json[0].hour + ":" + json[0].min;
					
					var cbView = require('chatBalloonView');
					Ti.API.info("json[0].body:" + json[0].body);
					Ti.API.info("json[0].sendfrom_image:" + json[0].sendfrom_image);
					Ti.API.info("％％％ScrollViewHeight:" + scrollViewHeight);
					Ti.API.info("％％％Time:" + time);
					var chatView = new cbView("right", json[0].body, json[0].sendfrom_image,　time, scrollViewHeight);
					scrollView.add(chatView);
					
					//Ti.API.info("scrollViewHeight:" + scrollView.toImage().height);
					Ti.API.info("scrollViewHeight:" + scrollViewHeight);
					
					scrollViewHeight = scrollViewHeight + chatView.height;
					bottomPosition = bottomPosition + chatView.height;
					
					//スクロールして表示する
					if(scrollViewHeight > 420){
						scrollView.setContentOffset({x:0, y:scrollViewHeight - 420}, {animated:true});
						Ti.API.info("++++ScrollViewHeight:" + scrollViewHeight);
					}
					//scrollView.setContentOffset({x:0, y:bottomPosition}, {animated:true});
					textField.value ="";
					
					Ti.UI.createAlertDialog({
						title: 'データ送信成功',
					  	message: data.data
					}).show();
					
					//sendButtonを有効に
					sendButton.enabled = true;
					
				} else{
					//通信に失敗したら行う処理
					Ti.UI.createAlertDialog({
						title: 'エラー',
					  	message: data.data
					}).show();	
					
					//sendButtonを有効に
					sendButton.enabled = true;
					
				}
			});	
		}
	});
	
	var bottomPosition = scrollView.toImage().height - 455;
	scrollView.addEventListener("scroll",function(e){
               // Ti.API.info("scroll y=" + e.y);
    });
    
	//visibleTextFieldがTRUEならテキストフィールドを表示
	if(visibleTextField){
		scrollView.bottom = 35;
		//Ti.API.info("bottomPosition:" + bottomPosition);
		bottomPosition = bottomPosition + 35;
		//Ti.API.info("bottomPosition:" + bottomPosition);
		toolbarView.add(textField);
		toolbarView.add(sendButton);
		baseView.add(toolbarView);
		
		//非公開化ボタンの設置
		var changePrivateButton = Titanium.UI.createButton({
			title:'非公開'
		});
		
		//通信してroomIDがnullでなければenabledをtrueにする
		changePrivateButton.enabled = false;
		
		self.setRightNavButton(changePrivateButton);
		changePrivateButton.addEventListener('click',function(){
			consumePointDialog("private", function(data){
				if (data.success){
					var url = Ti.App.domain + "change_private_room.json?room_id=" + roomID + "&app_token=" + Ti.App.Properties.getString('app_token');
					getData(url, function( data ){
						if (data.success) {
							// 通信に成功したら行う処理
							changePrivateButton.enabled = false;
							//changePrivateButton.image = "";//「非公開中」などのボタンに変更する
							alert("ルームを非公開にしました！");
						} else{
							// 通信に失敗したら行う処理
							alert("通信に失敗しました");
						}
					});
				}
			});
		});
	}else{
		scrollView.bottom = 0;
	}
	
	baseView.add(scrollView);
	self.add(baseView);
	
	return self;
}

module.exports = chatWindow;