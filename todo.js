var app = angular.module('ToDo',[]);

app.controller("TodoCtrl",function($scope){

  $scope.todonew="";
  $scope.todos = [{todoText:'Evi Temizle', done:false}];

  $scope.getTodo = function(){
    if($scope.todonew) {
      $scope.todos.push({todoText:$scope.todonew, done:false});
      $scope.todonew = '';
    }
  }

  $scope.clear = function(){
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(x) {
        if (!x.done) $scope.todos.push(x);
    });
  }

})
