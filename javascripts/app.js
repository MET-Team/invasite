var App = angular.module('App', ['ngRoute', 'ngAnimate', 'ngSanitize', 'googlemap-ng', 'LocalStorageModule', 'stickyfloat-ng', 'iso.directives']);

App.config(['$routeProvider', '$locationProvider', function($routes, $location) {

  $location.hashPrefix('!');

  $routes.when("/", {
    templateUrl: "javascripts/templates/about.html",
    reloadOnSearch: false
  })
    .when("/catalog", {
      templateUrl: "javascripts/templates/catalog.html",
      reloadOnSearch: false
    })
    .when("/catalog/:productId", {
      templateUrl: "javascripts/templates/product.html",
      reloadOnSearch: false
    })
    .when("/buy", {
      templateUrl: "javascripts/templates/buy.html",
      reloadOnSearch: false
    })

    .when("/delivery-payment", {
      templateUrl: "javascripts/templates/delivery-payment.html",
      reloadOnSearch: false
    })
    .when("/about", {
      templateUrl: "javascripts/templates/about.html",
      reloadOnSearch: false
    })
    .when("/contacts", {
      templateUrl: "javascripts/templates/contacts.html",
      reloadOnSearch: false
    })
    .when("/info", {
      templateUrl: "javascripts/templates/info.html",
      reloadOnSearch: false
    })

    .otherwise({
      templateUrl: 'javascripts/templates/404.html',
      reloadOnSearch: false
    });

}]);

App.filter("declOfNum", function() {
  return function(number, textVariants) {
    var cases = [2, 0, 1, 1, 1, 2];
    return textVariants[(number % 100 > 4 && number % 100 < 20 ? 2 : cases[(number % 10 < 5 ? number % 10 : 5)])];
  };
});

App.controller('ApplicationCtrl', function($scope, $location, $document){

  $scope.sidebarMenuIsOpen = false;
  $scope.OrderCallFormIsOpen = false;
  $scope.HeaderOrderCallFormIsOpen = false;

  $scope.orderCallData = {};

  var Today = new Date();
  $scope.currentDate = Today.getTime();

  $scope.toggleSidebarMenu = function(){
    $scope.sidebarMenuIsOpen = $scope.sidebarMenuIsOpen ? false : true;
  };

  $scope.toggleOrderCallForm = function(){
    $scope.OrderCallFormIsOpen = $scope.OrderCallFormIsOpen ? false : true;
  };

  $scope.toggleHeaderOrderCallForm = function(){
    $scope.HeaderOrderCallFormIsOpen = $scope.HeaderOrderCallFormIsOpen ? false : true;
  };

  $scope.orderCall = function(){
    console.log($scope.orderCallData)
  };

});

App.controller('CatalogCtrl', function($scope, $http, $location){

  $scope.isoOptions = {
    layoutMode: 'fitRows'
  };

  $scope.carriageTypes = {
    0 : {
      'type': 'electric',
      'title': 'Электрические'
    },
    1 : {
      'type': 'mechanic',
      'title': 'Механические'
    }
  };

  $scope.carriageOptions = {
    'electric' : {
      0: 'Складные',
      1: 'Большой запас хода',
      2: 'Вертикализатор'
    },
    'mechanic' : {
      0: 'Домашние',
      1: 'Для улицы',
      2: 'Высокая спинка'
    }
  };

  $scope.sortType = [
    {
      'name': 'name',
      'title': 'По названию'
    },
    {
      'name': 'price',
      'title': 'По ценам'
    }
  ];

  $scope.carriageTypeSelected = 'mechanic';

  if($location.search().type) {
    $scope.carriageTypeSelected = $location.search().type;
  }

  $scope.activeOptionsFilter = [];

  $scope.getCarriageOptions = function(){
    $scope.carriageOptionsByType = $scope.carriageOptions[$scope.carriageTypeSelected];
  };

  $scope.getProducts = function(){
    var carriageType = $scope.carriageTypeSelected;

    $scope.productsList = [];

    $http.get('javascripts/factories/carriage/'+ carriageType +'.json')
      .success(function(data){
        $scope.productsList = data;

        for(item in $scope.productsList){
          var productItem = $scope.productsList[item];

          productItem.visible = true;

          if(productItem.options.length > 0 && $scope.activeOptionsFilter.length > 0){
            productItem.visible = false;

            for(option in productItem.options){
              if($scope.activeOptionsFilter.indexOf(productItem.options[option]) > -1){
                productItem.visible = true;
              }
            }
          }
        }
      }).error(function(){
        console.error('Произошла ошибка');
      });
  };

  $scope.getProducts();

  $scope.$on('$routeUpdate', function() {
    if($location.search().type) {
      $scope.carriageTypeSelected = $location.search().type;
      $scope.getProducts();
    }
  });

  $scope.getCarriageOptions();

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

    $scope.getProducts();

  };

  $scope.priceOrderProperty = 'price';

  $scope.togglePriceOrderProperty = function(){
    $scope.priceOrderProperty = $scope.priceOrderProperty == 'price' ? '-price' : 'price';
    $scope.getProducts();
  };

});

