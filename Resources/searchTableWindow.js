var tableView;
var dataList = [];
var talkedList = [];
var tableViewRowData = [];
var actInd = createActInd(); 

function searchTableWindow() {
	var self = createWindow("ユーザー");
	//var sWindow = require('searchWindow');
	//var searchWindow = new sWindow();
	var searchView = createSearchView( self );
	tableView = Titanium.UI.createTableView({top:0, bottom:50, separatorStyle:'NONE'});
	
	tableView.addEventListener('click', function(e) {
		actInd.show();
		if(e.source.id == "row_button") {
			
			var alertDialog = Ti.UI.createAlertDialog({
			  	message: e.row.nickname + 'さんに\n「こんにちは」と\nトークを送りますか？',
			  	buttonNames: ['はい', 'いいえ'],
			  	cancel: 1
			});
			
			alertDialog.addEventListener('click',function(s){
				if(s.index == 0){
					
					var message = {
						app_token: Ti.App.Properties.getString('app_token'),
						sendto_list_id: e.source.getParent().id,
						body: "こんにちは"
					};
					
					url = Ti.App.domain + "create_message.json";
					sendData( url, message, function( data ){
						if (data.success){
							//通信に成功したら行う処理
							Ti.UI.createAlertDialog({
								title: 'トークを送信しました'
							}).show();
							
							e.row.children[4].enabled = false;
							e.row.children[4].backgroundImage = 'images/hi_disable.png';
						} else{
							//通信に失敗したら行う処理
							Ti.UI.createAlertDialog({
								title: 'トークが送信できませんでした'
							}).show();							
						}
						
					});
				}
			});
			
			alertDialog.show();
		}else if(e.row.id == "addRow"){
			tableViewRowData.pop();
			createView(e.row.startNum, e.row.endNum);
		}else{
			Flurry.logEvent('SearchTableWindow Go To UserProfile');
			var userID = e.row.id;
			var upWindow = require('userProfileWindow');
			var userProfileWindow = new upWindow(userID);
			tabGroup.activeTab.open( userProfileWindow );
		}
		actInd.hide();
	});	
	
	var showSearchViewButton = Titanium.UI.createLabel({
			font:{fontFamily: _font, fontSize:16},
			text:'検索',
			textAlign: 'center',
			verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			borderRadius: 4,
			height: 25,
			width: 60,
			backgroundColor: _mossGreen,
			color: _white
	});
	self.rightNavButton = showSearchViewButton;
	
	showSearchViewButton.addEventListener('click', function(){
		//tabGroup.activeTab.open(　searchWindow　);
		self.add(searchView);
	});
	
	loadTableView();
	
	var adView = createBannerAdView();
	
	self.add(tableView);
	self.add(adView);
	self.add(actInd);
	return self;
}

module.exports = searchTableWindow;

//############################################################
//############################################################
//############################################################
//############################################################
//ファンクション
//############################################################
//############################################################
//############################################################
//############################################################

function loadTableView(){	
	actInd.show();
	var url = Ti.App.domain + "get_users_list.json?age=" + 
				  Ti.App.Properties.getString('searchAge') +
				  "&area=" +
				  Ti.App.Properties.getString('searchArea') +
				  "&gender=" +
				  Ti.App.Properties.getString('searchGender') +
				  //"&purpose=" +
				  //Ti.App.Properties.getString('searchPurpose')  +
				  "&app_token=" +
				  Ti.App.Properties.getString('app_token');
			  
	getData(url, function( data ){
		
		if (data.success) {
			// 通信に成功したら行う処理
			dataList = data.data;
			if (dataList.length == 0){
				var row = Ti.UI.createTableViewRow({
			    	hasChild: false,
			        height:'100%',
			        backgroundColor: _white
			    });
			    
			    var label = Ti.UI.createLabel({
			    	font:{fontFamily: _font, fontSize:13},
			    	textAlign: 'center',
			    	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			    	color: _darkGray,
			        text: "1件も見つかりませんでした"
			    });
				row.add(label);
				tableViewRowData.push(row);
			}else{
				if (dataList.length >= 10){
					createView(0, 10);
				}else{
					createView(0, dataList.length);
				}
			}
		} else{
			// 通信に失敗したら行う処理
			Ti.UI.createAlertDialog({
				title: '通信に失敗しました'
			}).show();
		}
		tableView.data = tableViewRowData;
		
		//アクティビティインジケーターを非表示
		actInd.hide();	
	});
}

