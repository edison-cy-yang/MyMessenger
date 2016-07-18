angular.module('mymessenger.controllers')

.controller('AddFriendCtrl', function($scope, Friends, $ionicHistory) {
    console.log("AddFriendCtrl initialized!");

    $scope.friend;

    $scope.searchFriend = function(email) {
        $scope.friend = Friends.search(email);
    };


    $scope.add = function(friend) {
        Friends.add(friend);
        console.log("friend email: " + friend.email);
        $ionicHistory.goBack();
    };


    $scope.goBack = function() {
        $ionicHistory.goBack();
    };

});