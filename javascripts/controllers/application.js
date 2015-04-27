appControllers = angular.module("appControllers", [
  'CatalogCtrl',
  'DeliveryCtrl',
  'ProductCtrl',
  'BasketCtrl',
  'infoCtrl',
  'productCompareCtrl'
]);

appControllers.controller('ApplicationCtrl', function($rootScope, $scope, $location, $document, localStorageService, Basket){

  $scope.pageIsMain = false;
  $scope.pageIsInfo = false;

  $scope.sidebarMenuIsOpen = false;
  $scope.OrderCallFormIsOpen = false;
  $scope.HeaderOrderCallFormIsOpen = false;

  $scope.enableCompareShortcut = true;

  $scope.orderCallData = {};

  var Today = new Date();
  $scope.currentDate = Today.getTime();

  $scope.searchFormActive = false;

  $scope.searchString = $location.search().query || '';
  if($scope.searchString){
    $scope.searchFormActive = true;
  }

  $scope.toggleSearchForm = function(){

    if($scope.searchString != ''){
      $rootScope.searchString = $scope.searchString;
      $location.search('query', $scope.searchString).path("/search").replace();
    }else{
      $scope.searchFormActive = $scope.searchFormActive ? false : true;
      if(!$scope.searchFormActive) {
        $scope.searchString = '';
      }
    }
  };

  $scope.toggleSearchFormBlur = function(){
    if($scope.searchString == ''){
      $scope.searchFormActive = false;
    }
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

  $scope.navigationMenu = [
    {
      "title": 'Коляски',
      "ico": 'images/menu/ico-2.png',
      "ico-hover": 'images/menu/ico-2-hover.png'
    },
    {
      "title": 'Ходунки',
      "ico": 'images/menu/ico-3.png',
      "ico-hover": 'images/menu/ico-3-hover.png'
    }
    ,
    {
      "title": 'Подъемники',
      "ico": 'images/menu/ico-4.png',
      "ico-hover": 'images/menu/ico-4-hover.png'
    }
    ,
    {
      "title": 'Туалеты',
      "ico": 'images/menu/ico-5.png',
      "ico-hover": 'images/menu/ico-5-hover.png'
    }
    ,
    {
      "title": 'Аксессуары',
      "ico": 'images/menu/ico-6.png',
      "ico-hover": 'images/menu/ico-6-hover.png'
    }
  ];

  $scope.infoNavMenu = [
    {
      title: 'Доставка',
      url: '/delivery',
      isInfo: true
    },
    {
      title: 'Оплата',
      url: '/payment',
      isInfo: true
    },
    {
      title: 'Возврат и гарантии',
      url: '/return_guarantee',
      isInfo: true
    },
    {
      title: 'Вопросы и ответы',
      url: '/faq',
      isInfo: true
    },
    {
      title: 'Контакты',
      url: '/contacts',
      isInfo: true
    },
    {
      title: 'Бренды',
      url: '/brands',
      isInfo: false
    },
    {
      title: 'О компании',
      url: '/about',
      isInfo: false
    }
  ];

  $scope.$on('$routeChangeStart', function() {
    $scope.pageIsMain = $location.path() == "/";
    $scope.enableCompareShortcut = $location.path() != "/product_compare";

    $scope.pageIsInfo = false;
    for(index in $scope.infoNavMenu){
      if($scope.infoNavMenu.hasOwnProperty(index)){
        $scope.infoNavMenu[index].active = false;
        if($location.path() == $scope.infoNavMenu[index].url && $scope.infoNavMenu[index].isInfo){
          $scope.pageIsInfo = true;
          $scope.infoNavMenu[index].active = true;
        }
      }
    }
  });

});

appControllers.controller('BrandsCtrl', function($scope, $http){
  $http.get('javascripts/factories/brands/list.json')
    .success(function(data){
      $scope.brandsList = data;
    }).error(function(){
      console.error('Произошла ошибка');
    });
});

appControllers.controller('BrandItemCtrl', function($scope, $http){
  $http.get('javascripts/factories/brands/item.json')
    .success(function(data){
      $scope.brandDetails = data;
    }).error(function(){
      console.error('Произошла ошибка');
    });
});

appControllers.controller('ContactsCtrl', function($scope, $http){
  $scope.mapMarkers = [
    {
      "name": "Invasite",
      "address": "г. Москва, Ленинский проспект, 500м от МКАД, Бизнес-парк «Румянцево», корпус «Г», 11 подъезд, офис 521г",
      "location": {
        "latitude": "55.634317",
        "longitude": "37.439019"
      }
    }
  ]
});

appControllers.controller('SearchCtrl', function($scope, $location, $http, $rootScope){

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
          name_cont: $scope.searchString
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