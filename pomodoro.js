var module = angular.module("PomodoroModule",[]);
module.controller("DisplayTime", displayTime);

function displayTime($scope) {
  $scope.minutes = 5;
  $scope.seconds = 0;
  $scope.displaySeconds;
  $scope.startTimer = false;
  $scope.break = 5;
  $scope.session = 5
  var runTimer;
  $scope.isSession = true;
    
  var fillColor = function(isSession) {
    if(!isSession) {
      (document.getElementsByClassName("header1")[0]).style.backgroundColor = "red";
      (document.getElementsByClassName("header2")[0]).style.backgroundColor = "#A1A1A1";
    // (".header1").style.backgroundColor = "green";
    } else {
      (document.getElementsByClassName("header2")[0]).style.backgroundColor = "green";
      (document.getElementsByClassName("header1")[0]).style.backgroundColor = "#A1A1A1";
    }
  }
  $scope.divOnClick = function() {
    $scope.startTimer = !($scope.startTimer);
    if($scope.startTimer) {
      console.log("$scope.startTimer ", $scope.startTimer);
      runTimer = setInterval(function() {
                  fillColor($scope.isSession);
                     
                  if($scope.seconds === 0) {
                    if($scope.minutes ===0) {
                     /*----after a session is over Break Period starts------*/
                     $scope.minutes = ($scope.isSession) ? ($scope.break) : ($scope.session);
                     $scope.isSession = !($scope.isSession);
                     console.log("$scope.minutes ", $scope.minutes);
                     console.log("$scope.isSession ", $scope.isSession);
                     $scope.seconds = 0;
                     }
                    $scope.seconds = 59;
                    $scope.minutes -= 1;
                  } else {
                    $scope.seconds = ($scope.seconds - 1) ; 
                  }
                 var secondsLength = $scope.seconds.toString().length;
                 $scope.displaySeconds = (secondsLength > 1)?(":" + $scope.seconds):(secondsLength === 1)?(":0" + $scope.seconds) : (":00" + $scope.seconds)
                  
                 $scope.$apply();
               },1000);
      } else {
       clearInterval(runTimer);
    } 
   }

   $scope.increment = function(value) {
      if(value === "break") {
        $scope.break += 1;
        console.log($scope.break);
      } else {
        $scope.session += 1;
        $scope.minutes = $scope.session;
        console.log($scope.session);
      }
   }
   $scope.decrement = function(value) {
      if(value === "break") {
        $scope.break = ( ($scope.break - 1)  >= 1) ?  $scope.break - 1  : 1; 
      } else {
        var newSessionLength = $scope.session-1;
        $scope.session = (newSessionLength >= 1) ? newSessionLength : 1;
        $scope.minutes = $scope.session
      }
}
}


