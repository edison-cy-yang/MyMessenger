// Ionic Starter App
var FIREBASE_URL = "https://edimessenger.firebaseio.com/";
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('mymessenger', ['ionic', 'mymessenger.controllers', 'mymessenger.services', 'firebase', 'ngCordova'])

.run(function ($ionicPlatform, $rootScope, Auth, $state) {
     $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar          above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
             if(window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
             }


    /**
     * Check if the user was already authenticated, if yes go straight to room view,
     * 
     */
    var ref = new Firebase(FIREBASE_URL);
    Auth.$onAuth(function(authData) {
        if (authData) {
            console.log("Logged in as:", authData.uid);
            ref.child("users").child(authData.uid).once('value', function (snapshot) {
                var val = snapshot.val();
                // To Update AngularJS $scope either use $apply or $timeout
                //$scope.$apply(function () {
                    $rootScope.displayName = val;
               // });
                console.log("root displayName: " + $rootScope.displayName.displayName);
            });
            $state.go('tab.rooms');
        } else {
            console.log("Logged out");
        }
    });
    
 })})

    
.config(function ($stateProvider, $urlRouterProvider) {

$stateProvider


// Login View
.state('login', {
    url: "/login",
    templateUrl: "js/views/login/login.html",
    controller: 'LoginCtrl',
    resolve: {
        // controller will not be loaded until $waitForAuth resolves
        "currentAuth": ["Auth",
            function (Auth) {
                return Auth.$waitForAuth();
    }] }
})


// Abstract state for the tabs
.state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "js/views/tabs/tabs.html",
    resolve: {
        // controller will not be loaded until $requireAuth resolves
        "currentAuth": ["Auth",
            function (Auth) {
         // $requireAuth returns a promise so the resolve waits for it to complete
                return Auth.$requireAuth();
            }]
    }
})


// Room View
.state('tab.rooms', {
    cache: false,
    url: '/rooms',
    views: {
        'tab-rooms': {
            templateUrl: 'js/views/rooms/tab-rooms.html',
            controller: 'RoomsCtrl'
        }
    }
})


// Chat View
.state('chat', {
    cache: false,
    url: '/chat/:roomId',   
    templateUrl: 'js/views/chat/chat.html',
    controller: 'ChatCtrl'   
})


// Create Room View
.state('createRoom', {
    cache: false,
    url: '/createRoom',
    templateUrl: 'js/views/create/create-room.html',
    controller: 'CreateRoomCtrl'
})


// Account View
.state('tab.account', {
    cache: false,
    url: '/account',
    views: {
        'account': {
            templateUrl: 'js/views/account/account.html',
            controller: 'AccountCtrl'
        }
    }
})


// Contacts View
.state('tab.contacts', {
    cache: false,
    url: '/contacts',
    views: {
        'contacts': {
            templateUrl: 'js/views/contacts/contacts.html',
            controller: 'ContactsCtrl'
        }
    }
})


// Add Friend View
.state('addFriend', {
    cache: false,
    url: '/addFriend',
    templateUrl: 'js/views/addFriend/add-friend.html',
    controller: 'AddFriendCtrl'
})

       // if none of the above states are matched, use this as the fallback
       $urlRouterProvider.otherwise('/login');

});