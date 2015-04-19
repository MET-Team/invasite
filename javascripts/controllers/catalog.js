angular.module('CatalogCtrl', []).controller('CatalogCtrl', function($scope, $http, $location, $filter){

  $scope.carriageType = {
    list: [
      {
        value: "mechanic",
        title: "Механические коляски"
      },
      {
        value: "electric",
        title: "Электрические коляски"
      },
      {
        value: "active",
        title: "Активные коляски"
      }
      ,
      {
        value: "child",
        title: "Детские коляски"
      }
    ],
    selected: "mechanic"
  };

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
    var carriageType = $scope.carriageTypeSelected;

    $scope.productsList = [];

    $http.get('javascripts/factories/products/list.json')
      .success(function(data){
        $scope.productsList = data;
      }).error(function(){
        console.error('Произошла ошибка');
      });
  };

  $scope.getProducts();

  $scope.changeType = function(type){
    $scope.carriageTypeSelected = type;
    $scope.getCarriageOptions();
    $scope.activeOptionsFilter = [];
    $scope.getProducts();
  };

  $scope.filterOptions = function (filter_item) {

    var index = $scope.activeOptionsFilter.indexOf(filter_item);
    if (index > -1) {
      $scope.activeOptionsFilter.splice(index, 1);
    }else {
      $scope.activeOptionsFilter.push(filter_item);
    }

//    $scope.getProducts();

  };

  $scope.priceOrderProperty = 'price';

  $scope.togglePriceOrderProperty = function(){
    $scope.priceOrderProperty = $scope.priceOrderProperty == 'price' ? '-price' : 'price';
    $scope.getProducts();
  };

});