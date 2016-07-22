angular.module('mymessenger.controllers')

.controller('AccountCtrl', function($scope, $state, $cordovaCamera, $firebaseArray, Account) {
    console.log("AccountCtrl initialized!");


    var ref = new Firebase(FIREBASE_URL);
    


    /**
     * Log out of the app
     */
    $scope.logout = function() {
        console.log("logout function called");
        ref.unauth();
        $state.go('login');
    };


    /**
     * Take profile picture and save it to user
     */
    $scope.takeProfilePic = function() {
        var options = {
                quality : 100,
                destinationType : Camera.DestinationType.DATA_URL,
                sourceType : Camera.PictureSourceType.CAMERA,
                allowEdit : true,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                targetWidth: 500,
                targetHeight: 500,
                saveToPhotoAlbum: false
            };
            $cordovaCamera.getPicture(options).then(function(imageData) {
            //    Chats.sendImage($scope.displayName, imageData);
                Account.setProfilePic(imageData);

            }, function(error) {
               console.error(error);
            });
    }

    /**
     * Load profile pic from firebase to display
     */
    $scope.loadProfilePic = function() {
         Account.getProfilePic(function (profilePic) {
            $scope.profilePic = profilePic;
            // console.log($scope.profilePic);
         });
    }
});