angular.module('mymessenger.controllers', ['ionic'])

.controller('LoginCtrl', function($scope, $ionicModal, $state, $rootScope, $firebaseAuth, $ionicLoading, Auth) {
  console.log('Login Controller Initialized');
  //console.log($rootScope.FIREBASE_URL);

  /**
   * Check if already authenticated, then go to rooms view
   */
  Auth.$onAuth(function(authData) {
        if (authData) {
            console.log("Logged in as:", authData.uid);
            $state.go('tab.rooms');
        } else {
            console.log("Logged out");
        }
   });

  var ref = new Firebase(FIREBASE_URL);


  /**
   * ionicModal of the signup page
   */
  $ionicModal.fromTemplateUrl('js/views/signup/signup.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });


  /**
   * Create a new user with email and password
   */
  $scope.createUser = function(user) {
    console.log("Create User Function called");
        if (user && user.email && user.password && user.displayname) {
            $ionicLoading.show({
                template: 'Signing Up...'
            });

            Auth.$createUser({
                email: user.email,
                password: user.password
            }).then(function (userData) {
                alert("User created successfully!");
                ref.child("users").child(userData.uid).set({
                    email: user.email,
                    displayName: user.displayname
                });
                $ionicLoading.hide();
                $scope.modal.hide();
            }).catch(function (error) {
                alert("Error: " + error);
                $ionicLoading.hide();
            });
        } else
            alert("Information incomplete, please fill in the details");

  };


  /**
   * Authenticate the user with email and password
   */
  $scope.signIn = function(user) {
    if (user && user.email && user.pwdForLogin) {
        $ionicLoading.show({
            template: 'Signing In...'
        });
        Auth.$authWithPassword({
            email: user.email,
            password: user.pwdForLogin
        }).then(function (authData) {
            console.log("Logged in in login-ctrl as:" + authData.uid + " " + authData.password.email);
            ref.child("users").child(authData.uid).once('value', function (snapshot) {
                var val = snapshot.val();
                // To Update AngularJS $scope either use $apply or $timeout
                $scope.$apply(function () {
                    $rootScope.displayName = val;
                });
            });
            $ionicLoading.hide();
            $state.go('tab.rooms');
        }).catch(function (error) {
            alert("Authentication failed:" + error.message);
            $ionicLoading.hide();
        });
    } else
        alert("Please enter both email and password");
  };
});