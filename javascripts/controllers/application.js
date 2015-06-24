appControllers = angular.module("appControllers", [
  'CatalogCtrl',
  'DeliveryCtrl',
  'ProductCtrl',
  'BasketCtrl',
  'infoCtrl',
  'productCompareCtrl',
  'SearchCtrl'
]);

appControllers.controller('ApplicationCtrl', function($rootScope, $scope, $location, $document, localStorageService, $http, Basket){

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

  $scope.goToCatalog = function(){
//    ga('send', 'event', 'button-catalog', 'click', 'button-catalog-main');
    $location.path('/catalog/carriages');
  };

  $scope.catalogGroups = [
    {
      "title": 'Коляски',
      "name": 'carriages',
      "ico": 'images/menu/ico-2.png',
      "ico-hover": 'images/menu/ico-2-hover.png'
    },
    {
      "title": 'Ходунки',
      "name": 'walkers',
      "group_id": 7,
      "ico": 'images/menu/ico-3.png',
      "ico-hover": 'images/menu/ico-3-hover.png'
    }
    ,
    {
      "title": 'Подъемники',
      "name": 'lifts',
      "group_id": 8,
      "ico": 'images/menu/ico-4.png',
      "ico-hover": 'images/menu/ico-4-hover.png'
    }
    ,
    {
      "title": 'Роллаторы',
      "name": 'rollators',
      "group_id": 10,
      "ico": 'images/menu/ico-5.png',
      "ico-hover": 'images/menu/ico-5-hover.png'
    }
    ,
    {
      "title": 'Аксессуары',
      "name": 'accessories',
      "group_id": 9,
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
    }
  ];

  $scope.sendMail = function(type, sendData){
    $http({
      method: 'post',
      url: '/send_mail/',
      params: {
        type: type,
        sendData: sendData
      }
    })
      .success(function (data) {
        if(data.error){
          console.error(data.error);
          return false;
        }
        if(data.success){
          console.log(data.success);
        }
      }).error(function (){
        console.error('Произошла ошибка');
      });
  };

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

appControllers.controller('BrandsCtrl', function($rootScope, $scope, $http){
  $http.get($rootScope.domain + '/api/v1/brands').success(function (data) {
    $scope.brandsList = data;
  }).error(function(){
    console.error('Произошла ошибка');
  });
});

appControllers.controller('BrandItemCtrl', function($rootScope, $scope, $routeParams, $http){
  $http.get($rootScope.domain + '/api/v1/brands/' + $routeParams.brandId).success(function (data) {
    $scope.brandDetails = data;
  }).error(function(){
    console.error('Произошла ошибка');
  });

  $http.get($rootScope.domain +'/api/v1/brands/'+ $routeParams.brandId +'/kinds').success(function (data) {
    $scope.brandCatalogGroups = data;

    $scope.brandCatalogGroups.forEach(function(groupItem){
      groupItem.hrefPrefix = '';
      $rootScope.carriageType.list.forEach(function(carriageType){
        if(carriageType.id == groupItem.id){
          groupItem.hrefPrefix = 'carriages/';
        }
      });
    });

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