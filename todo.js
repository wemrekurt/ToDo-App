// DRY
var app = angular.module('ToDo',[]);

app.controller("TodoCtrl",function($scope){
  $scope.todonew="";
  $scope.todos = JSON.parse(localStorage.getItem("Todos")) || {0: {todoText:'Evi Temizle', done:false} };

  $scope.getTodo = function(){
    if($scope.todonew) {
      $scope.todos[Object.keys($scope.todos).length] = {todoText:$scope.todonew, done:false};
      $scope.setScope();
      $scope.todonew = '';
    }
  }

  $scope.clear = function(){
    angular.forEach($scope.todos, function(value, key) {
        if (value.done) delete $scope.todos[key];
    });
    $scope.setScope();
  }

  $scope.setScope = function(){
    localStorage.setItem('Todos', JSON.stringify($scope.todos));
  }

})
