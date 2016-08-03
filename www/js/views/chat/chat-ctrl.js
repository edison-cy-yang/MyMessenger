angular.module('mymessenger.controllers')

.controller('ChatCtrl', function($scope, Chats, $stateParams, $ionicHistory, Auth, $cordovaCamera, $ionicScrollDelegate) {
  console.log('Chat Controller initialized');
//   $scope.chats = Chats.all();
  $scope.IM = {
      textMessage: ""
  };
  console.log("state param is: " + $stateParams.roomId);

  Chats.selectRoom($stateParams.roomId);

  var viewScroll = $ionicScrollDelegate.$getByHandle('messageScroll');

  var roomName = Chats.getSelectedRoomName();



  // fetching chat records only if a room is selected
  if(roomName) {
      $scope.roomName = ' - ' + roomName;
      $scope.chats = Chats.all();
  }


  /**
   * On view enter, scroll to bottom of chat
   */
  $scope.$on('$ionicView.enter', function () {
      console.log('chat $ionicView.enter');
      viewScroll.scrollBottom();

  });


  /**
   * Send a message to the chat room
   */
  $scope.sendMessage = function(msg) {
      console.log(msg);
    //   console.log("displayName: " + $scope.user.displayName);
    //   console.log("userId: " + $scope.userId);
      Chats.send($scope.user, msg, $scope.userId);
      $scope.IM.textMessage = ""; 
      // scroll down to the bottom once messge is sent
      viewScroll.scrollBottom();
  };


  /**
   * Remove a message
   */
  $scope.remove = function(chat) {
      Chats.remove(chat);
  };


  /**
   * Convert to hh:mm time format
   */
  $scope.convertToTime = function(timestamp) {
      var d = new Date(timestamp);
      var h = d.getHours();
      var m = d.getMinutes();
      var time = h + ":" + m;
      return time;      
  };


  /**
   * Convert to date: month/day
   * and time: hh:mm
   */
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
  };


  /**
   * Go back to previous view
   */
  $scope.goBack = function() {
      $ionicHistory.goBack();
  };


/////////////////Functions for image upload///////////////////


  /**
   * Take a picture, and send the picture as a message 
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
               Chats.sendImage($scope.user, imageData, $scope.userId).then(function () {
                   viewScroll.scrollBottom();
               });
            }, function(error) {
               console.error(error);
            });
    };


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
    };

});