var tableView;
var actInd; 

function searchTableWindow() {

	var self = createWindow("ユーザー");
	//var sWindow = require('searchWindow');
	//var searchWindow = new sWindow();
	var searchView = createSearchView( self );
	tableView = Titanium.UI.createTableView({top:0, bottom:50, separatorStyle:'NONE'});
	
	tableView.addEventListener('click', function(e) {
		var userID = e.row.id;
		var upWindow = require('userProfileWindow');
		var userProfileWindow = new upWindow(userID);
		tabGroup.activeTab.open( userProfileWindow );
	});	
	
	actInd = createActInd();
	
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
	var tableViewRowData = [];
	
	Ti.API.info("searchGender" + Ti.App.Properties.getString('searchGender'));
	
	var url = Ti.App.domain + "get_search_users.json?age=" + 
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
			var json = data.data;
			
			for (var i=0; i<json.length; i++){
				var row = createRow(
					json[i].nickname + "（" + exchangeFromNumber( json[i].age, "age" ) + "）", 
					json[i].profile_image1, 
					json[i].profile, 
					exchangeFromNumber( json[i].area, "area" ) + 
					//" | " + exchangeFromNumber( json[i].purpose, "purpose" ) + 
					" | " + json[i].last_logined, 
					json[i].id,
					i
				);
			   tableViewRowData.push(row);
			}	
		} else{
			// 通信に失敗したら行う処理
		}
		tableView.data = tableViewRowData;
		
		//アクティビティインジケーターを非表示
		actInd.hide();	
	});
}

function createRow(nickName, iconImage, profile, info, userID, backgroundType){
	
	var nickNameLabel = Titanium.UI.createLabel({
    	font:{fontFamily: _font, fontSize:13, fontWeight:"bold"},
    	textAlign: 'left',
    	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
    	color: _vividPink,
    	top: 5, 
    	left: 85, 
    	right: 0,
        height: "auto",
        text: nickName
    });
    
    var profileImage = Titanium.UI.createImageView({
    	top: 5,
    	left: 5,
    	width: 70,
    	height: 70,
    	borderRadius:7,
    	//borderColor:_darkBlue,
    	//borderWidth:1,
    	image: iconImage
    });
    
    var profileLabel = Titanium.UI.createLabel({
    	font:{fontFamily: _font, fontSize:12}, 
    	textAlign:'left',
    	verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
    	color: _darkGray,
    	top: 25, 
    	bottom: 20,
    	left: 85, 
    	right: 0,
        text: profile
    });
    
    var infoLabel = Titanium.UI.createLabel({
    	font:{fontFamily: _font, fontSize:10}, 
    	textAlign:'right',
    	verticalAlign:Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
    	color:_darkGray,
    	bottom: 5, 
    	right: 0, 
    	left: 85, 
        height: "auto",
        text: info
    }); 
    
    var row = Ti.UI.createTableViewRow({
    	hasChild: true,
        height:80,
        id:userID
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
	
	var genderButtonBar = Titanium.UI.createTabbedBar({
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
	
	var genderValue;
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
		/*
		var stWindow = require('searchTableWindow');
		var searchTableWindow = new stWindow(
			ageTextField.customItem,
			areaTextField.customItem,
			purposeTextField.customItem
		);
		*/
		Ti.App.Properties.setString('searchAge', ageTextField.customItem);
		Ti.App.Properties.setString('searchArea', areaTextField.customItem);
		//Ti.App.Properties.setString('searchPurpose', purposeTextField.customItem);
		Ti.App.Properties.setString('searchGender', genderValue);
		loadTableView();
		
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
		}else{
			switch(Ti.App.Properties.getString('searchGender')){
				case "male":
					genderButtonBar.index = 1;
					break;
				case "female":
					genderButtonBar.index = 2;
					break;
			}
		}
	}
	
	initialize();
	
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
