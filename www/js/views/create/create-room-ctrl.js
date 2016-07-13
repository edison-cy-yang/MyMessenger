angular.module('mymessenger.controllers')


.controller('CreateRoomCtrl', function($scope, $ionicHistory, Rooms) {
  console.log("CreateRoom Controller initialized");
   

$scope.goBack = function() {
    $ionicHistory.goBack();
};


  /**
   * Create a new chat room
   * 
   * */
  $scope.createChatRoom = function(roomName, description) {

      var chatRoom = {
        chats: {},
        icon: "ion-university",
        id: 0,
        name: roomName,
        notes: description
      };

      Rooms.createRoom(chatRoom);

      $ionicHistory.goBack();
  } 

});