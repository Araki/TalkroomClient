function settingWindow() {
	
	var self = Titanium.UI.createWindow({  
    	title:'その他',
    	backgroundColor:'#fff'
	});

	var inputData = [
		{ header:'プロフィール',
			hasChild:true, title:'一言を編集する', id:'profile' },
		  { hasChild:true, title:'プロフィールを編集する', id:'detail_profile' },
		  { hasChild:true, title:'自分のプロフィールを見る', id:'my_profile' },
		  
		{ header:'ポイント',
			hasChild:false, title:'所有ポイント', id:'points' },
		  { hasChild:true, title:'ポイント購入', id:'buy_points'},
		  { hasChild:true, title:'無料でポイントGET', id:'reward'},
		  { hasChild:true, title:'ビデオを見てポイントGET', id:'video'},//無料でポイントGET系はページをひとまとめにしてもいいかも
		  { hasChild:true, title:'友達を招待してポイントGET', id:'invite_friends'},//無料でポイントGET系はページをひとまとめにしてもいいかも
		  
		{ header:'その他',
			hasChild:true, title:'使い方', id:'how_to'},
		  { hasChild:true, title:'利用規約', id:'tos'},
		  { hasChild:true, title:'お問い合わせ', id:'inquiry'}
	];
	
	var tableView = Titanium.UI.createTableView();
	tableView.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;
	tableView.data = inputData;
	
	tableView.addEventListener('click', function(e) {
		
		switch (e.row.id) {
			
	  		case "profile":		
				var url = Ti.App.domain + "get_detail_profile.json?user_id=" + Ti.App.userID;
				
				var commonMethods = require('commonMethods');
				var methodGetData = commonMethods.getData;
			
				methodGetData(url, function( data ){
					
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
				var url = Ti.App.domain + "get_detail_profile.json?user_id=" + Ti.App.userID;
				
				var commonMethods = require('commonMethods');
				var methodGetData = commonMethods.getData;
			
				methodGetData(url, function( data ){
					
					if (data.success) {
						// 通信に成功したら行う処理
						var json = data.data;
						
						Ti.API.info("++++++++++++" + json[0]);
						Ti.API.info("+++PROFILE+++" + json[0].nickname);
						
						var sdpWindow = require('setting/settingDetailProfileWindow');
						var settingDetailProfileWindow = new sdpWindow();
						
						settingDetailProfileWindow.children[0].data[0].rows[0].children[0].image = json[0].profile_image1;
						settingDetailProfileWindow.children[0].data[0].rows[0].children[1].image = json[0].profile_image2;
						settingDetailProfileWindow.children[0].data[0].rows[0].children[2].image = json[0].profile_image3;
						
						settingDetailProfileWindow.children[0].data[0].rows[1].children[1].value = json[0].nickname;
						settingDetailProfileWindow.children[0].data[0].rows[2].children[1].value = commonMethods.exchangeFromNumber( json[0].age, "age" );
						settingDetailProfileWindow.children[0].data[0].rows[2].children[1].customItem = json[0].age;
						settingDetailProfileWindow.children[0].data[0].rows[3].children[1].value = commonMethods.exchangeFromNumber( json[0].purpose, "purpose" );
						settingDetailProfileWindow.children[0].data[0].rows[3].children[1].customItem = json[0].purpose;
						settingDetailProfileWindow.children[0].data[0].rows[4].children[1].value = commonMethods.exchangeFromNumber( json[0].area, "area" );
						settingDetailProfileWindow.children[0].data[0].rows[4].children[1].customItem = json[0].area;
						settingDetailProfileWindow.children[0].data[0].rows[5].children[1].value = commonMethods.exchangeFromNumber( json[0].tall, "tall" );
						settingDetailProfileWindow.children[0].data[0].rows[5].children[1].customItem = json[0].tall;
						settingDetailProfileWindow.children[0].data[0].rows[6].children[1].value = commonMethods.exchangeFromNumber( json[0].blood, "blood" );
						settingDetailProfileWindow.children[0].data[0].rows[6].children[1].customItem = json[0].blood;
						settingDetailProfileWindow.children[0].data[0].rows[7].children[1].value = commonMethods.exchangeFromNumber( json[0].style, "style" );
						settingDetailProfileWindow.children[0].data[0].rows[7].children[1].customItem = json[0].style;
						settingDetailProfileWindow.children[0].data[0].rows[8].children[1].value = commonMethods.exchangeFromNumber( json[0].holiday, "holiday" );
						settingDetailProfileWindow.children[0].data[0].rows[8].children[1].customItem = json[0].holiday;
						settingDetailProfileWindow.children[0].data[0].rows[9].children[1].value = commonMethods.exchangeFromNumber( json[0].alcohol, "alcohol" );
						settingDetailProfileWindow.children[0].data[0].rows[9].children[1].customItem = json[0].alcohol;
						settingDetailProfileWindow.children[0].data[0].rows[10].children[1].value = commonMethods.exchangeFromNumber( json[0].cigarette, "cigarette" );
						settingDetailProfileWindow.children[0].data[0].rows[10].children[1].customItem = json[0].cigarette;
						settingDetailProfileWindow.children[0].data[0].rows[11].children[1].value = commonMethods.exchangeFromNumber( json[0].salary, "salary" );
						settingDetailProfileWindow.children[0].data[0].rows[11].children[1].customItem = json[0].salary;
						
						tabGroup.activeTab.open(settingDetailProfileWindow);
						
					} else{
						// 通信に失敗したら行う処理
					}
				});	  			
	  			break;
	  			
	  			
	  			
	  			
	  			
	  			
	  		case "my_profile":
	  			/*
	  			var smpWindow = require('setting/settingMyProfileWindow');
				var settingMyProfileWindow = new smpWindow();
				tabGroup.activeTab.open(settingMyProfileWindow);
				*/
				var url = Ti.App.domain + "get_detail_profile.json?user_id=" + Ti.App.userID;
				Ti.API.info("URL:" + url);
				
				var commonMethods = require('commonMethods');
				var methodGetData = commonMethods.getData;
				
				methodGetData(url, function( data ){
					
					if (data.success) {
						// 通信に成功したら行う処理
						var json = data.data;
						
						var upWindow = require('userProfileWindow');
						var userProfileWindow = new upWindow("myProfile");
						
						userProfileWindow.id = Ti.App.userID;
						userProfileWindow.title = json[0].nickname;
						userProfileWindow.children[0].image = json[0].profile_image1;
						userProfileWindow.children[1].image = json[0].profile_image2;
						userProfileWindow.children[2].image = json[0].profile_image3;
						userProfileWindow.children[3].children[0].children[0].text = "年代： " + commonMethods.exchangeFromNumber(json[0].age, "age");
						userProfileWindow.children[3].children[0].children[1].text = "エリア： " + commonMethods.exchangeFromNumber(json[0].area, "area");
						userProfileWindow.children[3].children[0].children[2].text = "目的： " + commonMethods.exchangeFromNumber(json[0].purpose, "purpose");
						userProfileWindow.children[3].children[0].children[3].text = "一言： " + commonMethods.exchangeFromNumber(json[0].profile, "profile");
						userProfileWindow.children[3].children[0].children[4].text = "身長： " + commonMethods.exchangeFromNumber(json[0].tall, "tall");
						userProfileWindow.children[3].children[0].children[5].text = "血液型： " + commonMethods.exchangeFromNumber(json[0].blood, "blood");
						userProfileWindow.children[3].children[0].children[6].text = "体型： " + commonMethods.exchangeFromNumber(json[0].style, "style");
						userProfileWindow.children[3].children[0].children[7].text = "休日： " + commonMethods.exchangeFromNumber(json[0].holiday, "holiday");
						userProfileWindow.children[3].children[0].children[8].text = "お酒： " + commonMethods.exchangeFromNumber(json[0].alcohol, "alcohol");
						userProfileWindow.children[3].children[0].children[9].text = "タバコ： " + commonMethods.exchangeFromNumber(json[0].cigarette, "cigarette"); 
						userProfileWindow.children[3].children[0].children[10].text = "給料： " + commonMethods.exchangeFromNumber(json[0].salary, "salary");
						
						tabGroup.activeTab.open( userProfileWindow );
						
					} else{
						// 通信に失敗したら行う処理
					}
				});
	  			break;
	  			
	  			
	  			
	  			
	  			
	  		case "buy_points": 
	  			var sbpWindow = require('setting/settingBuyPointsWindow');
				var settingBuyPointsWindow = new sbpWindow();
				tabGroup.activeTab.open(settingBuyPointsWindow);
	  			break;
	  		case "reward": 
	  			var srWindow = require('setting/settingRewardWindow');
				var settingRewardWindow = new srWindow();
				tabGroup.activeTab.open(settingRewardWindow);
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
		}
	});	
	
	self.add(tableView);
	
	return self;
}

module.exports = settingWindow;