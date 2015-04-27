angular.module('SearchCtrl', []).
controller('SearchCtrl', function($scope, $location, $http, $rootScope){

  $scope.carriageTypeIdToCaption = {
    6: 'active',
    1: 'mechanic',
    2: 'electric'
  };

  $scope.searchString = $location.search().query;

  $scope.searchProducts = function(){
    if($scope.searchString){
      $http.get($rootScope.domain +'/api/v1/sites/4/products', {
        params: {
          keywords_cont: $scope.searchString
        }
      }).success(function(data){
        $scope.productsList = data;

        if($scope.productsList.length > 0){
          for(index in $scope.productsList){
            $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productsList[index].id)
              .success(function(data){
                if(data){
                  $scope.productsList[index].type = $scope.carriageTypeIdToCaption[data.kind_id];
                }
              }).error(function(){
                console.error('Произошла ошибка');
              });
          }
        }
      }).error(function(){
        console.error('Произошла ошибка');
      });
    }
  };

  $scope.searchProducts();

  $scope.$on('$locationChangeSuccess', function() {
    $rootScope.searchString = $rootScope.searchString || '';

    $scope.searchString = $rootScope.searchString;
    $scope.searchProducts();
  });

});