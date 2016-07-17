angular.module('mymessenger.controllers')

.controller('AccountCtrl', function($scope, $state, $cordovaCamera, $firebaseArray) {
    console.log("AccountCtrl initialized!");


    var ref = new Firebase(FIREBASE_URL);
    var syncImages = $firebaseArray(ref.child("images"));
    $scope.images = [];

    $scope.images = syncImages;
    

    $scope.logout = function() {
        console.log("logout function called");
        ref.unauth();
        $state.go('login');
    }
});