function createView(startNum, endNum){
	actInd.show();
	//Ti.API.info("####addRow###");
	var url = Ti.App.domain + "get_talked_users.json?app_token=" + Ti.App.Properties.getString('app_token') + "&ids=";
	for (var i=startNum; i<endNum; i++){
		if (i == 0){
			url = url + dataList[i].id;
		}else{
			//Ti.API.info("#####i:" + i);
			url = url + "," + dataList[i].id;
		}
	}
	getData(url, function( data ){
		if (data.success) {
			talkedList = data.data;
			//Ti.API.info("talkedList.length: " + talkedList.length);
			pushTableView();
			actInd.hide();
		}else{
			
		}
	});
	
	function pushTableView(){
		for (var i=startNum; i<endNum; i++){
			var nickNameLabel = Titanium.UI.createLabel({
		    	font:{fontFamily: _font, fontSize:13, fontWeight:"bold"},
		    	textAlign: 'left',
		    	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		    	top: 5, 
		    	left: 85, 
		    	right: 0,
		        height: "auto",
		        text: dataList[i].nickname + "（" + exchangeFromNumber( dataList[i].age, "age" ) + "）", 
		    });
		    
		    var profileImage = Titanium.UI.createImageView({
		    	top: 5,
		    	left: 5,
		    	width: 70,
		    	height: 70,
		    	borderRadius:7,
		    	borderWidth:2,
		    	borderColor: _white,
		    	image: dataList[i].profile_image1
		    });
		    
		    if(dataList[i].gender =='male'){
		    	nickNameLabel.color = _darkBlue;
		    	profileImage.borderColor = _darkBlue;
		    }else if(dataList[i].gender == 'female'){
		    	nickNameLabel.color = _vividPink;
		    	profileImage.borderColor = _vividPink;
		    }
		    
		    var profileLabel = Titanium.UI.createLabel({
		    	font:{fontFamily: _font, fontSize:12}, 
		    	textAlign:'left',
		    	verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		    	color: _darkGray,
		    	top: 25, 
		    	bottom: 20,
		    	left: 85, 
		    	right: 45,
		        text: dataList[i].profile
		    });
		    
		    var infoLabel = Titanium.UI.createLabel({
		    	font:{fontFamily: _font, fontSize:10}, 
		    	textAlign:'right',
		    	verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
		    	color:_darkGray,
		    	bottom: 5, 
		    	right: 5, 
		    	left: 85, 
		        height: "auto",
		        text: exchangeFromNumber( dataList[i].area, "area" ) +  " | " + dataList[i].last_logined
		    }); 
		    
		    var talkButton = Titanium.UI.createButton({
		    	center:{y:40},
		    	right: 5,
		    	width: 35,
		    	height: 35,
		    	id: "row_button"
		    });
		    //Ti.API.info("dataList[i].id: " + dataList[i].id);
		    //Ti.API.info("talkedList.length: " + talkedList.length);

		    var flag = false;
		    for(var j=0; j<talkedList.length; j++){
		    	//Ti.API.info("talkedList.id: " + talkedList[j].id);
		    	//Ti.API.info("dataList[i]: " + dataList[i].id);
		    	if(talkedList[j].id == dataList[i].id){
		    		flag = true;
		    	}
		    }
		    if ( flag == true){
		    	talkButton.enabled = false;
				talkButton.backgroundImage = 'images/hi_disable.png';
			}else{
				talkButton.enabled = true;
				talkButton.backgroundImage = 'images/hi_enable.png';
			}
		    
		    var row = Ti.UI.createTableViewRow({
		    	//hasChild: true,
		        height:80,
		        id:dataList[i].id,
		        nickname: dataList[i].nickname
		    });
		    
		    if(i%2 == 0){
		   		row.backgroundColor = _white;
		   	}else{
		   		row.backgroundColor = _whiteGray;
		   	}
			
			row.add(nickNameLabel);
			row.add(profileImage);
			row.add(profileLabel);
			row.add(infoLabel);
			row.add(talkButton);
			tableViewRowData.push(row);
		}
		
		//追加読込Rowの追加判定
		var nextEndNum;
		if(endNum == dataList.length){
			//次に読み込むRowがない場合はaddRowは追加しない 
		}else{
			if(endNum + 10 <= dataList.length){
				nextEndNum = endNum + 10;
			}else{
				nextEndNum = dataList.length;
			}
			var addRow = Ti.UI.createTableViewRow({
				hasChild: false,
				height:25,
				backgroundColor: _mossGreen,
				id: "addRow",
				data: dataList,
				startNum: endNum,
				endNum: nextEndNum,
			});
			addRowLabel = Ti.UI.createLabel({
				text: "次の結果を読み込む",
				color: _white,//_darkGray,
				font:{fontFamily: _font, fontSize:13},
			});
			addRow.add(addRowLabel);
			tableViewRowData.push(addRow);
		}
		
		tableView.data = tableViewRowData;
		
	}
	
}

