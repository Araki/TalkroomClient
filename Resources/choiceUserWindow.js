function choiceUserWindow(){
	
	var self = Titanium.UI.createWindow({  
	   	title:'ログインユーザー選択',
	   	backgroundColor:'#fff'
	});
	
	
//==================================================
	
	var button1 = Ti.UI.createButton({
		title: 'UserID 1',
		top: 50,
		right: 20,
		left: 20,
		height: 50,
		borderColor:"#1E90FF",
		borderRadius:5
	});
	self.add(button1);
	
	button1.addEventListener('click', function() {
		Ti.App.userID = 1;
		self.close();
	});
	
//==================================================	
	
	var button2 = Ti.UI.createButton({
		title: 'UserID 2',
		top: 120,
		right: 20,
		left: 20,
		height: 50,
		borderColor:"#1E90FF",
		borderRadius:5
	});
	self.add(button2);
	
	button2.addEventListener('click', function() {
		Ti.App.userID = 2;
		self.close();
	});
	
//==================================================
	
	var button3 = Ti.UI.createButton({
		title: 'UserID 3',
		top: 190,
		right: 20,
		left: 20,
		height: 50,
		borderColor:"#1E90FF",
		borderRadius:5
	});
	self.add(button3);
	
	button3.addEventListener('click', function() {
		Ti.App.userID = 3;
		self.close();
	});
	
//==================================================
	
	var button4 = Ti.UI.createButton({
		title: 'UserID 4',
		top: 260,
		right: 20,
		left: 20,
		height: 50,
		borderColor:"#1E90FF",
		borderRadius:5
	});
	self.add(button4);
	
	button4.addEventListener('click', function() {
		Ti.App.userID = 4;
		self.close();
	});
	
//==================================================
	
	var button5 = Ti.UI.createButton({
		title: 'UserID 5',
		top: 330,
		right: 20,
		left: 20,
		height: 50,
		borderColor:"#1E90FF",
		borderRadius:5
	});
	self.add(button5);
	
	button5.addEventListener('click', function() {
		Ti.App.userID = 5;
		self.close();
	});
	
//==================================================
	
	var button6 = Ti.UI.createButton({
		title: 'UserID 6',
		top: 400,
		right: 20,
		left: 20,
		height: 50,
		borderColor:"#1E90FF",
		borderRadius:5
	});
	self.add(button6);
	
	button6.addEventListener('click', function() {
		Ti.App.userID = 6;
		self.close();
	});
	
	return self;
}

module.exports = choiceUserWindow;
