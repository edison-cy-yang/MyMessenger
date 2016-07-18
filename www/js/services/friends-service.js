angular.module('mymessenger.services')


 .factory('Friends', function ($firebaseArray, Auth){


    var authData = Auth.$getAuth();
    var ref = new Firebase(FIREBASE_URL);
    var usersRef = ref.child('users');
    var users = $firebaseArray(ref.child('users'));
    var friends = $firebaseArray(ref.child('users').child(authData.uid).child('friends'));

    return {
        search: function(email) {
            var friend;
            usersRef.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
                console.log(snapshot.key());
                friend = users.$getRecord(snapshot.key());
                console.log("friends name: " + friend.displayName);
            });
            return friend;
        }, 
        all: function() {
            return friends;
        }
    }
 });