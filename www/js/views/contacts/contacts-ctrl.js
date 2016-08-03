angular.module('mymessenger.controllers')

.controller('ContactsCtrl', function($scope, Friends, $state) {
    console.log("ContactsCtrl initialized!");

    $scope.friends;

    $scope.$on('$ionicView.enter', function () {
      console.log('contacts $ionicView.enter');
      $scope.loadAllFriends();
    });

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


    /**
     * Load all friends with their profile pictures
     */
    $scope.loadAllFriends = function() {
        console.log("load all friends");
        $scope.friends = Friends.allWithProfilePic();
    }
});