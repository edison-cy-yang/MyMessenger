angular.module('mymessenger.services', ['firebase'])


/**
 * Auth Service
 */
.factory("Auth", ["$firebaseAuth", "$rootScope", 
    function($firebaseAuth, $rootScope) {
        var ref = new Firebase(FIREBASE_URL);
        return $firebaseAuth(ref);
 }])


/**
 * Rooms Service
 */
 .factory('Rooms', function ($firebaseArray){
   var ref = new Firebase(FIREBASE_URL);
   var rooms = $firebaseArray(ref.child('rooms'));

   return {
     all: function() {  //Rooms.all() will return all the rooms
       return rooms;
     }, 
     get: function(roomId){
       return rooms.$getRecord(roomId);
     },
     createRoom: function(chatRoom) {
       rooms.$add(chatRoom).then(function (data) {
         console.log("Chat room added!");
       });

     }
   }
 })
 

 /**
  * Chats Service
  */
 .factory('Chats', function ($firebaseArray, Rooms) {
   
   var selectedRoomId;
   
    var ref = new Firebase(FIREBASE_URL);
    var chats;

    return {
      all: function() {
        return chats;
      }, 
      remove: function(chat) {
        chats.$remove(chat).then(function (ref) {
          ref.key() === chat.$id;
        });
      },
      get: function(chatId) {
        for(var i = 0; i < chats.length; i++) {
          if(parseInt(chatId) === chats[i].id) {
            return chats[i];
          }
        }
        return null;
      },
      getSelectedRoomName: function() {
        var selectedRoom;
        if(selectedRoomId && selectedRoomId != null) {
          selectedRoom = Rooms.get(selectedRoomId);
          if(selectedRoom)
            return selectedRoom.name;
          else
            return null;

        }
        else 
          return null;
      },
      selectRoom: function(roomId) {
        console.log("selecting the room with id: " + roomId);
        selectedRoomId = roomId;
        //if(!isNaN(selectedRoomId)) {
          chats = $firebaseArray(ref.child('rooms').child(selectedRoomId).child('chats'));
          console.log("rooms selected: " + selectedRoomId);
        //}
      },
      send: function(from, message) {
        console.log("sending message from: " + from.displayName + " & message is " + message);
        if(from && message) {
          var chatMessage = {
            from: from.displayName,
            message: message,
            createdAt: Firebase.ServerValue.TIMESTAMP
          };
          chats.$add(chatMessage).then(function (data) {
            console.log("message added!!");
          });
        }
      }

    }
 });