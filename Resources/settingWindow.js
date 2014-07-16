function settingWindow() {
	var previousPoint;
	var self = createWindow("その他");
	
	var tableView = Titanium.UI.createTableView();
	tableView.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;
	
	self.addEventListener('focus', function(e){
		if(previousPoint != _point){
			//alert("ポイント：" + _point);
			previousPoint = _point;
			loadTableViewView();
		}
	});
	
	self.add(tableView);
	
	
	function loadTableViewView(){
		var inputData = [
			{ header:'プロフィール',
				hasChild:true, title:'一言を編集する', id:'profile' },
			  { hasChild:true, title:'プロフィールを編集する', id:'detail_profile' },
			  { hasChild:true, title:'自分のプロフィールを見る', id:'my_profile' },
			  
			{ header:'ポイント',
				hasChild:false, title:'所有ポイント:   ' + _point, id:'points', selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE },
			  { hasChild:true, title:'ポイント購入', id:'buy_points'},
			  { hasChild:true, title:'無料でポイントGET', id:'reward'},
			  { hasChild:true, title:'ビデオを見てポイントGET', id:'video'},//無料でポイントGET系はページをひとまとめにしてもいいかも
			  { hasChild:true, title:'友達を招待してポイントGET', id:'invite_friends'},//無料でポイントGET系はページをひとまとめにしてもいいかも
			  
			{ header:'その他',
				hasChild:true, title:'使い方', id:'how_to'},
			  { hasChild:true, title:'利用規約', id:'tos'},
			  { hasChild:true, title:'お問い合わせ', id:'inquiry'},
			  
			{header:'',
				hasChild:true, title:'ログアウト', id:'logout'}
			  
		];
		
		tableView.data = inputData;
		
		tableView.addEventListener('click', function(e) {
			
			switch (e.row.id) {
				
		  		case "profile":		
					var url = Ti.App.domain + "get_detail_profile.json?user_id=" + Ti.App.Properties.getString('my_id') +"&app_token=" + Ti.App.Properties.getString('app_token');
				
					getData(url, function( data ){
						
						if (data.success) {
							// 通信に成功したら行う処理
							var json = data.data;
							
							var spWindow = require('setting/settingProfileWindow');
							var settingProfileWindow = new spWindow();
							
							settingProfileWindow.children[0].value = json[0].profile;
							
							tabGroup.activeTab.open(settingProfileWindow);
							
						} else{
							// 通信に失敗したら行う処理
						}
					});
		  			break;
		  			
		  			
		  			
		  		case "detail_profile": 
					var url = Ti.App.domain + "get_detail_profile.json?user_id=" + Ti.App.Properties.getString('my_id') +"&app_token=" + Ti.App.Properties.getString('app_token');

					getData(url, function( data ){
						
						if (data.success) {
							// 通信に成功したら行う処理
							var json = data.data;
							
							Ti.API.info("++++++++++++" + json[0]);
							Ti.API.info("+++PROFILE+++" + json[0].profile_image3);
							
							var sdpWindow = require('setting/settingDetailProfileWindow');
							var settingDetailProfileWindow = new sdpWindow();
							
							settingDetailProfileWindow.children[0].data[0].rows[0].children[1].image = json[0].profile_image1 + "?" + new Date().getTime();
							settingDetailProfileWindow.children[0].data[0].rows[0].children[1].url = json[0].profile_image1 + "?" + new Date().getTime();
							if(json[0].profile_image2 != null){
								settingDetailProfileWindow.children[0].data[0].rows[0].children[3].image = json[0].profile_image2 + "?" + new Date().getTime();
								settingDetailProfileWindow.children[0].data[0].rows[0].children[3].url = json[0].profile_image2 + "?" + new Date().getTime();
							}else{
								settingDetailProfileWindow.children[0].data[0].rows[0].children[3].image = "images/choice_image.png";
							}
							if(json[0].profile_image3 != null){
								settingDetailProfileWindow.children[0].data[0].rows[0].children[5].image = json[0].profile_image3 + "?" + new Date().getTime();
								settingDetailProfileWindow.children[0].data[0].rows[0].children[5].url = json[0].profile_image3 + "?" + new Date().getTime();
							}else{
								settingDetailProfileWindow.children[0].data[0].rows[0].children[5].image = "images/choice_image.png";
							}
							
							settingDetailProfileWindow.children[0].data[0].rows[1].children[1].value = json[0].nickname;
							settingDetailProfileWindow.children[0].data[0].rows[2].children[1].value = exchangeFromNumber( json[0].age, "age" );
							settingDetailProfileWindow.children[0].data[0].rows[2].children[1].customItem = json[0].age;
							settingDetailProfileWindow.children[0].data[0].rows[3].children[1].value = exchangeFromNumber( json[0].purpose, "purpose" );
							settingDetailProfileWindow.children[0].data[0].rows[3].children[1].customItem = json[0].purpose;
							settingDetailProfileWindow.children[0].data[0].rows[4].children[1].value = exchangeFromNumber( json[0].area, "area" );
							settingDetailProfileWindow.children[0].data[0].rows[4].children[1].customItem = json[0].area;
							settingDetailProfileWindow.children[0].data[0].rows[5].children[1].value = exchangeFromNumber( json[0].tall, "tall" );
							settingDetailProfileWindow.children[0].data[0].rows[5].children[1].customItem = json[0].tall;
							settingDetailProfileWindow.children[0].data[0].rows[6].children[1].value = exchangeFromNumber( json[0].blood, "blood" );
							settingDetailProfileWindow.children[0].data[0].rows[6].children[1].customItem = json[0].blood;
							settingDetailProfileWindow.children[0].data[0].rows[7].children[1].value = exchangeFromNumber( json[0].style, "style" );
							settingDetailProfileWindow.children[0].data[0].rows[7].children[1].customItem = json[0].style;
							settingDetailProfileWindow.children[0].data[0].rows[8].children[1].value = exchangeFromNumber( json[0].holiday, "holiday" );
							settingDetailProfileWindow.children[0].data[0].rows[8].children[1].customItem = json[0].holiday;
							settingDetailProfileWindow.children[0].data[0].rows[9].children[1].value = exchangeFromNumber( json[0].alcohol, "alcohol" );
							settingDetailProfileWindow.children[0].data[0].rows[9].children[1].customItem = json[0].alcohol;
							settingDetailProfileWindow.children[0].data[0].rows[10].children[1].value = exchangeFromNumber( json[0].cigarette, "cigarette" );
							settingDetailProfileWindow.children[0].data[0].rows[10].children[1].customItem = json[0].cigarette;
							settingDetailProfileWindow.children[0].data[0].rows[11].children[1].value = exchangeFromNumber( json[0].salary, "salary" );
							settingDetailProfileWindow.children[0].data[0].rows[11].children[1].customItem = json[0].salary;
							
							tabGroup.activeTab.open(settingDetailProfileWindow);
							
						} else{
							// 通信に失敗したら行う処理
						}
					});	  			
		  			break;
		  			
		  			
		  			
		  			
		  			
		  			
		  		case "my_profile":

					var url = Ti.App.domain + "get_detail_profile.json?user_id=" + Ti.App.Properties.getString('my_id') +"&app_token=" + Ti.App.Properties.getString('app_token');
					Ti.API.info("URL:" + url);
					
					getData(url, function( data ){
						
						if (data.success) {
							// 通信に成功したら行う処理
							var json = data.data;
							
							var upWindow = require('userProfileWindow');
							var userProfileWindow = new upWindow("myProfile");
	
							userProfileWindow.id = Ti.App.Properties.getString('my_id');
							userProfileWindow.titleControl.text = json[0].nickname;
							userProfileWindow.children[1].children[0].image = json[0].profile_image1 + "?" + new Date().getTime();
							userProfileWindow.children[1].children[1].image = json[0].profile_image2 + "?" + new Date().getTime();
							userProfileWindow.children[1].children[2].image = json[0].profile_image3 + "?" + new Date().getTime();
							userProfileWindow.children[0].data[0].rows[0].children[0].text = "年代";
							userProfileWindow.children[0].data[0].rows[0].children[1].text = exchangeFromNumber(json[0].age, "age");
							userProfileWindow.children[0].data[0].rows[1].children[0].text = "エリア";
							userProfileWindow.children[0].data[0].rows[1].children[1].text = exchangeFromNumber(json[0].area, "area");
							userProfileWindow.children[0].data[0].rows[2].children[0].text = "目的";
							userProfileWindow.children[0].data[0].rows[2].children[1].text = exchangeFromNumber(json[0].purpose, "purpose");
							userProfileWindow.children[0].data[0].rows[3].children[0].text = "一言";
							userProfileWindow.children[0].data[0].rows[3].children[1].text = json[0].profile;
							userProfileWindow.children[0].data[0].rows[4].children[0].text = "身長";
							userProfileWindow.children[0].data[0].rows[4].children[1].text = exchangeFromNumber(json[0].tall, "tall");
							userProfileWindow.children[0].data[0].rows[5].children[0].text = "血液型";
							userProfileWindow.children[0].data[0].rows[5].children[1].text = exchangeFromNumber(json[0].blood, "blood");
							userProfileWindow.children[0].data[0].rows[6].children[0].text = "体型";
							userProfileWindow.children[0].data[0].rows[6].children[1].text = exchangeFromNumber(json[0].style, "style");
							userProfileWindow.children[0].data[0].rows[7].children[0].text = "休日";
							userProfileWindow.children[0].data[0].rows[7].children[1].text = exchangeFromNumber(json[0].holiday, "holiday");
							userProfileWindow.children[0].data[0].rows[8].children[0].text = "お酒";
							userProfileWindow.children[0].data[0].rows[8].children[1].text = exchangeFromNumber(json[0].alcohol, "alcohol");
							userProfileWindow.children[0].data[0].rows[9].children[0].text = "タバコ";
							userProfileWindow.children[0].data[0].rows[9].children[1].text = exchangeFromNumber(json[0].cigarette, "cigarette"); 
							userProfileWindow.children[0].data[0].rows[10].children[0].text = "給料";
							userProfileWindow.children[0].data[0].rows[10].children[1].text = exchangeFromNumber(json[0].salary, "salary");
	
							tabGroup.activeTab.open( userProfileWindow );
							
						} else{
							// 通信に失敗したら行う処理
						}
					});
		  			break;
		  			
		  			
		  			
		  			
		  			
		  		case "buy_points": 
		  			Ti.API.info("BUY POINTS");
		  			
		  			var sbpWindow = require('setting/settingBuyPointsWindow');
					var settingBuyPointsWindow = new sbpWindow();
					tabGroup.activeTab.open(settingBuyPointsWindow);
		  			break;
		  			
		  			
		  		case "reward": 
		  			/*
		  			var srWindow = require('setting/settingRewardWindow');
					var settingRewardWindow = new srWindow();
					tabGroup.activeTab.open(settingRewardWindow);
					*/
					var car = require('ti.car');
					var param = ["3344", Ti.App.Properties.getString('my_id'), "ncIdX3la", "477538846cd8ed2f", "TITLE", "BACK", "http://car.mobadme.jp/spg/spnew/702/3344/index.php"];
					car.showMediaView(param);
		  			break;
		  			
		  		case "video": 
		  			var svWindow = require('setting/settingVideoWindow');
					var settingVideoWindow = new svWindow();
					tabGroup.activeTab.open(settingVideoWindow);
		  			break;
		  		case "invite_friends": 
		  			var sifWindow = require('setting/settingInviteFriendsWindow');
					var settingInviteFriendsWindow = new sifWindow();
					tabGroup.activeTab.open(settingInviteFriendsWindow);
		  			break;
		  		case "how_to": 
		  			var shtWindow = require('setting/settingHowToWindow');
					var settingHowToWindow = new shtWindow();
					tabGroup.activeTab.open(settingHowToWindow);
		  			break;
		  		case "tos": 
		  			var stosWindow = require('setting/settingTOSWindow');
					var settingTOSWindow = new stosWindow();
					tabGroup.activeTab.open(settingTOSWindow);
		  			break;
		  		case "inquiry": 
		  			
		  			var siWindow = require('setting/settingInquiryWindow');
					var settingInquiryWindow = new siWindow();
					tabGroup.activeTab.open(settingInquiryWindow);
		  			break;
		  		case "logout":
		  			
					var logout_alert = Ti.UI.createAlertDialog({
						title: 'ログアウトしますか？',
						//message: 'Are you sure?',//ダイアログの本文
						buttonNames: ['ログアウト', 'キャンセル'],
						cancel: 1
					}); 
					
					// アラートダイアログのボタンイベント処理
					logout_alert.addEventListener('click', function(e){
						switch (e.index){
							case 0:
								fb.logout();
								alert('Logged out');
							    //var fbWindow = require('facebookWindow');
								//var facebookWindow = new fbWindow();
								facebookWindow.open();
						}
					});
					
					logout_alert.show();
			}
		});
	}
	
	return self;
}

module.exports = settingWindow;