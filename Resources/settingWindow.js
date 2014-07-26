function settingWindow() {
	var previousPoint;
	var listenerFunction;
	var self = createWindow("その他");
	
	var tableView = Titanium.UI.createTableView();
	//tableView.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;
		
	function loadTableViewView(){
		var rowData = [];
		function createHeaderRow( labelName ){
			var headerRow = Ti.UI.createTableViewRow({
				backgroundColor: _darkBlue,
				selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
				height: 40				
			});
			var label = Titanium.UI.createLabel({
		        color:'#fff',
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
				font:{fontFamily: _font},
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
	        color: _darkBlue,
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
		var inviteFriendsRow = createDefaultRow("友達招待してポイントGET", "invite_friends");
		rowData.push(inviteFriendsRow);
		
		var anotherHeaderRow = createHeaderRow("その他");
		rowData.push(anotherHeaderRow);
		var howtoRow = createDefaultRow("使い方", "how_to");
		rowData.push(howtoRow);
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
					var upWindow = require('userProfileWindow');
					var userProfileWindow = new upWindow(Ti.App.Properties.getString('my_id'), "myProfile");
					tabGroup.activeTab.open( userProfileWindow );
		  			break;
		  			
		  		case "buy_points": 
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
								facebookWindow.open();
						}
					});
					
					logout_alert.show();
			}
		};
		
		tableView.addEventListener('click', listenerFunction);
	}
	
	self.addEventListener('focus', function(e){
		if(previousPoint != _point){
			if(previousPoint != null){
				//alert("Listener削除");
				tableView.removeEventListener('click', listenerFunction);
			}
			//alert("ポイント：" + _point);
			previousPoint = _point;
			loadTableViewView();
		}
	});
	
	self.add(tableView);
	return self;
}

module.exports = settingWindow;