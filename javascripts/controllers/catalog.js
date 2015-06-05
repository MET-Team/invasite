angular.module('CatalogCtrl', []).controller('CatalogCtrl', function($rootScope, $scope, $http, $location, $routeParams, $filter, Compare){

  $scope.catalogGroupSelected = $routeParams.productGroupName || 'carriage';

  $rootScope.$watch('carriageType.selected', function(newValue, oldValue){
    if($scope.catalogGroupSelected == 'carriages' && newValue != oldValue){
      $rootScope.carriageType.selected = $rootScope.carriageTypeSelected ;
      $scope.changeCarriageType(newValue);
    }
  });

  $scope.brand = {
    list: [
      {
        value: "Invacare",
        title: "Invacare"
      },
      {
        value: "Kuschal",
        title: "Kuschal"
      },
      {
        value: "Ottobock",
        title: "Ottobock"
      },
      {
        value: "Rebotec",
        title: "Rebotec"
      },
      {
        value: "Artlebedev",
        title: "Artlebedev"
      }
    ],
    selected: null
  };

  $scope.presence = {
    list: [
      {
        value: 1,
        title: "На складе"
      },
      {
        value: 2,
        title: "Под заказ"
      }
    ],
    selected: null
  };

  $scope.price = {
    list: [
      {
        value: "1",
        title: "0 - 1 000"
      },
      {
        value: "2",
        title: "1 000 - 10 000"
      },
      {
        value: "3",
        title: "10 000 - 30 000"
      },
      {
        value: "4",
        title: "30 000 - 50 000"
      },
      {
        value: "5",
        title: "50 000 - 100 000"
      }
    ],
    selected: null
  };

  $scope.features = [
    "Домашние",
    "Для улицы",
    "Высокая спинка",
    "Облегченные",
    "Для узких проемов",
    "Откидная спинка"
  ];

  $scope.activeOptionsFilter = [];

  $scope.getProducts = function(){

    var searchParams = {},
      kindId = 0;

    var carriageType = $rootScope.carriageTypeSelected;
    for(carriageItem in $rootScope.carriageType){
      if($rootScope.carriageType.hasOwnProperty(carriageItem)){
        if($rootScope.carriageType[carriageItem].value == carriageType){
          kindId = $rootScope.carriageType[carriageItem].id;
          searchParams.kind_id_eq = $rootScope.carriageType[carriageItem].id;
        }
      }
    }

    if(kindId > 0) {
      $http.get($rootScope.domain + '/api/v1/kinds/' + kindId + '/filters')
        .success(function (data) {
          $scope.carriageOptions = data;
        }).error(function () {
          console.error('Произошла ошибка');
        });
    }

    $http.get($rootScope.domain +'/api/v1/sites/'+ $rootScope.site_id +'/products')
      .success(function(data){
        $scope.productsList = data;
        $scope.productsList.forEach(function(productItem){

          productItem.href = productItem.id;

          if(Compare.comparedProductsExists(productItem)){
            productItem.compareDisabled = true;
          }
        });
      }).error(function(){
        console.error('Произошла ошибка');
      });
  };

  $scope.getProducts();

  $scope.changeCarriageType = function(type){
    $location.path('/catalog/carriages/' + type);

    $rootScope.carriageTypeSelected = type;
    $rootScope.carriageType.selected = type;
    $scope.activeOptionsFilter = [];
  };

  $scope.filterOptions = function (filter_item) {

    var index = $scope.activeOptionsFilter.indexOf(filter_item);
    if (index > -1) {
      $scope.activeOptionsFilter.splice(index, 1);
    }else {
      $scope.activeOptionsFilter.push(filter_item);
    }

    $scope.getProducts();

  };

  $scope.priceOrderProperty = 'price';

  $scope.togglePriceOrderProperty = function(){
    $scope.priceOrderProperty = $scope.priceOrderProperty == 'price' ? '-price' : 'price';
    $scope.getProducts();
  };

  $scope.compareProduct = function(productListItem){
    if(!productListItem.compareDisabled) {
      Compare.add(productListItem.id);
      productListItem.compareDisabled = true;
    }
  };

});