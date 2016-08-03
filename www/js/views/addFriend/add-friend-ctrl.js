angular.module('mymessenger.controllers')

.controller('AddFriendCtrl', function($scope, Friends, $ionicHistory) {
    console.log("AddFriendCtrl initialized!");

    $scope.friend;


    /**
     * Search a user using email
     */
    $scope.searchFriend = function(email) {
        $scope.friend = Friends.search(email);
    };


    /**
     * Add the user as a friend
     */
    $scope.add = function(friend) {
        Friends.add(friend);
        console.log("friend email: " + friend.email);
        $ionicHistory.goBack();
    };


    /**
     * Go back to the previous view
     */
    $scope.goBack = function() {
        $ionicHistory.goBack();
    };

});