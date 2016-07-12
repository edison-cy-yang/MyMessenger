angular.module('mymessenger.controllers')


.controller('RoomsCtrl', function($scope, Rooms, Chats, $state) {
  console.log("Rooms Controller initialized");
   $scope.rooms = Rooms.all();
   var chatRoom = {
          chats: {
              

          },
          icon: "ion-university",
          id: 2,
          name: "newest room",
          notes: "just talk!!!!!!"
      };
    // Rooms.createRoom(chatRoom);

//    var chats = [];
//    var chatRoom = {
//           chats: chats,
//           icon: "ion-university",
//           id: 2,
//           name: 'random',
//           notes: 'just talking about random stuff'
//       };
//       Rooms.createRoom(chatRoom);

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
});