angular.module('mymessenger.controllers')

.controller('ContactsCtrl', function($scope, Friends, $state) {
    console.log("ContactsCtrl initialized!");


$scope.navAddFriend = function() {
    $state.go("addFriend");

}
});