function createRow(nickName, age, iconImage, profile, gender, info, userID, backgroundType, talked){
	
	var nickNameLabel = Titanium.UI.createLabel({
    	font:{fontFamily: _font, fontSize:13, fontWeight:"bold"},
    	textAlign: 'left',
    	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
    	top: 5, 
    	left: 85, 
    	right: 0,
        height: "auto",
        text: nickName + "（" + age + "）", 
    });
    
    var profileImage = Titanium.UI.createImageView({
    	top: 5,
    	left: 5,
    	width: 70,
    	height: 70,
    	borderRadius:7,
    	borderWidth:2,
    	borderColor: _white,
    	image: iconImage
    });
    
    if(gender =='male'){
    	nickNameLabel.color = _darkBlue;
    	profileImage.borderColor = _darkBlue;
    }else if(gender == 'female'){
    	nickNameLabel.color = _vividPink;
    	profileImage.borderColor = _vividPink;
    }
    
    var profileLabel = Titanium.UI.createLabel({
    	font:{fontFamily: _font, fontSize:12}, 
    	textAlign:'left',
    	verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
    	color: _darkGray,
    	top: 25, 
    	bottom: 20,
    	left: 85, 
    	right: 45,
        text: profile
    });
    
    var infoLabel = Titanium.UI.createLabel({
    	font:{fontFamily: _font, fontSize:10}, 
    	textAlign:'right',
    	verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
    	color:_darkGray,
    	bottom: 5, 
    	right: 5, 
    	left: 85, 
        height: "auto",
        text: info
    }); 
    
    var talkButton = Titanium.UI.createButton({
    	center:{y:40},
    	right: 5,
    	width: 35,
    	height: 35,
    	id: "row_button"
    });
    if (talked == false){
    	talkButton.enabled = true;
		talkButton.backgroundImage = 'images/hi_enable.png';
	}else{
		talkButton.enabled = false;
		talkButton.backgroundImage = 'images/hi_disable.png';
	}
    
    var row = Ti.UI.createTableViewRow({
    	//hasChild: true,
        height:80,
        id:userID,
        nickname: nickName
    });
    
    if(backgroundType%2 == 0){
   		row.backgroundColor = _white;
   	}else{
   		row.backgroundColor = _whiteGray;
   	}
	
	row.add(nickNameLabel);
	row.add(profileImage);
	row.add(profileLabel);
	row.add(infoLabel);
	row.add(talkButton);
	
	return row;
}

