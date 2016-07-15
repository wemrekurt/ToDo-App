// DRY
var app = angular.module('ToDo',['ngRoute']);

app.controller("TodoCtrl",function($scope){
  $scope.todonew="";
  $scope.todos = JSON.parse(localStorage.getItem("Todos")) || {0: {text:'Evi Temizle', state:false} };

  $scope.setTodo = function(){
    if($scope.todonew) {
      $scope.todos[Object.keys($scope.todos).length] = {text:$scope.todonew, state:false};
      $scope.setScope();
      $scope.todonew = '';
    }
  }

  $scope.clear = function(){
    angular.forEach($scope.todos, function(value, key) {
        if (value.state) delete $scope.todos[key];
    });
    $scope.setScope();
  }

  $scope.setScope = function(){
    localStorage.setItem('Todos', JSON.stringify($scope.todos));
  }

})

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html",
        controller : 'TodoCtrl'
    })
    .when("/notcompleted", {
        templateUrl : "notcompleted.html",
        controller : 'TodoCtrl'
    })
    .when("/completed", {
        templateUrl : "completed.html",
        controller : 'TodoCtrl'
    });
  });
