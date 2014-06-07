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
	//SSL通信
	//xhr.validatesSecureCertificate = false;
	
	//HTTPClientを開く
	xhr.open("GET", url);
	
	//通信が完了した場合の処理
	xhr.onload = function(){
		Ti.API.info("パース前：" + this.responseText);
		Ti.API.info("パース後：" + JSON.parse(this.responseText));
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
//pickerViewを表示するファンクション
//=======================================================================================
exports.createPickerView = function( data, tf ){
	
	var dataList = data;
	var textField = tf;
	//var customItem = selectItem;

	var self = Titanium.UI.createView({
		height: 251,
		bottom: -251
	});
	
	var doneButton = Titanium.UI.createButton({
		title: '完了',
		style: Titanium.UI.iPhone.SystemButtonStyle.DONE
	});

	var spacer = Titanium.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var toolbar = Titanium.UI.iOS.createToolbar({
		top: 0,
		items: [spacer, doneButton]
	});

	var picker = Ti.UI.createPicker({
		top: 43
	});
	picker.selectionIndicator = true;
	
	picker.add(dataList);
	
	//Pickerのツールバーの完了ボタンが押された時の挙動
	doneButton.addEventListener('click', function(e){
		pickerSlideOut(Ti.UI.currentWindow, self);
	});
	
	//Pickerの選択が変わった時の挙動
	picker.addEventListener('change', function(e){
		textField.value = e.row.title;
		textField.customItem = e.row.custom_item;
	});

	self.add(toolbar);
	self.add(picker);
	
	return self;
};



//=======================================================================================
//pickerViewがスライドアウトするアニメーションファンクション
//=======================================================================================

function pickerSlideOut(win, view){
	var view = view;
	var win = win;
	
	view.animate({
		bottom: -251,
		duration: 300
	}, function(){
		//win.remove(view);
	});
}



//=======================================================================================
//pickerViewがスライドインするアニメーションファンクション
//=======================================================================================

exports.pickerSlideIn = function( win, view　){
	var view = view;
	var win = win;
	win.add(view);
	
	view.animate({
		bottom: 0,
		duration: 300
	});	
};


//=======================================================================================
//番号からテキストに変換するファンクション
//=======================================================================================

exports.exchangeFromNumber = function( number, type ) {
	
	var dataArray = this.returnArray(type);
	return dataArray[number];
	
};


//=======================================================================================
//配列を返すファンクション
//=======================================================================================
exports.returnArray = function ( arrayName ) {
	
	var array = new Array();
	
	switch( arrayName ){
		case "age":
			array[0] = 'すべて';
			array[1] = '18〜19歳';
			array[2] = '20代前半';
			array[3] = '20代半ば';
			array[4] = '20代後半';
			array[5] = '30代前半';
			array[6] = '30代半ば';
			array[7] = '30代後半';
			array[8] = '40代前半';
			array[9] = '40代半ば';
			array[10] = '40代後半';
			array[11] = '50代以上';
			break;
			
		case "area":
			array[0] = 'すべて';
			array[1] = '北海道';
			array[2] = '青森県';
			array[3] = '岩手県';
			array[4] = '宮城県';
			array[5] = '秋田県';
			array[6] = '山形県';
			array[7] = '福島県';
			array[8] = '茨城県';
			array[9] = '栃木県';
			array[10] = '群馬県';
			array[11] = '埼玉県';
			array[12] = '千葉県';
			array[13] = '東京都';
			array[14] = '神奈川県';
			array[15] = '新潟県';
			array[16] = '富山県';
			array[17] = '石川県';
			array[18] = '福井県';
			array[19] = '山梨県';
			array[20] = '長野県';
			array[21] = '岐阜県';
			array[22] = '静岡県';
			array[23] = '愛知県';
			array[24] = '三重県';
			array[25] = '滋賀県';
			array[26] = '京都府';
			array[27] = '大阪府';
			array[28] = '兵庫県';
			array[29] = '奈良県';
			array[30] = '和歌山県';
			array[31] = '鳥取県';
			array[32] = '島根県';
			array[33] = '岡山県';
			array[34] = '広島県';
			array[35] = '山口県';
			array[36] = '徳島県';
			array[37] = '香川県';
			array[38] = '愛媛県';
			array[39] = '高知県';
			array[40] = '福岡県';
			array[41] = '佐賀県';
			array[42] = '長崎県';
			array[43] = '熊本県';
			array[44] = '大分県';
			array[45] = '宮崎県';
			array[46] = '鹿児島県';
			array[47] = '沖縄県';
			break;
			
		case "purpose":
			array[0] = 'すべて';
			array[1] = 'メル友探し';
			array[2] = '友達・遊び相手探し';
			array[3] = '恋人探し';
			array[4] = '結婚相手探し';
			break;
		
		case "tall":
			array[1] = "〜149cm";
  			array[2] = "150〜154cm";
  			array[3] = "155〜159cm";
  			array[4] = "160〜164cm";
  			array[5] = "165〜169cm";
  			array[6] = "170〜174cm";
  			array[7] = "175〜179cm";
  			array[8] = "180〜184cm";
  			array[9] = "185〜189cm";
  			array[10] = "190cm〜";
  			array[11] = "ひみつ";
  			break;
  		
  		case "blood":
  			array[1] = "ひみつ";
  			array[2] = "A型";
			array[3] = "B型";
  			array[4] = "O型";
  			array[5] = "AB型";
  			break;
  			
  		case "style":
	  		array[1] = "スリム";
	  		array[2] = "やや細め";
	  		array[3] = "普通";
	  		array[4] = "筋肉質";
	  		array[5] = "グラマー";
	  		array[6] = "ややぽっちゃり";
	  		array[7] = "太め";	
	  		array[8] = "ひみつ";
	  		break;
	  		
	  	case "holiday":
		  	array[1] = "土日";
	  		array[2] = "平日";
	  		array[3] = "不定期";
	  		array[4] = "その他";
	  		break;
	  		
	  	case "alcohol":
		  	array[1] = "未成年なので飲めない";
	  		array[2] = "飲まない";
	  		array[3] = "飲む";
	  		array[4] = "ときどき飲む";
	  		array[5] = "ひみつ"; 
	  		break;
	  	
	  	case "cigarette":
		  	array[1] = "未成年なので吸えない";
	  		array[2] = "吸わない";
	  		array[3] = "吸う";
	  		array[4] = "ときどき吸う";
	  		array[5] = "ひみつ"; 
	  		break;	
	  		
	  	case "salary":
		  	array[1] = "200万円未満";
	  		array[2] = "200〜400万円";
	  		array[3] = "400〜600万円";
	  		array[4] = "600〜800万円";
	  		array[5] = "800〜1,000万円";
	  		array[6] = "1,000〜1,500万円";
	  		array[7] = "1,500〜2,000万円";
	  		array[8] = "2,000〜3,000万円";
	  		array[9] = "3,000万円以上";
	  		array[10] = "ひみつ";
	  		break;
	}
	return array;
	
};