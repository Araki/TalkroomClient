//=======================================================================================
//サーバーからデータを取ってくるファンクション
//=======================================================================================

//val: URLを指定
//callback: 呼び出し側で指定するcallback関数

exports.getData = function(val ,callback) {
	
	var url = val;
		
	//HTTPClientを生成する
	var xhr = Titanium.Network.createHTTPClient();
	xhr.timeout = 10000;
	
	//HTTPClientを開く
	xhr.open("GET", url);
	
	//通信が完了した場合の処理
	xhr.onload = function(){
		callback({
			success: true,
			data: JSON.parse(this.responseText)
		});
	};
	
	//エラー発生時の処理
	xhr.onerror = function(e){
		callback({
			success: false,
			data: e
		});
	};

	//HTTPClientで通信開始
	xhr.send();
};



//=======================================================================================
//サーバーにデータを送るファンクション
//=======================================================================================

//val: URLを指定
//data: 送信するデータ
//callback: 呼び出し側で指定するcallback関数

exports.sendData = function( val, data, callback ){
	
	var url = val;
	var sendData = data;
	
	var xhr = Titanium.Network.createHTTPClient();
	xhr.timeout = 10000;
		
	xhr.open('POST', url);
		
	xhr.onload = function(){
		Ti.API.info("返って来たデータ:" + this.responseText);
		callback({
			success: true,
			data: this.responseText
		});
	};
	
	xhr.onerror = function(e){
		callback({
			success: false,
			data: e
		});
	};
	
	xhr.send( sendData );
};



//=======================================================================================
//番号から年齢に変換するファンクション
//=======================================================================================

//number: 年齢番号
exports.exchangeAgeFromNumber = function( number ) {
	
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
	
};


//=======================================================================================
//番号から都道府県に変換するファンクション
//=======================================================================================

//number: 都道府県番号
exports.exchangeAreaFromNumber = function( number ) {
	
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
	
};


//=======================================================================================
//番号から目的に変換するファンクション
//=======================================================================================

//number: 目的番号
exports.exchangePurposeFromNumber = function ( number ) {
	
	var num = number;
	var purpose;
	
	switch (num) {
  		case 1: purpose = "メル友"; break;
  		case 2: purpose = "友達・遊び相手"; break;
  		case 3: purpose = "恋人探し"; break;
  		case 4: purpose = "結婚相手"; break;
  		
	}
	
	return purpose;
	
};
