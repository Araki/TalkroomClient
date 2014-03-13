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
	  			var spWindow = require('setting/settingProfileWindow');
				var settingProfileWindow = new spWindow();
				tabGroup.activeTab.open(settingProfileWindow);
	  			break;
	  			
	  		case "detail_profile": 
	  			var sdpWindow = require('setting/settingDetailProfileWindow');
				var settingDetailProfileWindow = new sdpWindow();
				tabGroup.activeTab.open(settingDetailProfileWindow);	  			
	  			break;
	  			
	  		case "my_profile": 
	  			var smpWindow = require('setting/settingMyProfileWindow');
				var settingMyProfileWindow = new smpWindow();
				tabGroup.activeTab.open(settingMyProfileWindow);
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