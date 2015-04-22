angular.module('ProductCtrl', []).controller('ProductCtrl', function($scope, $http, $filter, localStorageService, $location, Basket){

  $scope.product = [];
  $scope.basketList = [];

  $http.get('javascripts/factories/products/item.json')
    .success(function(data){
      $scope.product = data;
    }).error(function(){
      console.error('Произошла ошибка');
    });

  $scope.showOptionsByType = function(index){
    $scope.functionsList = $scope.carriageFunctions[index];
    $scope.functionTypeSelected = index;
  };

  $scope.buyProduct = function(){
    $scope.basketList.push({
      name: $scope.product.name,
      price: $scope.product.price
    });

    $scope.totalPrice = 0;
    if($scope.basketList.length > 0){
      for(item in $scope.basketList){
        $scope.totalPrice += $scope.basketList[item].price;
      }
    }

    localStorageService.set('basketList', $scope.basketList);

    Basket.list = $scope.basketList;
    Basket.totalPrice = $scope.totalPrice;
  };

  $scope.viewItems = ['Вращение', '3D'];
  $scope.viewItemSelected = 0;
  $scope.hintEnabled = false;

  $scope.changeView = function(index){
    $scope.viewItemSelected = index;
    if($scope.viewItemSelected == 1){
      $scope.hintEnabled = true;
    }
  };

  $scope.continueView = function(){
    $scope.hintEnabled = false;
  };

  $scope.showHiddenCharacters = false;
  $scope.toggleMoreCharacters = function(){
    $scope.showHiddenCharacters = $scope.showHiddenCharacters ? false : true;
  };

});