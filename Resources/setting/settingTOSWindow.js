function settingTOSWindow() {
	
	//var self = createWindow("利用規約");
	
	// window 設定
	var self = Titanium.UI.createWindow({  
	    title:'CameraTest',
	    backgroundColor:'#fff'
	});
	
	// カメラ起動ボタン
	var cameraButton = Titanium.UI.createButton({
		title:'カメラ起動',
		height:40,
		width:200,
		top:10,
	});
	
	//クリック時の動作
	cameraButton.addEventListener('click', function(e)
	{
		showCamera(self);
	});
	
	var galleryButton = Titanium.UI.createButton({
		title:'カメラロール起動',
		height:40,
		width:200,
		top:100,
	});
	
	galleryButton.addEventListener('click', function(e)
	{
		showGallery(self);
	});
	
	//windowにボタン追加
	self.add(cameraButton);
	self.add(galleryButton);
	
	return self;
}

module.exports = settingTOSWindow;