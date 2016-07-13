angular.module('mymessenger.controllers')

.controller('AccountCtrl', function($scope, $state) {
console.log("AccountCtrl initialized!");

var ref = new Firebase(FIREBASE_URL);

$scope.logout = function() {
    console.log("logout function called");
    ref.unauth();
    $state.go('login');
}
});