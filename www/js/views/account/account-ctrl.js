angular.module('mymessenger.controllers')

.controller('AccountCtrl', function($scope, $state, $cordovaCamera, $firebaseArray) {
    console.log("AccountCtrl initialized!");

    var ref = new Firebase(FIREBASE_URL);
    var syncImages = $firebaseArray(ref.child("images"));
    $scope.images = [];

    $scope.images = syncImages;

    $scope.logout = function() {
        console.log("logout function called");
        ref.unauth();
        $state.go('login');
    }


    $scope.upload = function() {
            var options = {
                quality : 100,
                destinationType : Camera.DestinationType.DATA_URL,
                sourceType : Camera.PictureSourceType.CAMERA,
                allowEdit : true,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                targetWidth: 500,
                targetHeight: 500,
                saveToPhotoAlbum: false
            };
            $cordovaCamera.getPicture(options).then(function(imageData) {
                syncImages.$add({image: imageData}).then(function() {
                    alert("Image has been uploaded");
                });
            }, function(error) {
                console.error(error);
            });
    }

  /**
   * Function to open the camera
   */
  $scope.takePicture = function() {
        var options = { 
            quality : 100, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }


    



});