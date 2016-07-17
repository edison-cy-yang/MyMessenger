angular.module('mymessenger.controllers')

.controller('ChatCtrl', function($scope, Chats, $stateParams, $ionicHistory, Auth, $cordovaCamera) {
  console.log('Chat Controller initialized');
  $scope.chats = Chats.all();
  $scope.IM = {
      textMessage: ""
  };
  console.log("state param is: " + $stateParams.roomId);

  Chats.selectRoom($stateParams.roomId);

  var roomName = Chats.getSelectedRoomName();

// // To store images
//   var ref = new Firebase(FIREBASE_URL);
//     var syncImages = $firebaseArray(ref.child("images"));
//     $scope.images = [];

//     $scope.images = syncImages;

  // fetching chat records only if a room is selected
  if(roomName) {
      $scope.roomName = ' - ' + roomName;
      $scope.chats = Chats.all();

  }

  $scope.sendMessage = function(msg) {
      console.log(msg);
      console.log("displayName: " + $scope.displayName);
      Chats.send($scope.displayName, msg);
      $scope.IM.textMessage = ""; 
  }

  $scope.remove = function(chat) {
      Chats.remove(chat);
  }

  $scope.convertToTime = function(timestamp) {
      var d = new Date(timestamp);
      var h = d.getHours();
      var m = d.getMinutes();
      var time = h + ":" + m;
      return time;      
  }

  $scope.convertToDateAndTime = function(timestamp) {
      var d = new Date(timestamp);
      var h = d.getHours();
      if(h < 10) {
          h = "0" + h;
      }
      var m = d.getMinutes();
      if(m < 10) {
          m = "0" + m;
      }
      var month = d.getMonth() + 1;
      var date = d.getDate();
      var dateTime = month + "/" + date + " - " + h + ":" + m;
      return dateTime;
  }


  $scope.goBack = function() {
      $ionicHistory.goBack();
  }


/////////////////Functions for image upload///////////////////
/**
 * 
 */
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
               Chats.sendImage($scope.displayName, imageData);

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