function createSearchView( win ){
	var view = Titanium.UI.createView({
		top: 0,
		bottom: 0,
		backgroundColor: _white
	});
	var ageData = [];
	var areaData = [];
	var purposeData = [];
	
	var ageArray = returnArray("age");
	for (var i=0; i<ageArray.length; i++){
		if(i == 0){
			ageData[i] = Ti.UI.createPickerRow({title:ageArray[i],custom_item:''});
		}else{
			ageData[i] = Ti.UI.createPickerRow({title:ageArray[i],custom_item:i});
		}
	}
	
	var areaArray = returnArray("area");
	for (var i=0; i<areaArray.length; i++){
		if(i == 0){
			areaData[i] = Ti.UI.createPickerRow({title:areaArray[i],custom_item:''});
		}else{
			areaData[i] = Ti.UI.createPickerRow({title:areaArray[i],custom_item:i});
		}
	}
	/*
	var purposeArray = returnArray("purpose");
	for (var i=0; i<purposeArray.length; i++){
		if(i == 0){
			purposeData[i] = Ti.UI.createPickerRow({title:purposeArray[i],custom_item:''});
		}else{
			purposeData[i] = Ti.UI.createPickerRow({title:purposeArray[i],custom_item:i});
		}
	}
	*/
	
	//=========================================
	//gender要素の定義
	//=========================================
	var genderLabel = Titanium.UI.createLabel({
		text: '性別',
		top: 30,
		left: 30,
		width: 60,
		height: 30,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 17 }
	});
	
	var genderButtonBar = Titanium.UI.iOS.createTabbedBar({
		labels:['両方', '男性のみ', '女性のみ'], 
		backgroundColor:_darkBlue,
	    color: _darkBlue,
		top:30,
	    right: 30,
		left: 100,
		height: 30,
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		index:0 
	});
	
	var genderValue = Ti.App.Properties.getString('searchGender');
	genderButtonBar.addEventListener('click', function(e){
		switch (e.index){
	   		case 0:
				genderValue = "";
		    	break;
		    
		  	case 1:
				genderValue = "male";
		    	break;
		    
		  	case 2:
	   			genderValue = "female";
		    	break;
		}
	});
	
	
	//=========================================
	//age系要素の定義
	//=========================================
	var ageLabel = Titanium.UI.createLabel({
		text: '年齢',
		top: 80,
		left: 30,
		width: 60,
		height: 30,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 17 }
	});
	
	//var ageValue;
	//if (Ti.App.Properties.getString('searchAge') == "" || Ti.App.Properties.getString('searchAge') == null){ageValue = "すべて";}
	//else{ageValue = ageArray[Ti.App.Properties.getString('searchAge')];}
	var ageTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		font:{fontFamily: _font, fontSize: 17},
		//value: ageValue,//"すべて",
		//customItem: Ti.App.Properties.getString('searchAge'),//"",
		textAlign: "center",
		top: 80,
		right: 30,
		left: 100,
		height: 30,
		enabled: false,
		color: _darkBlue,
		keyboardToolbar: false,
		borderRadius: 10,
		borderColor: _darkBlue
	});
	
	//テキストフィールドがタップされたときの挙動
	ageTextField.addEventListener('click', function(){
		switch (Titanium.Platform.osname){
			case 'iphone':
				
				var agePickerView = createPickerView( ageData, ageTextField, view );
				pickerSlideIn( view, agePickerView );
    			break;
    			
    		case 'android':
    			break;
		}
		
	});
	
	//=========================================
	//area系要素の定義
	//=========================================
	var areaLabel = Titanium.UI.createLabel({
		text: 'エリア',
		top: 130,
		left: 30,
		width: 60,
		height: 30,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 17 }
	});
	
	//var areaValue;
	//if (Ti.App.Properties.getString('searchArea') == "" || Ti.App.Properties.getString('searchAge') == null){areaValue = "すべて";}
	//else{areaValue = areaArray[Ti.App.Properties.getString('searchArea')];}
	var areaTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		font:{fontFamily: _font, fontSize: 17},
		//value: areaValue,//"すべて",
		//customItem: Ti.App.Properties.getString('searchArea'),//"",
		textAlign: "center",
		top: 130,
		right: 30,
		left: 100,
		height: 30,
		enabled: false,
		color: _darkBlue,
		keyboardToolbar: false,
		borderRadius: 10,
		borderColor: _darkBlue
	});

	//テキストフィールドがタップされたときの挙動
	areaTextField.addEventListener('click', function(){
		switch (Titanium.Platform.osname){
			case 'iphone':
    			
				var areaPickerView = createPickerView( areaData, areaTextField, view );
				pickerSlideIn(view, areaPickerView);
    			break;
    			
    		case 'android':
    			break;
		}
	});

	//=========================================
	//purpose系要素の定義
	//=========================================
	/*
	var purposeLabel = Titanium.UI.createLabel({
		text: '目的',
		top: 130,
		left: 30,
		width: 60,
		height: 30,
		color: _darkBlue,
		font:{fontFamily: _font, fontSize: 17 }
	});
	
	//var purposeValue;
	//if (Ti.App.Properties.getString('searchPurpose') == "" || Ti.App.Properties.getString('searchAge') == null){purposeValue = "すべて";}
	//else{purposeValue = purposeArray[Ti.App.Properties.getString('searchPurpose')];}
	
	var purposeTextField = Titanium.UI.createTextField({
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		font:{fontFamily: _font, fontSize: 17},
		//value: "すべて",
		//customItem: Ti.App.Properties.getString('searchPurpose'),//"",
		textAlign: "center",
		top: 130,
		right: 30,
		left: 100,
		enabled: false,
		height: 30,
		color: _darkBlue,
		keyboardToolbar: false,
		borderRadius: 10,
		borderColor: _darkBlue
	});
	
	//テキストフィールドがタップされたときの挙動
	purposeTextField.addEventListener('click', function(){
		switch (Titanium.Platform.osname){
			case 'iphone':
			
				var purposePickerView = createPickerView( purposeData, purposeTextField, view );
				pickerSlideIn( view, purposePickerView );
    			break;
    			
    		case 'android':
    			break;
		}	
	});
	*/

	//=========================================
	//決定ボタン
	//=========================================
	
	var searchButton = Ti.UI.createButton({
		title: '決定',
		font:{fontFamily: _font, fontSize: 18},
		top: 190,
		right: 30,
		width: 120,
		height: 35,
		//borderColor:"#1E90FF",
		color: _white,
		backgroundColor: _mossGreen,
		borderRadius:10
	});
	
	searchButton.addEventListener('click', function(){
		Flurry.logEvent('SearchTableWindow Search Users');
		Ti.App.Properties.setString('searchAge', ageTextField.customItem);
		Ti.App.Properties.setString('searchArea', areaTextField.customItem);
		//Ti.App.Properties.setString('searchPurpose', purposeTextField.customItem);
		Ti.App.Properties.setString('searchGender', genderValue);
		tableViewRowData = [];
		loadTableView();
		tableView.scrollToTop(0, true);
		
		win.remove(view);
		
	});
	
	var cancelButton = Ti.UI.createButton({
		title: 'キャンセル',
		font:{fontFamily: _font, fontSize: 18},
		top: 190,
		left: 30,
		width: 120,
		height: 35,
		//borderColor:"#1E90FF",
		color: _white,
		backgroundColor: _mossGreen,
		borderRadius:10
	});
	
	cancelButton.addEventListener('click', function(){
		Flurry.logEvent('SearchTableWindow Cancel Search');
		win.remove(view);
		initialize();
	});
	
	function initialize(){
		if (Ti.App.Properties.getString('searchAge') == "" || Ti.App.Properties.getString('searchAge') == null){
			ageTextField.value = "すべて";
		}else{
			ageTextField.value = ageArray[Ti.App.Properties.getString('searchAge')];
		}
		ageTextField.customItem = Ti.App.Properties.getString('searchAge');
		
		if (Ti.App.Properties.getString('searchArea') == "" || Ti.App.Properties.getString('searchArea') == null){
			areaTextField.value = "すべて";
		}else{
			areaTextField.value = areaArray[Ti.App.Properties.getString('searchArea')];
		}
		areaTextField.customItem = Ti.App.Properties.getString('searchArea');
		/*
		if (Ti.App.Properties.getString('searchPurpose') == "" || Ti.App.Properties.getString('searchPurpose') == null){
			purposeTextField.value = "すべて";
		}else{
			purposeTextField.value = purposeArray[Ti.App.Properties.getString('searchPurpose')];
		}
		purposeTextField.customItem = Ti.App.Properties.getString('searchPurpose');
		*/
		if (Ti.App.Properties.getString('searchGender') == "" || Ti.App.Properties.getString('searchGender') == null){
			genderButtonBar.index = 0;
			genderValue = "";
		}else{
			switch(Ti.App.Properties.getString('searchGender')){
				case "male":
					genderButtonBar.index = 1;
					genderValue = "male";
					break;
				case "female":
					genderButtonBar.index = 2;
					genderValue = "female";
					break;
			}
		}
	}
	
	initialize();
	//Ti.API.info("Gender.index:" + genderButtonBar.index);
	view.add(genderLabel);
	view.add(ageLabel);
	view.add(areaLabel);
	//view.add(purposeLabel);
	view.add(genderButtonBar);
	view.add(ageTextField);
	view.add(areaTextField);
	//view.add(purposeTextField);
	view.add(searchButton);
	view.add(cancelButton);
	return view;
}