App.controller('ProductCtrl', function($scope, $http, $filter, localStorageService, $location){

  $scope.productsItemData = {};

  $scope.functionTypes = [];
  $scope.functionsList = [];

  $scope.functionTypeSelected = 0;
  $scope.functionsSelected = [];

  $scope.functionTotalOpened = false;

  $scope.additionalPrice = 0;
  $scope.totalPrice = 0;

  $scope.optionsCountLabel = '';

  $scope.recalcTotalPrice = function(){

    $scope.totalPrice = $scope.productsItemData.price;

    $scope.additionalPrice = 0;

    if($scope.functionsSelected.length > 0){
      for(item in $scope.functionsSelected){
        $scope.additionalPrice = $scope.additionalPrice + $scope.functionsSelected[item].price;
        $scope.totalPrice = $scope.totalPrice + $scope.functionsSelected[item].price;
      }
    }

    $scope.optionsCountLabel = $filter('declOfNum')($scope.functionsSelected.length, ['опция', 'опции', 'опций']);

  };

  $http.get('javascripts/factories/carriage/item.json')
    .success(function(data){

      $scope.productsItemData = data;

      $scope.totalPrice = $scope.productsItemData.price;

      $scope.carriageFunctions = $scope.productsItemData.functions;

      for(item in $scope.carriageFunctions){
        if($scope.carriageFunctions.hasOwnProperty(item)){

          $scope.functionTypes.push({
            "name" : $scope.carriageFunctions[item].title,
            "value" : item
          });

        }
      }

      $scope.showOptionsByType($scope.functionTypeSelected);

      $scope.recalcTotalPrice();

    }).error(function(){
      console.error('Произошла ошибка');
    });

  $scope.showOptionsByType = function(index){
    $scope.functionsList = $scope.carriageFunctions[index];
    $scope.functionTypeSelected = index;
  };

  $scope.toggleFunction = function(functionItem){

    var functionSelectedIndex = $scope.functionsSelected.indexOf(functionItem);

    if(functionSelectedIndex > -1){
      $scope.functionsSelected.splice(functionSelectedIndex, 1)
    }else{
      $scope.functionsSelected.push(functionItem);
    }

    if($scope.functionsSelected.length == 0){
      $scope.functionTotalOpened = false;
    }

    $scope.recalcTotalPrice();

  };

  $scope.toggleSelectedFunctionsList = function(){
    $scope.functionTotalOpened = $scope.functionTotalOpened ? false : true;
  };

  $scope.buyProduct = function(){

    var productToBuy = {
      name: $scope.productsItemData.name,
      artikul: $scope.productsItemData.artikul,
      price: $scope.productsItemData.price,
      priceAdditional: $scope.additionalPrice,
      functions: $scope.functionsSelected
    };

    localStorageService.set('productToBuy', productToBuy);

    $location.path('/buy').replace();

  };

});

App.controller('BuyCtrl', function($scope, $http, localStorageService){

  $scope.productItem = localStorageService.get('productToBuy');

  if($scope.productItem) {
    $scope.additionalPrice = $scope.productItem.priceAdditional;
    $scope.functionsSelected = $scope.productItem.functions;
  }

  $scope.functionsListOpened = true;

  $scope.recalcFunctionsPrice = function(){
    $scope.additionalPrice = 0;

    if($scope.functionsSelected.length > 0){
      for(item in $scope.functionsSelected){
        $scope.additionalPrice = $scope.additionalPrice + $scope.functionsSelected[item].price;
      }
    }

    $scope.productItem.priceAdditional = $scope.additionalPrice;

  };

  $scope.removeFunction = function(functionItem){

    var functionSelectedIndex = $scope.functionsSelected.indexOf(functionItem);

    if(functionSelectedIndex > -1){
      $scope.functionsSelected.splice(functionSelectedIndex, 1)
    }

    $scope.recalcFunctionsPrice();

    $scope.productItem.functions = $scope.functionsSelected;
    localStorageService.set('productToBuy', $scope.productItem);

  };

  $scope.removeItem = function(){
    $scope.productItem = null;
    localStorageService.set('productToBuy', $scope.productItem);
  };

  $scope.toggleFunctionList = function(){
    $scope.functionsListOpened = $scope.functionsListOpened ? false : true;
  };

  $scope.deliveryItems = [
    {
      title: 'Самовывоз по Москве',
      price: 'Бесплатно'
    },
    {
      title: 'Курьероaм по Москве и области',
      priceRange: {
        from: 0,
        to: 900
      }
    },
    {
      title: 'Доставка по России, Казахстану, Белоруссии транспортной компанией',
      priceRange: {
        from: 0,
        to: 500
      }
    }
  ];

  $scope.selectedDelivery = null;

  $scope.toggleDeliveryItem = function(item){
    if($scope.selectedDelivery != item){
      $scope.selectedDelivery = item;
    }else{
      $scope.selectedDelivery = null;
    }

  };

});

App.controller('ContactsCtrl', function($scope, $http){

});