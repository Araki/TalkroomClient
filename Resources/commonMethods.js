//=======================================================================================
//APIからデータを取ってくるファンクション
//=======================================================================================

//callWindow: 呼び出したウィンドウ名
//val: URLを指定
//tView: TableViewを指定
exports.getData = function(callWindow, val ,tView) {
	
	var winName = callWindow;
	var url = val;
	var table = tView;
	
	//HTTPClientを生成する
	var httpClient = Titanium.Network.createHTTPClient({
		//通信が完了した場合の処理
		onload: function(e){
			//得られた情報をJSONへ変換する
			var json;
			try{
				json = JSON.parse(this.responseText);
				//Ti.API.info("JSON:" + json);
				
				//Ti.App.accountId = parseInt(json.account_id);
				if (winName == "publicRoomWindow"){
					for (var i=0; i<json.length; i++){
						//Ti.API.info("JSON:" + json[i].room_id);
						table.data[0].rows[i].children[2].text = json[i].sendfrom_message;
						table.data[0].rows[i].children[3].text = json[i].sendto_message;
						table.data[0].rows[i].id = json[i].room_id;
					}
				}
				else if (winName == "searchWindow"){
					for (var i=0; i<json.length; i++){
						Ti.API.info("JSON:" + json[i].id);
						//searchWindowの場合tableに入ってるのはWindow
						table.children[0].data[0].rows[i].children[0].text = json[i].nickname;
						
					}
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
};

