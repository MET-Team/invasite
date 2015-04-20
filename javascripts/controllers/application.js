appControllers = angular.module("appControllers", [
  'CatalogCtrl',
  'DeliveryCtrl',
  'ProductCtrl',
  'BasketCtrl',
  'infoCtrl'
]);

appControllers.controller('ApplicationCtrl', function($scope, $location, $document, localStorageService, Basket){

  $scope.pageIsMain = false;
  $scope.pageIsInfo = false;

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


