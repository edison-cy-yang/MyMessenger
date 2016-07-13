angular.module('mymessenger.services', ['firebase'])

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
 });