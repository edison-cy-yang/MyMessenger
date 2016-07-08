angular.module('mymessenger.services', ['firebase'])

.factory("Auth", ["$firebaseAuth", "$rootScope", 
    function($firebaseAuth, $rootScope) {
        var ref = new Firebase(FIREBASE_URL);
        return $firebaseAuth(ref);
 }]);