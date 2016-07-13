angular.module('mymessenger.controllers')


.controller('RoomsCtrl', function($scope, Rooms, Chats, $state) {
  console.log("Rooms Controller initialized");
   $scope.rooms = Rooms.all();


  /**
   * Open a specific chat room
   */
  $scope.openChatRoom = function (roomId) {
    console.log("room id is: " + roomId);
    $state.go('tab.chat', {
        roomId: roomId
    });
  }


  /**
   * Create a new chat room
   *  
   * */
  $scope.createChatRoom = function(roomName, notes) {
      var chatRoom = {
          icon: "ion-university",
          id: 2,
          name: roomName,
          notes: notes
      };
      Rooms.createRoom(chatRoom);
  } 
  

  /**
   * Navigation to the create state
   */
  $scope.navCreate = function() {
      $state.go('createRoom');
  }

});