function chatWindow(id, textField) {
	var roomID = id;
	var visibleTextField = textField;
	var scrollViewHeight = 0;
	
	Ti.API.info("chatWindow.js ルームID:" + roomID);
		
	//テストデータ始まり
	testJsonData = new Array();
	testJsonData[0] = {
		"side":"right", 
		"message":"こんにちは",
	 	"image":"http://profile.ak.fbcdn.net/hprofile-ak-prn2/276018_721214203_1913647351_q.jpg"
	 	 };
	testJsonData[1] = {
		"side":"left", 
		"message":"こんにちは。何されているんですか〜？今日はお肉食べたい！",
	 	"image":"http://static4.wikia.nocookie.net/__cb20120615021732/spongebob/images/6/6e/50px-5143827.png"
	 	 };
	testJsonData[2] = {
		"side":"right", 
		"message":"マジカルバナナマジカルバナナマジカルバナナマジカルバナナマジカルバナナマジカルバナナマジカルバナナマジカルバナナマジカルバナナマジカルバナナマジカルバナナマジカルバナナ",
	 	"image":"http://profile.ak.fbcdn.net/hprofile-ak-prn2/276018_721214203_1913647351_q.jpg"
	 	 };
	testJsonData[3] = {
		"side":"right", 
		"message":"あなたは何を言ってるんですか？",
	 	"image":"http://profile.ak.fbcdn.net/hprofile-ak-prn2/276018_721214203_1913647351_q.jpg"
	 	 };
	testJsonData[4] = {
		"side":"left", 
		"message":"HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello",
	 	"image":"http://static4.wikia.nocookie.net/__cb20120615021732/spongebob/images/6/6e/50px-5143827.png"
	 	 };
	testJsonData[5] = {
		"side":"left", 
		"message":"abcdefghijklmnopqrstuvvvvvvvvv",
	 	"image":"http://static4.wikia.nocookie.net/__cb20120615021732/spongebob/images/6/6e/50px-5143827.png"
	 	 };
	testJsonData[6] = {
		"side":"left", 
		"message":"abcdefghijklmnopqrstuvvvvvvvvv",
	 	"image":"http://static4.wikia.nocookie.net/__cb20120615021732/spongebob/images/6/6e/50px-5143827.png"
	 	 };
	testJsonData[7] = {
		"side":"left", 
		"message":"abcdefghijklmnopqrstuvvvvvvvvv",
	 	"image":"http://static4.wikia.nocookie.net/__cb20120615021732/spongebob/images/6/6e/50px-5143827.png"
	 	 };
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
	
	for(var i=0; i<testJsonData.length; i++){
		var cbView = require('chatBalloonView');
		var chatView = new cbView(testJsonData[i]["side"], testJsonData[i]["message"], testJsonData[i]["image"], scrollViewHeight);
		scrollView.add(chatView);
		scrollViewHeight = scrollViewHeight + chatView.height;
		
		Ti.API.info("chatView.height:" + chatView.height);
		Ti.API.info("scrollViewHeight:" + scrollViewHeight);
	}
	
	
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
			
			var messageObj = {sendfrom_list_id: 999,
							  sendto_list_id: 1000,
							  room_id: roomID, 
							  body: textField.value
			};
			
			var message = {
				//"utf8": "✓",
				'message': JSON.stringify(messageObj),
				//"commit": "Create Message"
			};
			
			
			
			var xhr = Titanium.Network.createHTTPClient();
			xhr.timeout = 10000;
	
			xhr.open('POST',"http://localhost:3000/messages.json");
			
			xhr.onload = function(){
				var json = JSON.parse(this.responseText);
				var sendMessage = json.body;
				
				Ti.UI.createAlertDialog({
		  			title: 'Send Data',
		  			message: sendMessage
		  		}).show();
		  		
		  		var cbView = require('chatBalloonView');
				var chatView = new cbView("right", sendMessage, "http://profile.ak.fbcdn.net/hprofile-ak-prn2/276018_721214203_1913647351_q.jpg", scrollViewHeight);
				scrollView.add(chatView);
				
				//Ti.API.info("scrollViewHeight:" + scrollView.toImage().height);
				Ti.API.info("scrollViewHeight:" + scrollViewHeight);
				
				scrollViewHeight = scrollViewHeight + chatView.height;
				bottomPosition = bottomPosition + chatView.height;
				//scrollView.scrollTo(0,scrollViewHeight);
				scrollView.setContentOffset({x:0, y:bottomPosition}, {animated:true});
				Ti.API.info("オンロード");
				textField.value ="";
			};
	
			xhr.send(message);
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