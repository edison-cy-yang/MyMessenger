angular.module('mymessenger.services')

 
 .factory('Account', function ($firebaseArray, Rooms, Auth, $firebaseObject) {
     var ref = new Firebase(FIREBASE_URL);
     var authData = Auth.$getAuth();
     var userRef = ref.child('users').child(authData.uid);
     var userObject = $firebaseObject(userRef);
     var imageRef = userRef.child('profileImage');
     var profilePic;

     return {
         setProfilePic: function(imageData) {
             userRef.update({
                 profileImage: imageData
             });
         },

         getProfilePic: function(callback) {             
             userObject.$loaded().then(function (data) {
                 profilePic = data.profileImage;
                 callback(profilePic);
             });
            
         }
     }

 });