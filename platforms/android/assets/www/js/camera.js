document.addEventListener('deviceready', function () {
        //console.log(navigator.camera);

    takePhoto = function() {

        function setOptions() {
            var options = {
                // Some common settings are 20, 50, and 100
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                // In this app, dynamically set the picture source, Camera or photo gallery
                sourceType: Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE,
                allowEdit: false,
                correctOrientation: true //Corrects Android orientation quirks
            };
            return options;
        }

        function openFilePicker(selection) {

            var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
            var options = setOptions(srcType);
            var func = createNewFileEntry;

            if (selection == "picker-thmb") {
                // To downscale a selected image,
                // Camera.EncodingType (e.g., JPEG) must match the selected image type.
                options.targetHeight = 100;
                options.targetWidth = 100;
            }

            navigator.camera.getPicture(function cameraSuccess(imageUri) {
              displayImage(imageUri);
              // You may choose to copy the picture, save it somewhere, or upload.
              func(imageUri);
                // Do something

            }, function cameraError(error) {
                console.debug("Unable to obtain picture: " + error, "app");

            }, options);
        }

        function openCamera(selection) {

            var srcType = Camera.PictureSourceType.CAMERA;
            var options = setOptions(srcType);
            // var func = createNewFileEntry;

            navigator.camera.getPicture(function cameraSuccess(imageUri) {

                displayImage(imageUri);
                // You may choose to copy the picture, save it somewhere, or upload.
                func(imageUri);

            }, function cameraError(error) {
                console.debug("Unable to obtain picture: " + error, "app");

            }, options);
        }

        function displayImage(imageURI) {

            console.log("IMAGEURL12345" + imageURI);
            //call socket io and then emit picrure to the server, after server store picrure show picture
            sendPictureToServer(imageURI);
            // var elem = document.getElementById('photo');
            // elem.src = "data:image/jpeg;base64," + imageData;//image data is picture in base64;
        }

        openCamera();

    };

}, false);
