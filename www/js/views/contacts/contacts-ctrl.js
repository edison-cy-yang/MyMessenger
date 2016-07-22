angular.module('mymessenger.controllers')

.controller('ContactsCtrl', function($scope, Friends, $state) {
    console.log("ContactsCtrl initialized!");

    $scope.friends = Friends.all();

    $scope.navAddFriend = function() {
        $state.go("addFriend");
    }


    $scope.remove = function(friend) {
        Friends.remove(friend);
    }

    /**
     * Open a specific chat room
     */
    $scope.openChatRoom = function (roomId) {
        console.log("room id is: " + roomId);
        $state.go('tab.rooms').then(function () {
            $state.go('chat', {
                roomId: roomId
            });
        });
    }
});