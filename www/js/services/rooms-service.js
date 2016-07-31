angular.module('mymessenger.services')


 .factory('Rooms', function ($firebaseArray, Auth, $firebaseObject){
   console.log("Rooms service initialized!");
   var ref = new Firebase(FIREBASE_URL);
   var rooms = $firebaseArray(ref.child('rooms'));
   

   var authData = Auth.$getAuth();
   console.log("AUTH DATA IS: " + authData.uid);

   var roomsForUser = $firebaseArray(ref.child('users').child(authData.uid).child('rooms'));
  
   return {
     all: function() {
       return rooms;
     }, 
     get: function(roomId){
       return rooms.$getRecord(roomId);
     },
     createRoom: function(chatRoom) {
       rooms.$add(chatRoom).then(function (data) {
         console.log("Chat room added!");
       });

     },
     remove: function(chatRoom) {
       console.log("room id: " + chatRoom.$id);
       rooms.$remove(chatRoom.$id).then(function(ref) {
         console.log("room deleted!");
         ref.key() === chatRoom.$id;
       });
     },
     /**
      * Get the rooms for current user:
      * returns a list of rooms, one room for each friend
      */
     roomsForUser: function() {
               
        var allRooms = [];
        roomsForUser.$loaded().then(function(x) {
          
          
          for(var i = 0; i < roomsForUser.length; i++) {
            console.log('room is: ' + roomsForUser[i].roomId);
            var firebaseRoom = $firebaseObject(ref.child('rooms').child(roomsForUser[i].roomId));
            firebaseRoom.$loaded().then(function (room) { // data is room
                if(room.user1 !== authData.uid) {
                  console.log("room.user1: " + room.user1 + " authData.uid: " + authData.uid);
                   var friendObj = $firebaseObject(ref.child('users').child(room.user1));
                   friendObj.$loaded().then(function (friend) {
                      room.name = friend.displayName;
                   });
                }
                else {
                   console.log("room.user2: " + room.user2 + " authData.uid: " + authData.uid);
                   var friendObj = $firebaseObject(ref.child('users').child(room.user2));
                   friendObj.$loaded().then(function (friend) {
                      room.name = friend.displayName;
                   });
                }
                allRooms.push(room);
                // console.log("data is: " + data.name);
                // console.log("firebaseRoom is: " + firebaseRoom.name);
                // console.log(data === firebaseRoom);
            })
            .catch(function (error) {
              console.error("Error", error);
            });
            
          }
        })
        .catch(function(error) {
          console.log("Error:", error);
        });

        return allRooms;
     }

   }
 });