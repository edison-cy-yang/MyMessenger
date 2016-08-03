angular.module('mymessenger.services')

 
 .factory('Chats', function ($firebaseArray, Rooms) {
   
   var selectedRoomId;
   
    var ref = new Firebase(FIREBASE_URL);
    var images = $firebaseArray(ref.child('images'));
    var chats;

    return {
      /**
       * Return all the messages
       */
      all: function() {
        return chats;
      }, 
      /**
       * Remove a message
       */
      remove: function(chat) {
        chats.$remove(chat).then(function (ref) {
          ref.key() === chat.$id;
        });
      },
      /**
       * Get a specific message
       */
      get: function(chatId) {
        for(var i = 0; i < chats.length; i++) {
          if(parseInt(chatId) === chats[i].id) {
            return chats[i];
          }
        }
        return null;
      },
      /**
       * Return the name of the selected room
       */
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
      /**
       * Select a room, which will then load all the messages in that room
       */
      selectRoom: function(roomId) {
        console.log("selecting the room with id: " + roomId);
        selectedRoomId = roomId;
        // Load all the messages in this room
        chats = $firebaseArray(ref.child('rooms').child(selectedRoomId).child('chats'));
        console.log("rooms selected: " + selectedRoomId);      
      },
      /**
       * Send a text message
       */
      send: function(from, message, id) {
        console.log("sending message from: " + from.displayName + " & message is " + message);
        if(from && message) {
          var chatMessage = {
            from: from.displayName,
            userId: id,
            message: message,
            isImage: false,
            createdAt: Firebase.ServerValue.TIMESTAMP
          };
          chats.$add(chatMessage).then(function (data) {
            console.log("message added!!");
          });
        }
      },
      /**
       * Send an image as a message
       */
      sendImage: function(from, imageData, id) {
        console.log("sending image from: " + from.displayName);
        if(from && imageData) {
          var imageMessage = {
            from: from.displayName,
            userId: id,
            message: " test",
            isImage: true,
            image: imageData,
            createdAt: Firebase.ServerValue.TIMESTAMP
          };
          chats.$add(imageMessage).then(function () {
            console.log("image added!!");
          });
          images.$add({image: imageData}).then(function () {
            console.log("image added to firebase image!");
          })
        }
      }

    }
 });