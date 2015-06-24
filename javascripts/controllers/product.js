angular.module('ProductCtrl', [
  'spritespin-ng',
  'angular-object2vr',
  'mgcrea.ngStrap.collapse'
])
.controller('ProductCtrl', function($scope, $http, $filter, $location, $routeParams, $rootScope, localStorageService, $sce, $templateCache, Compare){

  $scope.productId = $routeParams.productId;

  $scope.product = {};

  $scope.functionTypes = [];
  $scope.functionsList = [];

  $scope.functionTypeSelected = 0;
  $scope.functionsSelected = [];

  $scope.functionTotalOpened = false;

  $scope.additionalPrice = 0;
  $scope.totalPrice = 0;

  $scope.optionsCountLabel = '';


  $scope.carriageTypes = [];
  $scope.carriageTypeIdToCaption = {};

  $rootScope.carriageType.list.forEach(function(carriageType){
    $scope.carriageTypes.push(carriageType.id);
    $scope.carriageTypeIdToCaption[carriageType.id] = carriageType.value;
  });

  $scope.catalogGroups.forEach(function(group){
    if(group.group_id){
      $scope.carriageTypeIdToCaption[group.group_id] = group.name;
    }
  });

  $rootScope.comparedProducts = $rootScope.comparedProducts || [];

  $scope.compareDisabled = false;
  $scope.compareTechSpecs = [];

  $scope.photoMoreVisible = false;
  $scope.charactersMoreVisible = false;

  $scope.panels = [
    {
      "title": "Описание",
      "body": ""
    },
    {
      "title": "Доставка по России и СНГ",
      "body": ""
    },
    {
      "title": "Получить бесплатно",
      "body": ""
    },
    {
      "title": "Возврат и гарантии",
      "body": ""
    }
  ];
  $scope.panels.activePanel = 0;

    $scope.breadcrumbRoot = {
      link: '',
      title: ''
    };

  $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productId)
    .success(function(data){
      $scope.product = data;

      $rootScope.metaTags.pageTitle = $scope.product.meta_tags;
      $rootScope.metaTags.pageKeyWords = $scope.product.keywords;
      $rootScope.metaTags.pageDescription = $scope.product.page_description;

      $scope.breadcrumbRoot.title = $scope.product.kind.name;
      $scope.breadcrumbRoot.link = $scope.carriageTypeIdToCaption[$scope.product.kind_id]

      if($scope.carriageTypes.indexOf($scope.product.kind_id) > -1){
        $scope.breadcrumbRoot.title += ' коляски';
        $scope.breadcrumbRoot.link = 'carriages/' + $scope.breadcrumbRoot.link;
      }

      $scope.panels[0].body = $scope.product.description;
      $scope.panels[1].body = $templateCache.get('infoDelivery');
      $scope.panels[2].body = $templateCache.get('infoGetFree');

      var guaranteeEstimate = '12 месяцев';
      if($scope.product.kind_id == 1){
        guaranteeEstimate = '24 месяца';
      }
      $scope.panels[3].body = '<p>На товары действует <a href="/return_guarantee">гарантия '+ guaranteeEstimate +'</a>. Если изделие оказалось неисправно, мы устраним дефект или заменим его.</p>';

      $scope.compareDisabled = Compare.comparedProductsExists($scope.product);

      $scope.threedConfig = {
        input: {
          width: 506,
          height: 506,
          columns: 16,
          rows: 6,
          states: 1,
          fileextension: 'jpg',
          images: $scope.product.images
        },
        control: {
          wrapx: "1",
          wrapy: "0",
          revx: "0",
          revy: "0",
          swapxy: "0",
          controller: "1",
          sensitivity: "10",
          lockedmouse: "0",
          lockedkeyboard: "1",
          lockedwheel: "1",
          invertwheel: "0",
          speedwheel: "0.05",
          dblclickfullscreen: "1",
          automovemode: "1"
        },
        view: {
          start: {
            column: 14,
            row: 4,
            state: 0
          },
          zoom: {
            min: "1",
            "default": "1",
            max: "2",
            centerx: "0",
            centery: "0"
          },
          viewer: {
            background: 1,
            backgroundcolor: "0xffffff",
            imagescaling: 1
          }
        },
        autorotate: {
          speed: 0.05,
          start: 0,
          delay: 5
        }
      };

      if($scope.product.video_embed_code){
        $scope.videoPath = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + $scope.product.video_embed_code + '');
      }

      $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productId +'/tech_specs')
        .success(function(data){
          if(data.length) {
            $scope.characters = data;
            $scope.compareTechSpecs = data;
          }else{
            $scope.compareDisabled = true;
          }
        }).error(function(){
          console.error('Произошла ошибка');
        });

      $http.get($rootScope.domain +'/api/v1/products/'+ $scope.productId +'/photo_elements')
        .success(function(data){
          $scope.photo_elements = data;
        }).error(function(){
          console.error('Произошла ошибка');
        });

    }).error(function(){
      console.error('Произошла ошибка');
      $location.path('/404');
    });

  $scope.getProductInfo = function(kindId){

    var infoData = {
      "carriages" : {
        return: $templateCache.get($rootScope.carriageTypeSelected + 'Return')
      },
      "walkers" : {},
      "lifts" : {},
      "rollators" : {},
      "accessories" : {}
    };

    console.log(infoData);

  };

  $scope.buyProduct = function(){

    var basketItem = {
      id: $scope.product.id,
      name: $scope.product.name,
      art: $scope.product.art,
      price: $scope.product.price,
      photo: $scope.product.photo,
      count: 1,
      in_stock: $scope.product.in_stock
    };

    var existingProduct = null;
    $rootScope.basketList.forEach(function(listItem){
      if(listItem.id == $scope.product.id){
        existingProduct = listItem;
        listItem.count++;
      }
    });

    if(!existingProduct){
      $rootScope.basketList.push(basketItem);
    }

//    ga('send', 'event', 'button-buy', 'click', 'buy-button-'+ buttonType);

    localStorageService.set('basketList', $rootScope.basketList);
    $rootScope.basketCount = $rootScope.basketList.length;
  };

  $scope.compareProduct = function(){
    var compareProduct = $scope.product;

    if(!$scope.compareDisabled){
      if(!Compare.comparedProductsExists(compareProduct)){
        if($scope.compareTechSpecs && $scope.compareTechSpecs.length) {
          compareProduct.characters = $scope.compareTechSpecs;
          $scope.compareTechSpecs = [];

          Compare.add(compareProduct);

          $scope.compareDisabled = true;
        }
      }
    }
  };

  $scope.viewItems = ['360&deg;', '3D'];
  $scope.viewItemSelected = 0;
  $scope.hintEnabled = false;

  $scope.changeView = function(index){
    $scope.viewItemSelected = index;
    $scope.hintEnabled = $scope.viewItemSelected == 1 ? true : false;
  };

  $scope.continueView = function(){
    $scope.hintEnabled = false;
  };

  $scope.transformationsSpinConfig = {
    disableAnimation: true,
    frameTime: '300'
  };

  $scope.spinObj = {
    spinReady: false
  };

  $scope.togglePhotoMoreVisible = function(){
    $scope.photoMoreVisible = $scope.photoMoreVisible ? false : true;
  };

  $scope.toggleCharactersMoreVisible = function(){
    $scope.charactersMoreVisible = $scope.charactersMoreVisible ? false : true;
  };

  $scope.OrderTestDriveFormIsOpen = false;

  $scope.toggleOrderTestDriveForm = function(){
    $scope.orderTestDriveData = {};
    $scope.OrderTestDriveFormIsOpen = $scope.OrderTestDriveFormIsOpen ? false : true;
    if($scope.OrderTestDriveFormIsOpen){
//      ga('send', 'event', 'test-drive', 'click', 'open test-drive product form');
    }
  };

  $scope.orderTestDrive = function(){
    $scope.sendMail('test-drive', $scope.orderTestDriveData);

//    ga('send', 'event', 'test-drive', 'click', 'send test-drive product form');

    $scope.toggleOrderTestDriveForm();
  };

  $scope.creditBuy = function(){
    window.open('/credit/'+ $scope.product.id, '_blank');
  };

  $scope.charactersTabs = [
    {
      title: 'Описание'
    },
    {
      title: 'Технические характеристики'
    }
  ];
  $scope.charactersActiveTab = 1;

  $scope.selectTab = function(index) {
    $scope.charactersActiveTab = index;
  };

});