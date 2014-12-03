appControllers = angular.module("appControllers", []);

appControllers.controller('ApplicationCtrl', function($scope, $location, $document, localStorageService, Basket){

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

  $scope.sidebarMenu = [
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

  $scope.basketIco = 'images/menu/ico-1.png';

  $scope.basketList = Basket;

  $scope.sidebarBasketIsOpen = false;

  $scope.toggleBasketList = function(){
    $scope.sidebarBasketIsOpen = $scope.sidebarBasketIsOpen ? false : true;
  };

  $scope.hideBasket = function(){
    $scope.sidebarBasketIsOpen = false;
  };

  $scope.removeBasketItem = function(item){
    var itemIndex = $scope.basketList.list.indexOf(item);

    if(itemIndex > -1){
      $scope.basketList.list.splice(itemIndex, 1);

      $scope.totalPrice = 0;
      if($scope.basketList.list.length > 0){
        for(itemBasket in $scope.basketList.list){
          $scope.totalPrice += $scope.basketList.list[itemBasket].price;
        }
      }
      localStorageService.set('basketList', $scope.basketList);

      Basket.list = $scope.basketList.list;
      Basket.totalPrice = $scope.totalPrice;
    }
  };

  $scope.$on('$routeChangeStart', function() {
    if($location.path() == "/"){
      $scope.sidebarMenuEnabled = true;
      $scope.footerMenuEnabled = false;
    }else{
      $scope.sidebarMenuEnabled = false;
      $scope.footerMenuEnabled = true;
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

appControllers.controller('CatalogCtrl', function($scope, $http, $location, $filter){

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

appControllers.controller('ProductCtrl', function($scope, $http, $filter, localStorageService, $location, Basket){

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

  $scope.refundPopupShow = false;
  $scope.additionalTextShow = false;

  $scope.prevArrowDisabled = true;
  $scope.nextArrowDisabled = false;

  $scope.additionalTextItemVisible = 0;

  $scope.prevItem = function(){
    if($scope.additionalTextItemVisible > 0) {
      $scope.additionalTextItemVisible--;
    }
    $scope.checkEnable();
  };

  $scope.nextItem = function(){
    if($scope.additionalTextItemVisible < $scope.product.additional_text.length-1) {
      $scope.additionalTextItemVisible++;
    }
    $scope.checkEnable();
  };

  $scope.checkEnable = function(){
    if($scope.additionalTextItemVisible == 0){
      $scope.prevArrowDisabled = true;
    }
    if($scope.additionalTextItemVisible > 0){
      $scope.prevArrowDisabled = false;
    }

    if($scope.additionalTextItemVisible == $scope.product.additional_text.length-1) {
      $scope.nextArrowDisabled = true;
    }
    if($scope.additionalTextItemVisible < $scope.product.additional_text.length-1) {
      $scope.nextArrowDisabled = false;
    }
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

appControllers.controller('BuyCtrl', function($scope, $http, localStorageService){

  $scope.basketList = localStorageService.get('basketList');

  $scope.removeItem = function(item){
    var itemIndex = $scope.basketList.indexOf(item);

    if(itemIndex > -1){
      $scope.basketList.splice(itemIndex, 1);

      $scope.totalPrice = 0;
      if($scope.basketList.length > 0){
        for(itemBasket in $scope.basketList){
          $scope.totalPrice += $scope.basketList[itemBasket].price;
        }
      }
      localStorageService.set('basketList', $scope.basketList);
    }
  };

  $scope.checkoutData = {
    name: '',
    email: '',
    phone: '',
    delivery: 0,
    payment: 0,
    products: []
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
      title: 'Курьером по Москве и области',
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

  $scope.paymentItems = [
    {
      title: 'Яндекс Деньги'
    },
    {
      title: 'Наличными'
    },
    {
      title: 'Банковской картой'
    }
  ];

  $scope.selectedPayment = null;

  $scope.togglePaymentItem = function(item){
    if($scope.selectedPayment != item){
      $scope.selectedPayment = item;
    }else{
      $scope.selectedPayment = null;
    }
  };

  $scope.checkoutSteps = ['Контакты','Доставка','Оплата'];

  $scope.checkoutStepSelected = 0;
  $scope.changeCheckoutStep = function(index){
    $scope.checkoutStepSelected = index;
  };

  $scope.nextStep = function(){
    if($scope.checkoutStepSelected < $scope.checkoutSteps.length-1){
      $scope.checkoutStepSelected++;
    }else{
      $scope.checkoutData.delivery = $scope.selectedDelivery;
      $scope.checkoutData.payment = $scope.selectedPayment;
      $scope.checkoutData.products = $scope.basketList;


      console.log($scope.checkoutData)
    }
  };

});

appControllers.controller('ContactsCtrl', function($scope, $http){

});


