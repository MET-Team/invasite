angular.module('BasketCtrl', []).controller('BasketCtrl', function($scope, $http, localStorageService){

  $scope.basketList = localStorageService.get('basketList') || [];

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

  $scope.changeProductCount = function(product, type){
    if(type === 'minus' && product.count > 1){
      product.count--;
    }
    if(type === 'plus'){
      product.count++;
    }

    localStorageService.set('basketList', $scope.basketList);
  };

  $scope.checkoutData = {
    name: '',
    email: '',
    phone: '',
    delivery: 0,
    payment: 0,
    products: []
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