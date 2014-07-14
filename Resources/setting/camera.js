var win = Titanium.UI.currentWindow;
Titanium.Media.showCamera({


	success:function(event)
	{
		var cropRect = event.cropRect;
		var originalImage = event.media;
		var image = originalImage.imageAsResized(originalImage.width/6, originalImage.height/6);
		if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
		{
			/*
			// カメラで撮った画像を表示する
			var imageView = Ti.UI.createImageView({
				width:win.width,
				height:win.height,
				image:event.media
			});
			win.add(imageView);
			*/
			
			// カメラで撮った画像をアップロード（uploadCameraImageはあとで説明）
			//alert("アップロード");
			uploadCameraImage(image);
		}
		else
		{
			alert("got the wrong type back ="+event.mediaType);
		}
	},
	cancel:function()
	{
	},
	error:function(error)
	{
		// create alert
		var a = Titanium.UI.createAlertDialog({title:'Camera'});

		// set message
		if (error.code == Titanium.Media.NO_CAMERA)
		{
			a.setMessage('Please run this test on device');
		}
		else
		{
			a.setMessage('Unexpected error: ' + error.code);
		}

		// show alert
		a.show();
	},
	saveToPhotoGallery:false,
	allowEditing:true,
	mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
});

function uploadCameraImage(image){
	var xhr = Ti.Network.createHTTPClient();
	var url = Ti.App.domain + "/upload_image.json";
	xhr.open('POST', url);
	xhr.send({
		app_token: Ti.App.Properties.getString('app_token'),
		media:image
	});
	xhr.onload = function(){
		alert("レスポンス" + xhr.responseText);
		if(xhr.responseText == "success"){
			alert("アップロード成功");
		}else{
			alert("アップロードに失敗しました");
		}
		//var json = JSON.parse(xhr.responseText);
	};
	xhr.onerror = function(){
		alert("アップロードに失敗しました");
	};
}