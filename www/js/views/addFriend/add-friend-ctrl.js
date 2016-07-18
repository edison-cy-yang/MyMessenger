angular.module('mymessenger.controllers')

.controller('AddFriendCtrl', function($scope, Friends) {
    console.log("AddFriendCtrl initialized!");

    $scope.friend;

    $scope.searchFriend = function(email) {
        $scope.friend = Friends.search(email);
    };


    $scope.add = function(friend) {
        console.log("friend email: " + friend);
    }

});