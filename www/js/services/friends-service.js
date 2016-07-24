angular.module('mymessenger.services')


 .factory('Friends', function ($firebaseArray, Auth, Rooms, $firebaseObject){


    var authData = Auth.$getAuth();
    var ref = new Firebase(FIREBASE_URL);
    var usersRef = ref.child('users');
    var users = $firebaseArray(ref.child('users'));
    var friends = $firebaseArray(ref.child('users').child(authData.uid).child('friends'));
    var rooms = $firebaseArray(ref.child('rooms'));
    var currentUser = $firebaseObject(ref.child('users').child(authData.uid));


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
        /**
         * Load all the friends with their profile pictures
         */
        allWithProfilePic: function() {
            var friendsWithImages = [];
            friends.$loaded().then(function (frds) {
                friends.forEach(function (friend) {
                    var friendsId = friend.uid;
                    var friendUser = $firebaseObject(usersRef.child(friendsId));
                    friendUser.$loaded().then(function (data) {
                        console.log("friends name: " + friendUser.displayName);
                        // user object for displayName and profileImage, the only information we need
                        var user = {
                            displayName: friendUser.displayName,
                            profileImage: friendUser.profileImage
                        };
                        friendsWithImages.push(user);

                    });            
                });
            });
            return friendsWithImages;
        },
        add: function(friend) {
                var room = {
                    name: currentUser.displayName + " and " +friend.displayName,
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
                    
                    ///Now add yourself to your friend's friend list
                    var currentUser = users.$getRecord(authData.uid);
                    var c_user = {
                        displayName: currentUser.displayName,
                        email: currentUser.email,
                        uid: authData.uid,
                        roomId: roomKey
                    };
                    
                    
                    var friendsFriends = $firebaseArray(ref.child('users').child(friend.uid).child('friends'));
                    friendsFriends.$add(c_user).then(function (data) {
                        console.log("Added myself to my friend's friend list!");
                    });


                    ///Add the room id to the list of rooms current user can access
                    var userRooms = $firebaseArray(usersRef.child(authData.uid).child('rooms'));
                    var userRoom = {
                        roomId: roomKey
                    }
                    userRooms.$add(userRoom);

                    var friendRoom = {
                        roomId: roomKey
                    }
                    var friendRooms = $firebaseArray(usersRef.child(friend.uid).child('rooms'));
                    friendRooms.$add(friendRoom);

                });
                
                
                

                console.log("friends name: " + friend.displayName);
        },
        remove: function(friend) {
            friends.$remove(friend).then(function(ref) {
                // ref.key() === chatRoom.$id;
            });
        }
    }
 });