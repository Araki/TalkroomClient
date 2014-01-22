// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// 「のぞく」ウィンドウ
//
var win1 = Titanium.UI.createWindow({  
    title:'のぞく',
    backgroundColor:'#fff'
});

var tableViewRowData = [
	{ title: '１行目' },
	{ title: '２行目' },
	{ title: '３行目' }
];

var tableView = Titanium.UI.createTableView({
	data: tableViewRowData
});

win1.add(tableView);

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'のぞく',
    window:win1
});


//
// 「探す」ウィンドウ
//
var win2 = Titanium.UI.createWindow({  
    title:'探す',
    backgroundColor:'#fff'
});

var picker = Ti.UI.createPicker({
	width: 320,
	height: 50,
	bottom: 0
});

var data = [];
data[0]=Ti.UI.createPickerRow({title:'Bananas',custom_item:'Bananas'});
data[1]=Ti.UI.createPickerRow({title:'Strawberries',custom_item:'Strawberries'});
data[2]=Ti.UI.createPickerRow({title:'Mangos',custom_item:'Mangos'});
data[3]=Ti.UI.createPickerRow({title:'Grapes',custom_item:'Grapes'});

picker.add(data);
picker.selectionIndicator = true;
Ti.API.info("=========================");
picker.addEventListener('change', function(e){
	textField.value = e.row.custom_item;
	//Ti.API.info("You selected row: "+e.row.custom_item);
});


var textField = Titanium.UI.createTextField({
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	top: 20,
	right: 50,
	left: 50,
	enabled: false,
	keyboardToolbar: false
});

textField.blur();
 
textField.addEventListener('click', function(){
	win2.add(picker);
});

win2.add(textField);


var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'探す',
    window:win2
});



//
// 「トーク」ウィンドウ
//
var win3 = Titanium.UI.createWindow({  
    title:'トーク',
    backgroundColor:'#fff'
});
var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'トーク',
    window:win3
});



//
// 「設定」ウィンドウ
//
var win4 = Titanium.UI.createWindow({  
    title:'設定',
    backgroundColor:'#fff'
});
var tab4 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'設定',
    window:win4
});



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);

// open tab group
tabGroup.open();
