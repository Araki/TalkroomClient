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
						
						//children[0]: ニックネーム (年齢)
						table.children[0].data[0].rows[i].children[0].text = json[i].nickname + "（" + exchangeAgeFromNumber( json[i].age ) + "）";
						
						//children[1]: プロフィールイメージ
						table.children[0].data[0].rows[i].children[1].text = json[i].profile_image1;
						
	  					//children[2]: プロフィールメッセージ
	  					table.children[0].data[0].rows[i].children[2].text = json[i].profile;
	  					
	  					//children[3]: エリア | 目的 | ログイン時間
	  					table.children[0].data[0].rows[i].children[3].text = exchangeAreaFromNumber( json[i].area ) + " | " + exchangePurposeFromNumber( json[i].purpose ) + " | " + json[i].last_logined;
						
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



//=======================================================================================
//番号から年齢に変換するファンクション
//=======================================================================================

//number: 年齢番号
function exchangeAgeFromNumber( number ) {
	
	var num = number;
	var age;
	
	switch (num) {
  		case 1: age = "18 - 19歳"; break;
  		case 2: age = "20代前半"; break;
  		case 3: age = "20代半ば"; break;
  		case 4: age = "20代後半"; break;
  		case 5: age = "30代前半"; break;
  		case 6: age = "30代半ば"; break;
  		case 7: age = "30代後半"; break;
  		case 8: age = "40代前半"; break;
  		case 9: age = "40代半ば"; break;
  		case 10: age = "40代後半"; break;
  		case 11: age = "50代以上"; break;
  		
	}
	
	return age;
	
}


//=======================================================================================
//番号から都道府県に変換するファンクション
//=======================================================================================

//number: 都道府県番号
function exchangeAreaFromNumber( number ) {
	
	var num = number;
	var area;
	
	switch (num) {
  		case 1: area = "北海道"; break;
  		case 2: area = "青森県"; break;
  		case 3: area = "岩手県"; break;
  		case 4: area = "宮城県"; break;
  		case 5: area = "秋田県"; break;
  		case 6: area = "山形県"; break;
  		case 7: area = "福島県"; break;
  		case 8: area = "茨城県"; break;
  		case 9: area = "栃木県"; break;
  		case 10: area = "群馬県"; break;
  		case 11: area = "埼玉県"; break;
  		case 12: area = "千葉県"; break;
  		case 13: area = "東京都"; break;
  		case 14: area = "神奈川県"; break;
  		case 15: area = "新潟県"; break;
  		case 16: area = "富山県"; break;
  		case 17: area = "石川県"; break;
  		case 18: area = "福井県"; break;
  		case 19: area = "山梨県"; break;
  		case 20: area = "長野県"; break;
  		case 21: area = "岐阜県"; break;
  		case 22: area = "静岡県"; break;
  		case 23: area = "愛知県"; break;
  		case 24: area = "三重県"; break;
  		case 25: area = "滋賀県"; break;
  		case 26: area = "京都府"; break;
  		case 27: area = "大阪府"; break;
  		case 28: area = "兵庫県"; break;
  		case 29: area = "奈良県"; break;
  		case 30: area = "和歌山県"; break;
  		case 31: area = "鳥取県"; break;
  		case 32: area = "島根県"; break;
  		case 33: area = "岡山県"; break;
  		case 34: area = "広島県"; break;
  		case 35: area = "山口県"; break;
  		case 36: area = "徳島県"; break;
  		case 37: area = "香川県"; break;
  		case 38: area = "愛媛県"; break;
  		case 39: area = "高知県"; break;
  		case 40: area = "福岡県"; break;
  		case 41: area = "佐賀県"; break;
  		case 42: area = "長崎県"; break;
  		case 43: area = "熊本県"; break;
  		case 44: area = "大分県"; break;
  		case 45: area = "宮崎県"; break;
  		case 46: area = "鹿児島県"; break;
  		case 47: area = "沖縄県"; break;
	}
	
	return area;
	
}


//=======================================================================================
//番号から目的に変換するファンクション
//=======================================================================================

//number: 目的番号
function exchangePurposeFromNumber( number ) {
	
	var num = number;
	var purpose;
	
	switch (num) {
  		case 1: purpose = "メル友"; break;
  		case 2: purpose = "友達・遊び相手"; break;
  		case 3: purpose = "恋人探し"; break;
  		case 4: purpose = "結婚相手"; break;
  		
	}
	
	return purpose;
	
}
