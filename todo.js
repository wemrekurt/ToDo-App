// DRY
var app = angular.module('ToDo',['ngRoute']);

app.controller("TodoCtrl",function($scope, $http){
  $scope.todonew="";

  /*
  * Todo elemanları rails tarafından çağrılarak scopa'a eklenir.
  */
  $http.get("http://localhost:3000/jobs.json")
    .then(function(response) {
        $scope.todos = response.data;
    });

  /**
  * TODDO elemanını railse post ile gönder ve scope'a ekle
  */
  $scope.setTodo = function(){
    if($scope.todonew) {

      $http({
        method: 'POST',
        url: 'http://localhost:3000/jobs.json',
        data: {title: $scope.todonew, state: false}
      }).then(function successCallback(response) {
            if(response.data.id){
              // $scope.todos[$scope.getKey()] = {id:response.data.id, title:response.data.title, state:false};
              $scope.todos.push({id:response.data.id, title:response.data.title, state:false});
            }else{
              alert('Error! Rails problem');
            }
        }, function errorCallback(response) {
            alert("Error!");
        });
      $scope.todonew = '';
    }
  }

  /**
  * TODDO elemanını railste siler ve scopedaki o keye ait itemı siler. o item undefined olur.
  * Örneğin delete işlemi yapıldığında console.log($scope.todos[key]) çıktısı undefined olur.
  */
  $scope.clear = function(){
    angular.forEach($scope.todos, function(value, key) {
        if (value.state){
          $http({
            method: 'DELETE',
            url: 'http://localhost:3000/jobs/'+ value.id +'.json',
            data: {id: value.id}
          }).then(function successCallback(response){
               delete $scope.todos[key];
            }
          )
        }
    });
  }

  /**
  * TODDO'da elemanı günceller. Checkbox tıklandığında scope zaten güncellendiği için sadece rails'e istek gönderilir.
  */
  $scope.setScope = function(key){
    $http({
      method: 'PATCH',
      url: 'http://localhost:3000/jobs/'+ $scope.todos[key].id +'.json',
      data: $scope.todos[key]
    }).then(function successCallback(response) {
          if(!response.data.id){
            alert('Error! Rails problem');
          }
      }, function errorCallback(response) {
          alert("Error!");
      });

  }

})

/**
* Rota Ayarları
*/

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
