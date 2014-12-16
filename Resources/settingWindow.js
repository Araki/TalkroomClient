function settingWindow() {
	
	var previousPoint;
	var listenerFunction;
	var self = createWindow("その他");
	Ti.API.info("previousPoint:" + previousPoint);
	Ti.API.info("_point:" + _point);
	
	var tableView = Titanium.UI.createTableView();
		
	function loadTableViewView(){
		var rowData = [];
		function createHeaderRow( labelName ){
			var headerRow = Ti.UI.createTableViewRow({
				backgroundColor: _darkBlue,
				selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
				height: 30			
			});
			var label = Titanium.UI.createLabel({
		        color: _white,
		        textAlign:'left',
		        font:{fontFamily: _font, fontSize:15},
		        left: 15,
		        width:'auto',
		        height:'auto',
		        text: labelName
			});
			headerRow.add(label);
			return headerRow;
		}
		function createDefaultRow( titleName, id ){
			var defaultRow = Ti.UI.createTableViewRow({
				color: _darkGray,
				font:{fontFamily: _font, fontSize:17},
				hasChild: true,
				title: titleName,
				id: id
			});
			return defaultRow;
		}
		
		var profileHeaderRow = createHeaderRow("プロフィール");
		rowData.push(profileHeaderRow);
		var profileRow = createDefaultRow("一言を編集する", "profile");
		rowData.push(profileRow);
		var detailProfileRow = createDefaultRow("プロフィールを編集する", "detail_profile");
		rowData.push(detailProfileRow);
		var myProfileRow = createDefaultRow("自分のプロフィールを見る", "my_profile");
		rowData.push(myProfileRow);
		
		var pointHeaderRow = createHeaderRow("ポイント");
		var pointLabel = Titanium.UI.createLabel({
			backgroundColor: _white,
	        color: _vividPink,
	        textAlign:'left',
	        right: 10,
	        width:'auto',
	        height:'auto',
	        borderRadius:5,
	        font:{fontFamily: _font},
	        text: "  " + _point + " ポイント  "
		});
		pointHeaderRow.add(pointLabel);
		rowData.push(pointHeaderRow);
		var buyPointsRow = createDefaultRow("ポイント購入", "buy_points");
		rowData.push(buyPointsRow);
		if(rewardFlag == true){
			var rewardRow = createDefaultRow("無料でポイントGET", "reward");
			rowData.push(rewardRow);
		}
		/*
		var inviteFriendsRow = createDefaultRow("友達招待してポイントGET", "invite_friends");
		rowData.push(inviteFriendsRow);
		*/
		var anotherHeaderRow = createHeaderRow("その他");
		rowData.push(anotherHeaderRow);
		/*
		var howtoRow = createDefaultRow("使い方", "how_to");
		rowData.push(howtoRow);
		*/
		var tosRow = createDefaultRow("利用規約", "tos");
		rowData.push(tosRow);
		var inquiryRow = createDefaultRow("お問い合わせ", "inquiry");
		rowData.push(inquiryRow);
		var logoutRow = createDefaultRow("ログアウト", "logout");
		rowData.push(logoutRow);
		
		tableView.data = rowData;
		listenerFunction = function(e) {
			switch (e.row.id) {
		  		case "profile":
		  			Flurry.logEvent('SettingWindow Go To Profile');
		  			var spWindow = require('setting/settingProfileWindow');
					var settingProfileWindow = new spWindow();
					tabGroup.activeTab.open(settingProfileWindow);
		  			break;
		  			
		  		case "detail_profile": 
		  			Flurry.logEvent('SettingWindow Go To DetailProfile');
		  			var sdpWindow = require('setting/settingDetailProfileWindow');
					var settingDetailProfileWindow = new sdpWindow();
					tabGroup.activeTab.open(settingDetailProfileWindow);
		  			break;
		  			
		  		case "my_profile":
		  			Flurry.logEvent('SettingWindow Go To MyProfile');
					var upWindow = require('userProfileWindow');
					var userProfileWindow = new upWindow(Ti.App.Properties.getString('my_id'), "myProfile");
					tabGroup.activeTab.open( userProfileWindow );
		  			break;
		  			
		  		case "buy_points": 
		  			Flurry.logEvent('SettingWindow Go To BuyPoints');
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
					Flurry.logEvent('SettingWindow Go To Reward');
					var car = require('ti.car');
					var param = ["3344", 
						Ti.App.Properties.getString('my_id'), 
						"ncIdX3la", 
						"477538846cd8ed2f", 
						"無料でポイントGET", 
						"戻る", 
						"http://car.mobadme.jp/spg/spnew/702/3344/index.php"
					];
					car.showMediaView(param);
		  			break;
		  			
		  		case "video": 
		  			var svWindow = require('setting/settingVideoWindow');
					var settingVideoWindow = new svWindow();
					tabGroup.activeTab.open(settingVideoWindow);
		  			break;
		  		case "invite_friends": 
		  			/*
		  			var sifWindow = require('setting/settingInviteFriendsWindow');
					var settingInviteFriendsWindow = new sifWindow();
					tabGroup.activeTab.open(settingInviteFriendsWindow);
					*/
					var registWindow = require('facebookWindow');
					var registrationWindow = new registWindow();
					tabGroup.activeTab.open(registrationWindow);
		  			break;
		  		case "how_to": 
		  			/*
		  			var shtWindow = require('setting/settingHowToWindow');
					var settingHowToWindow = new shtWindow();
					tabGroup.activeTab.open(settingHowToWindow);
					*/
		  			break;
		  		case "tos":
		  			Flurry.logEvent('SettingWindow Go To TOS');
		  			var stosWindow = require('setting/settingTOSWindow');
					var settingTOSWindow = new stosWindow();
					tabGroup.activeTab.open(settingTOSWindow);
		  			break;
		  		case "inquiry": 
		  			Flurry.logEvent('SettingWindow Go To Inquiry');
		  			var siWindow = require('setting/settingInquiryWindow');
					var settingInquiryWindow = new siWindow();
					tabGroup.activeTab.open(settingInquiryWindow);
		  			break;
		  		case "logout":
		  			
					var logout_alert = Ti.UI.createAlertDialog({
						title: 'ログアウトしますか？',
						buttonNames: ['ログアウト', 'キャンセル'],
						cancel: 1
					}); 
					
					// アラートダイアログのボタンイベント処理
					logout_alert.addEventListener('click', function(e){
						switch (e.index){
							case 0:
								Flurry.logEvent('SettingWindow LogOut');
								fb.logout();
								Ti.App.Properties.setString('app_token', "");
								Ti.App.Properties.setString('my_id', "");
								Ti.App.Properties.setString('channel', "");			
								Ti.UI.createAlertDialog({
									title: 'ログアウトしました',
								}).show();
								facebookWindow.open();
						}
					});
					
					logout_alert.show();
			}
		};
		
		tableView.addEventListener('click', listenerFunction);
	}
	
	tabGroup.addEventListener('focus', function(e){
		if(e.index == 3){//その他タブがタップされたとき
			if(previousPoint != _point){//ポイントが変更されていたとき
				if(previousPoint != null){//2回目以降の「focus」のときListenerが重複するので削除
					tableView.removeEventListener('click', listenerFunction);
				}
				previousPoint = _point;
				loadTableViewView();
			}
		}
		
	});
		
	self.add(tableView);
	return self;
}

module.exports = settingWindow;