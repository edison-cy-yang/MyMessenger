angular.module('mymessenger.services')


 .factory('Friends', function ($firebaseArray, Auth, Rooms){


    var authData = Auth.$getAuth();
    var ref = new Firebase(FIREBASE_URL);
    var usersRef = ref.child('users');
    var users = $firebaseArray(ref.child('users'));
    var friends = $firebaseArray(ref.child('users').child(authData.uid).child('friends'));
    var rooms = $firebaseArray(ref.child('rooms'));

    return {
        search: function(email) {
            var friend;
            var friendWithUid;
            usersRef.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
                console.log(snapshot.key());
                friend = users.$getRecord(snapshot.key());
                friendWithUid = {
                    displayName: friend.displayName,
                    email: friend.email,
                    uid: snapshot.key()
                }
                console.log("friends name: " + friendWithUid.displayName);
            });
            
            return friendWithUid;
        }, 
        all: function() {
            return friends;
        },
        add: function(friend) {
            // usersRef.orderByChild("email").equalTo(friend.email).on("child_added", function(snapshot) {
            //     console.log(snapshot.key());
                //friend = users.$getRecord(snapshot.key());
                var room = {
                    name: friend.displayName,
                };
                var roomKey;
                rooms.$add(room).then(function (data) {
                    console.log("key of the room: " + data.key());
                    roomKey = data.key();
                    console.log("roomKey: " + roomKey);
                    friend.roomId = roomKey;
                    console.log("roomId: " + friend.roomId);
                    friends.$add(friend).then(function (data) {
                        console.log("friend added!");
                    });
                });
                
                
                

                console.log("friends name: " + friend.displayName);
            // });
        },
        remove: function(friend) {
            friends.$remove(friend).then(function(ref) {
                // ref.key() === chatRoom.$id;
            });
        }
    }
 });