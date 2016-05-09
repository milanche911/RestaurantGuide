document.addEventListener('deviceready', function () {
        console.log(navigator.camera);

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
                allowEdit: true,
                correctOrientation: true //Corrects Android orientation quirks
            };
            return options;
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

        function displayImage(imgUri) {

            var elem = document.getElementById('photo');
            elem.src = imgUri;
        }

        openCamera();

    };

}, false);
