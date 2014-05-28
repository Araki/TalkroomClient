

function chatWindow(sendfrom, sendto, textField) {
	
	var chatArray = new Array();
	
	var roomID;
	var visibleTextField = textField;
	var scrollViewHeight = 0;
	
	var url = Ti.App.domain + "get_room_message.json?sendfrom=" + sendfrom + "&sendto=" + sendto + "&app_token=" + Ti.App.Properties.getString('app_token');
	var methodGetData = require('commonMethods').getData;
	methodGetData(url, function( data ){
		if (data.success) {
			
			// 通信に成功したら行う処理
			var json = data.data;
			for (var i=json.length-1; i>=0; i--){
				chatArray[i] = new Array();
				if(json[i].sendfrom_list_id != Ti.App.Properties.getString('my_id') && json[i].sendto_list_id != Ti.App.Properties.getString('my_id')){
					if(json[i].sendfrom_list_id == sendto){
						chatArray[i]["side"] = "right";
					}else{
						chatArray[i]["side"] = "left";
					}
				}else{
					if(json[i].sendfrom_list_id == Ti.App.Properties.getString('my_id')){
						chatArray[i]["side"] = "right";
					}else{
						chatArray[i]["side"] = "left";
					}
				}
				chatArray[i]["message"] = json[i].body;
				chatArray[i]["image"] = json[i].sendfrom_image;
				chatArray[i]["time"] = json[i].year + "/" + json[i].month + "/" + json[i].day + " " + json[i].hour + ":" + json[i].min;
				
				var cbView = require('chatBalloonView');
				var chatView = new cbView(chatArray[i]["side"], chatArray[i]["message"], chatArray[i]["image"], chatArray[i]["time"], scrollViewHeight);
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
	});
		
	//テストデータ終わり
	
	
	var self = Titanium.UI.createWindow({  
	    title:'チャット',
	    backgroundColor:'#fff'
	});
	
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
			
			//入力されたチャットをサーバーに送信
			var methodSendData = require('commonMethods').sendData;
			methodSendData( url, message, function( data ){
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
	}else{
		scrollView.bottom = 0;
	}
	
	baseView.add(scrollView);
	self.add(baseView);
	
	return self;
}

module.exports = chatWindow;