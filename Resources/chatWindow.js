

function chatWindow(sendto, textField) {
	//Ti.API.info("SEND FROM USER ID: " + sendfrom);
	Ti.API.info("SEND TO USER ID: " + sendto);
	
	//var otherUserID = sendto;
	var chatArray = new Array();
	
	var roomID;
	var visibleTextField = textField;
	var scrollViewHeight = 0;
	
	var url = Ti.App.domain + "get_room_message.json?sendfrom=" + Ti.App.userID + "&sendto=" + sendto;
	var methodGetData = require('commonMethods').getData;
	methodGetData(url, function( data ){
		if (data.success) {
			
			// 通信に成功したら行う処理
			var json = data.data;
			for (var i=0; i<json.length; i++){
				chatArray[i] = new Array();
				if(json[i].sendfrom_list_id == Ti.App.userID){
					chatArray[i]["side"] = "right";
				}else{
					chatArray[i]["side"] = "left";
				}
				chatArray[i]["message"] = json[i].body;
				chatArray[i]["image"] = json[i].sendfrom_image;
				chatArray[i]["time"] = json[i].year + "/" + json[i].month + "/" + json[i].day + " " + json[i].hour + ":" + json[i].min;
				
				var cbView = require('chatBalloonView');
				var chatView = new cbView(chatArray[i]["side"], chatArray[i]["message"], chatArray[i]["image"], chatArray[i]["time"], scrollViewHeight);
				scrollView.add(chatView);
				scrollViewHeight = scrollViewHeight + chatView.height;
				
				Ti.API.info("chatView.height:" + chatView.height);
				Ti.API.info("scrollViewHeight:" + scrollViewHeight);
			}
			
		} else{
			// 通信に失敗したら行う処理
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
		//bottom:35,
		showVerticalScrollIndicator: true
	});
	
	/*
	function scrollview_scroll_handler(e){
    	// e.y contains the current top y position of the contents of the scrollview
    	Ti.API.info('Scrollview contents y offset: '+e.y);
	}
	scrollView.addEventListener('scroll', scrollview_scroll_handler);
	*/
	//scrollView.scrollTo(0, 287);
	
	//scrollView.contentOffset.y = scrollView.toImage().height - 455;
	
	var baseView = Titanium.UI.createScrollView({
		contentWidth: "auto",
		contentHeight: "auto",
		top: 0,
		bottom:0,
		//showVerticalScrollIndicator: true
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
		//width:200,
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
		
		if(textField.value == "" || textField.value == null){
			
			//チャットのテキストフィールドが空かNULLだった場合
			Ti.UI.createAlertDialog({
		  		message: "メッセージが入力されていません"
		  	}).show();
		  	
		}else{
			
			var message = {
				sendfrom_list_id: Ti.App.userID,
				sendto_list_id: sendto,
				body: textField.value
			};
			
			url = Ti.App.domain + "creat_message.json";
			
			var methodSendData = require('commonMethods').sendData;
			methodSendData( url, message, function( data ){
				if (data.success){
					//通信に成功したら行う処理
					Ti.API.info("戻り値:" + data.data);
					
					var json = JSON.parse(data.data);
					var sendMessage = json.body;
					
					var cbView = require('chatBalloonView');
					var chatView = new cbView("right", sendMessage, json.sendfrom_image, scrollViewHeight);
					scrollView.add(chatView);
					
					//Ti.API.info("scrollViewHeight:" + scrollView.toImage().height);
					Ti.API.info("scrollViewHeight:" + scrollViewHeight);
					
					scrollViewHeight = scrollViewHeight + chatView.height;
					bottomPosition = bottomPosition + chatView.height;
					//scrollView.scrollTo(0,scrollViewHeight);
					scrollView.setContentOffset({x:0, y:bottomPosition}, {animated:true});
					textField.value ="";
					
					Ti.UI.createAlertDialog({
						title: 'データ送信成功',
					  	message: data.data
					}).show();
					
				} else{
					//通信に失敗したら行う処理
					Ti.UI.createAlertDialog({
						title: 'エラー',
					  	message: data.data
					}).show();	
				}
			});	
		}
	});
	
	var bottomPosition = scrollView.toImage().height - 455;
	
	scrollView.addEventListener("scroll",function(e){
                Ti.API.info("scroll y=" + e.y);
    });
	//visibleTextFieldがTRUEならテキストフィールドを表示
	if(visibleTextField){
		scrollView.bottom = 35;
		Ti.API.info("bottomPosition:" + bottomPosition);
		bottomPosition = bottomPosition + 35;
		Ti.API.info("bottomPosition:" + bottomPosition);
		toolbarView.add(textField);
		toolbarView.add(sendButton);
		baseView.add(toolbarView);
		Ti.API.info("テキストフィールドあるよ");
	}else{
		scrollView.bottom = 0;
	}
	
	baseView.add(scrollView);
	self.add(baseView);
	
	scrollView.setContentOffset({x:0, y:bottomPosition}, {animated:false});
	return self;
}

module.exports = chatWindow;