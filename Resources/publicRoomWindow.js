function publicRoomWindow() {

	var self = Titanium.UI.createWindow({  
	    title:'のぞく',
	    backgroundColor:'#fff'
	});

	var tableViewRowData = [];
	
	for (var i=0; i<10; i++){
    
    	var labelSendFromMessage = Titanium.UI.createLabel({
        	font:{fontSize:15}, 
        	textAlign:'left',
        	color:'#000',
        	top:0, 
        	right:30, 
        	width:170, 
	        height:30
	    });
    
	    var labelSendToMessage = Titanium.UI.createLabel({
	        font:{fontSize:15}, 
	        textAlign:'left',
	        color:'#000',
	        top:30, 
	        right:30, 
	        width:170, 
	        height:30
	    });
    
	    var sendFromImage = Titanium.UI.createImageView({
	    	image: 'http://profile.ak.fbcdn.net/hprofile-ak-prn2/276018_721214203_1913647351_q.jpg',
	    	top: 5,
	    	left: 5,
	    	width: 50,
	    	height: 50
	    });
   
	   var sendToImage = Titanium.UI.createImageView({
	    	image: 'http://static4.wikia.nocookie.net/__cb20120615021732/spongebob/images/6/6e/50px-5143827.png',
	    	top: 5,
	    	left: 60,
	    	width: 50,
	    	height: 50
	    });
	    
	   var row = Ti.UI.createTableViewRow({
	        height:60,
	        id: ''
	   });
   	
	   row.add(sendFromImage);
	   row.add(sendToImage);
	   row.add(labelSendFromMessage);
	   row.add(labelSendToMessage);

	   tableViewRowData.push(row);
	}

	var tableView = Titanium.UI.createTableView({
		data: tableViewRowData
	});
	
	var url = "http://localhost:3000/get_recent_rooms.json";
	getData(url, tableView);

	self.add(tableView);

	tableView.addEventListener('click', function(e) {
		Ti.API.info(e.row.id);
		//alert("ルームIDは" + e.row.id);
		tableViewRowClickHandler();
	});

	return self;
}

//=======================================================================================
//APIからデータを取ってくるファンクション
//=======================================================================================

function getData(val ,tView) {
	
	var url = val;
	var tableView = tView;
	
	//HTTPClientを生成する
	var httpClient = Titanium.Network.createHTTPClient({
		//通信が完了した場合の処理
		onload: function(e){
			//得られた情報をJSONへ変換する
			var json;
			try{
				json = JSON.parse(this.responseText);
				
				//Ti.App.accountId = parseInt(json.account_id);
				for (var i=0; i<json.length; i++){
					tableView.data[0].rows[i].children[2].text = json[i].sendfrom_message;
					tableView.data[0].rows[i].children[3].text = json[i].sendto_message;
					tableView.data[0].rows[i].id = json[i].room_id;
				}
				
			}catch (error){
				Ti.API.info('JSONを受け取ったがエラー:' + error.message);
			}
		},
	
		//通信エラーが発生した場合の処理
		onerror: function(e) {
			Ti.API.info('ネットワークエラー:' + e.error);
		},
	
		//タイムアウト（ミリ秒）
		timeout: 5000
	});

	//HTTPClientを開く
	httpClient.open("GET", url);

	//HTTPClientで通信開始
	httpClient.send();
}

//=======================================================================================
//TableViewの行がクリックされたら呼ばれる関数
//=======================================================================================
function tableViewRowClickHandler(){
	
	Ti.API.info("クリック");
	var cWindow = require('chatWindow');
	var chatWindow = new cWindow();
	
	tabGroup.activeTab.open(chatWindow);
}


module.exports = publicRoomWindow;

