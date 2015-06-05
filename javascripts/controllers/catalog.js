angular.module('CatalogCtrl', []).controller('CatalogCtrl', function($rootScope, $scope, $http, $location, $routeParams, $filter, Compare){

  $scope.catalogGroupSelected = $routeParams.productGroupName || 'carriage';

  $scope.carriageType = {
    list: [
      {
        value: "mechanic",
        title: "Механические коляски",
        id: 1
      },
      {
        value: "electric",
        title: "Электрические коляски",
        id: 2
      },
      {
        value: "active",
        title: "Активные коляски",
        id: 6
      }
      ,
      {
        value: "child",
        title: "Детские коляски",
        id: 3
      }
    ]
  };
  $scope.carriageType.selected = $routeParams.carriageType || 'mechanic';

  $scope.carriageTypeSelected = 'mechanic';

  $scope.$watch('carriageType.selected', function(newValue, oldValue){
    if($scope.catalogGroupSelected == 'carriages' && newValue != oldValue){
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

    var carriageType = $scope.carriageTypeSelected;
    for(carriageItem in $scope.carriageType){
      if($scope.carriageType.hasOwnProperty(carriageItem)){
        if($scope.carriageType[carriageItem].value == carriageType){
          kindId = $scope.carriageType[carriageItem].id;
          searchParams.kind_id_eq = $scope.carriageType[carriageItem].id;
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

    console.log(type);

    $location.path('/catalog/carriages/' + type);

    $scope.carriageTypeSelected = type;
//    $scope.getCarriageOptions();
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