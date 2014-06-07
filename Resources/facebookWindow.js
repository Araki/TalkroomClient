function facebookWindow() {
	
	//Facebookから取得した情報を格納する変数
	var first_name;
	var last_name;
	var gender;
	var email;
	var uid;
	var birthday;
	var ageNum;
	var ageText;
	//Facebook Friendsを取得し知り合いが検索に出ないようにする機能は必要になったときに実装し初期バージョンでは実装しない
	//var friends_list;
	
	var registWindow = require('registrationWindow');
	var registrationWindow = new registWindow();
	
	var self = createWindow("フェイスブック");
	
	fb.appid = '349815825157641';
	fb.permissions = ['email', 'user_birthday', 'read_friendlists'];
	fb.forceDialogAuth = false;
	
	fb.addEventListener('login', function(e) {
	    if (e.success) {
	    	
	    	alert('Logged in');
	        getUserDataList();
	        
			
	    } else if (e.error) {
	    	alert( e.error );
	    } else if ( e.cancelled ) {
	    	alert( e.cancelled );
	    }
	});

	// Add the button.  Note that it doesn't need a click event listener.
	self.add(fb.createLoginButton({
	    top : 50,
	    style : fb.BUTTON_STYLE_WIDE
	}));
	
	
	//FacebookGraph APIからユーザーのデータを取得するFunction
	function getUserDataList() {
		fb.requestWithGraphPath(
		    'me',
		    {},
		    "GET",
		    function(e) {
		         if (e.success) {
		            var obj = JSON.parse(e.result);
					
					//次の登録画面に遷移するまでの処理
					uid = obj.id;
					//name = obj.name;
					first_name = obj.first_name;
					last_name = obj.last_name;
					gender = obj.gender;
					email = obj.email;
					birthday = obj.birthday;
					
					var url = Ti.App.domain + "check_login.json";
					var message = {fb_uid: uid, access_token: Ti.Utils.md5HexDigest(Ti.Utils.md5HexDigest(uid))};
					
					var methodSendData = require('commonMethods').sendData;
					methodSendData( url, message, function( data ){
						if (data.success){
							//通信に成功したら行う処理
				            var obj = JSON.parse(data.data);
				            Ti.API.info(obj);
							if(obj.result == "true"){//既に登録済みのユーザーの処理
								
								var birth = birthday.split("/");
								var current = new Date();
								var age = current.getFullYear() - birth[2]
								alert("年齢：" + age + "\nID：" + String(uid) + "\n性別：" + gender);
								Flurry.setAge(age);
								Flurry.setUserId(String(uid));
								if(gender == "male"){
									Flurry.setGender('m');
								}else{
									Flurry.setGender('f');
								}
								
								Ti.UI.createAlertDialog({
									title: '既にログイン済みのユーザー',
								  	message: data.data
								}).show();
                
				                // app_token を保存する
				                Ti.App.Properties.setString('app_token', obj.app_token);
								Ti.App.Properties.setString('my_id', obj.user_id);
								
								//tabGroupを開く
								createTabGroup();
								//このウィンドウを閉じる
								self.close();
								
							}else{//まだ未登録のユーザーの処理
								
								Ti.UI.createAlertDialog({
									title: 'まだ未登録のユーザー',
								  	message: data.data
								}).show();
								
								/*Facebook Friendsを取得し知り合いが検索に出ないようにする機能は必要になったときに実装し初期バージョンでは実装しない
								//Facebook Friendsを全件取得
								getFbFriendsList();
								*/
								
								//first_nameとlast_nameの最初の文字を取得し連結する
								last_name_initial = last_name.substring(0,1);
								first_name_initial = first_name.substring(0,1);
								var name = first_name_initial + "." + last_name_initial + ".";
								
								//誕生日から年齢を計算
								var birth = birthday.split("/");					
								var current = new Date();
								calculateAge(current.getFullYear(),
											 current.getMonth() + 1,
											 current.getDate(),
											 birth[2],
											 birth[0],
											 birth[1]);
								
								//registrationWindowの各要素にデータを格納
								registrationWindow.children[1].value = name;
								registrationWindow.children[3].value = ageText;
								registrationWindow.children[3].customItem = ageNum;
								registrationWindow.children[5].customItem = 0;
								registrationWindow.children[7].customItem = 0;
								registrationWindow.uid = uid;
								registrationWindow.gender = gender;
								registrationWindow.email = email;
								
								registrationWindow.open();
								self.close();
							}
						} else{
							//通信に失敗したら行う処理
							Ti.UI.createAlertDialog({
								title: 'エラー',
							  	message: data.data
							}).show();
						}
					});
		        }
		    }
		);
	}
	
	/*Facebook Friendsを取得し知り合いが検索に出ないようにする機能は必要になったときに実装し初期バージョンでは実装しない
	//FacebookのGraphAPIからフレンドリストを取得するFunction
	function getFbFriendsList(){
		fb.requestWithGraphPath(
		    'me/friends/?fields=id,gender',
		    {},
		    "GET",
		    function(e) {
		         if (e.success) {
		            friends_list = e.result;
		            registrationWindow.friends_list = friends_list;
					Ti.API.info("####FRIENDS LIST: " + friends_list);
		        }
		    }
		);
	}
	*/
	
	//年齢を計算し、年齢番号を割り出すFunction
	function calculateAge(cY, cM, cD, bY, bM, bD){
		var currentYear = cY;
		var currentMonth = cM;
		var currentDate = cD;
		var birthdayYear = bY;
		var birthdayMonth = bM;
		var birthdayDate = bD;
		
		var age;
		
		var ageYear = currentYear - birthdayYear;
		var ageMonth = currentMonth - birthdayMonth;
		var ageDate = currentDate - birthdayDate;
		
		if (ageYear > 0){
			if (ageMonth > 0 ){//既に誕生月が過ぎている場合
				age = ageYear;
			}else if (ageMonth < 0){//まだ誕生月が来ていない場合
				age = ageYear - 1;
			}else{//本月が誕生月の場合
				if (ageDate > 0){//既に誕生日が過ぎている場合
					age = ageYear;
				}else if (ageDate < 0){//まだ誕生日が来ていない倍
					age = ageYear - 1;
				}else{//本日が誕生日の場合
					age = ageYear;
				}
			}
		}else{ 
			//0歳以下なのでありえない
		}
		
		Ti.API.info("AGE+++: " + age);
		
		if(age < 18){
			alert("本サービスは18歳未満の方はご利用できません。");
		}else{
			//年齢から年齢番号を判別
			if(age < 20){
				ageNum = 1;
			}else if(20 <= age && age < 24 ){
				ageNum = 2;
			}else if(24 <= age && age < 27 ){
				ageNum = 3;
			}else if(27 <= age && age < 30 ){
				ageNum = 4;
			}else if(30 <= age && age < 34 ){
				ageNum = 5;
			}else if(34 <= age && age < 37 ){
				ageNum = 6;
			}else if(37 <= age && age < 40 ){
				ageNum = 7;
			}else if(40 <= age && age < 44 ){
				ageNum = 8;
			}else if(44 <= age && age < 47 ){
				ageNum = 9;
			}else if(47 <= age && age < 50 ){
				ageNum = 10;
			}else if(50 <= age){
				ageNum = 11;
			}
			//ageNumをテキストに変換
			var commonMethods = require('commonMethods');
			ageText = commonMethods.exchangeFromNumber( ageNum, "age" );
		}
		
	}

	return self;
}

module.exports = facebookWindow;
