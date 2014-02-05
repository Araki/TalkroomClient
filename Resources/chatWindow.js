function chatWindow() {
	
	var chatViewHeight = 0;
	
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
		bottom: 0,
		showVerticalScrollIndicator: true
	});
	
	for(var i=0; i<testJsonData.length; i++){
		var cbView = require('chatBalloonView');
		var chatView = new cbView(testJsonData[i]["side"], testJsonData[i]["message"], testJsonData[i]["image"], chatViewHeight);
		scrollView.add(chatView);
		chatViewHeight = chatViewHeight + chatView.height;
	}
	
	Ti.API.info("scrollViewHeight:" + scrollView.toImage().height);
	Ti.API.info("chatViewHeight:" + chatViewHeight);
	
	/*
	function scrollview_scroll_handler(e){
    	// e.y contains the current top y position of the contents of the scrollview
    	Ti.API.info('Scrollview contents y offset: '+e.y);
	}
	scrollView.addEventListener('scroll', scrollview_scroll_handler);
	*/
	
	scrollView.setContentOffset({x:0, y:scrollView.toImage().height - 455}, {animated:true});
	//scrollView.contentOffset.y = scrollView.toImage().height - 455;
	
	self.add(scrollView);

	return self;
}

module.exports = chatWindow;