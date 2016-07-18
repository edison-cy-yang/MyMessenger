angular.module('mymessenger.controllers')

.controller('ContactsCtrl', function($scope, Friends, $state) {
    console.log("ContactsCtrl initialized!");

$scope.friends = Friends.all();

$scope.navAddFriend = function() {
    $state.go("addFriend");
}
});