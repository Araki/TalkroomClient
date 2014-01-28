// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//==================================================================
// 「のぞく」ウィンドウ
//==================================================================

var win1 = Titanium.UI.createWindow({  
    title:'のぞく',
    backgroundColor:'#fff'
});

var tableViewRowData = [];
for (var i=0; i<10; i++){
	
	var labelName = Titanium.UI.createLabel({
        font:{fontSize:15,fontWeight:'bold'}, 
        textAlign:'left',
        color:'#000',
        top:0, 
        left:30, 
        width:40, 
        height:60
    });
    
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
        height:60
   });
   
   row.add(labelName);
   row.add(labelSendFromMessage);
   row.add(labelSendToMessage);
   row.add(sendFromImage);
   row.add(sendToImage);
   tableViewRowData.push(row);
}

var url = "http://localhost:3000/get_recent_rooms.json";
getData(url);

var tableView = Titanium.UI.createTableView({
	data: tableViewRowData
});
/*
setTimeout(function(){
        section = tableView.data[0];
        Ti.API.info("rowCount:" + section.rowCount);
        Ti.API.info("row1:" + section.rows[0].children[0].text);
        Ti.API.info("row2:" + tableView.data[0].rows[1].children[0].text);
    }
    , 1000);
*/
Ti.API.info("======================================================");

win1.add(tableView);

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'のぞく',
    window:win1
});


//==================================================================
// 「探す」ウィンドウ
//==================================================================
var searchWindow;
var textField;
var pickerView;
var picker;
var cancelButton;
var doneButton;

createSearchWindow = function() {
	//外部ファイルの読み込み
	var sWin = require('searchWindow').searchWindow;
	searchWindow = new sWin();
	
	var tField = require('searchWindow').textField;
	textField = new tField();
	
	var pView = require('pickerView').pickerView;
	pickerView = new pView();
	
	var p = require('pickerView').picker;
	picker = new p();
	
	var cButton = require('pickerView').cancelButton;
	cancelButton = new cButton();
	
	var dButton = require('pickerView').doneButton;
	doneButton = new dButton();

	//ボタンをタップしたときの挙動
	picker.addEventListener('change', function(e){
		textField.value = e.row.custom_item;
		//Ti.API.info("You selected row: "+e.row.custom_item);
	});

	cancelButton.addEventListener('click', function(e){
		Ti.API.info("clicked");
		searchWindow.remove(pickerView);
		pickerView = null;
	});

	textField.addEventListener('click', function(){
		searchWindow.add(pickerView);
	});

};

createSearchWindow();

var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'探す',
    window:searchWindow
});



//==================================================================
// 「トーク」ウィンドウ
//==================================================================
var win3 = Titanium.UI.createWindow({  
    title:'トーク',
    backgroundColor:'#fff'
});
var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'トーク',
    window:win3
});



//==================================================================
// 「設定」ウィンドウ
//==================================================================
var win4 = Titanium.UI.createWindow({  
    title:'設定',
    backgroundColor:'#fff'
});
var tab4 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'設定',
    window:win4
});

//=======================================================================================
//APIからデータを取ってくるファンクション
//=======================================================================================

function getData(val) {
	
	var url = val;
	
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
					Ti.API.info('room_id:' + json[i].room_id);
					Ti.API.info('updated_at:' + json[i].updated_at);
					Ti.API.info('sendfrom_image:' + json[i].sendfrom_image);
					Ti.API.info('sendfrom_message:' + json[i].sendfrom_message);
					Ti.API.info('sendto_image:' + json[i].sendto_image);
					Ti.API.info('sendto_message:' + json[i].sendto_message);
					tableView.data[0].rows[i].children[0].text = json[i].room_id;
					tableView.data[0].rows[i].children[1].text = json[i].sendfrom_message;
					tableView.data[0].rows[i].children[2].text = json[i].sendto_message;
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


//==================================================================
//  add tabs
//==================================================================
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);

// open tab group
tabGroup.open();
