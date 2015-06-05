angular.module('CatalogCtrl', []).controller('CatalogCtrl', function($rootScope, $scope, $document, $http, $location, $routeParams, $filter, Compare){

  $scope.catalogGroupSelected = $routeParams.productGroupName || 'carriages';

  $rootScope.$watch('carriageType.selected', function(newValue, oldValue){
    if($scope.catalogGroupSelected == 'carriages' && newValue != oldValue){
      $rootScope.carriageType.selected = $rootScope.carriageTypeSelected;
      $scope.changeCarriageType(newValue);
    }
  });

  $http.get($rootScope.domain + '/api/v1/brands').success(function (data) {

    $scope.brand = {
      list: [
        {
          value: 0,
          title: ' '
        }
      ],
      selected: null
    };

    data.forEach(function(brand){
      $scope.brand.list.push({
        value: brand.id,
        title: brand.name
      })
    });
  });

  $scope.presence = {
    list: [
      {
        value: 'true',
        title: "На складе"
      },
      {
        value: 'false',
        title: "Под заказ"
      }
    ],
    selected: null
  };

  $scope.price = {
    list: [
      {
        value: 0,
        title: ' '
      },
      {
        value: 1,
        title: "0 - 1 000",
        start: 0,
        end: 1000
      },
      {
        value: 2,
        title: "1 000 - 10 000",
        start: 1000,
        end: 10000
      },
      {
        value: 3,
        title: "10 000 - 30 000",
        start: 10000,
        end: 30000
      },
      {
        value: 4,
        title: "30 000 - 50 000",
        start: 30000,
        end: 50000
      },
      {
        value: 5,
        title: "50 000 - 100 000",
        start: 50000,
        end: 100000
      }
    ],
    selected: null
  };

  $scope.kindId = 0;
  $scope.searchParams = {};
  $scope.productHrefPrefix = '';

  $scope.activeOptionsFilter = [];

  var carriageType = $rootScope.carriageTypeSelected,
      carriageTypeList = $rootScope.carriageType.list;

  if($scope.catalogGroupSelected == 'carriages'){
    for(carriageItem in carriageTypeList){
      if(carriageTypeList.hasOwnProperty(carriageItem)){
        if(carriageTypeList[carriageItem].value == carriageType){

          $scope.productHrefPrefix = 'carriages/'+ carriageType;

          $scope.kindId = carriageTypeList[carriageItem].id;
          $scope.searchParams.kind_id_eq = carriageTypeList[carriageItem].id;
        }
      }
    }
  }else{
    $scope.catalogGroups.forEach(function(group){
      if(group.name == $scope.catalogGroupSelected){
        $scope.kindId = group.group_id;
        $scope.searchParams.kind_id_eq = group.group_id;
        $scope.productHrefPrefix = group.name;
      }
    });
  }

  if($scope.kindId > 0) {
    $http.get($rootScope.domain + '/api/v1/kinds/' + $scope.kindId + '/filters')
      .success(function (data) {
        $scope.carriageOptions = data;
      }).error(function () {
        console.error('Произошла ошибка');
      });
  }

  $scope.getProducts = function(){
    $http.get($rootScope.domain +'/api/v1/sites/'+ $rootScope.site_id +'/products', {
      params: $scope.searchParams
    })
      .success(function(data){
        $scope.productsList = data;
        $scope.productsList.forEach(function(productItem){

          productItem.href = $scope.productHrefPrefix + '/' + productItem.id;

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

    $scope.searchParams.filters_id_eq = $scope.activeOptionsFilter;

    $scope.getProducts();

  };

  $scope.$watch('brand.selected', function(newValue, oldValue){
    if(newValue != oldValue){
      if(newValue == 0){
        delete $scope.searchParams.brand_id_eq;
      }else{
        $scope.searchParams.brand_id_eq = newValue;
      }
      $scope.getProducts();
    }
  });

  $scope.$watch('presence.selected', function(newValue, oldValue){
    if(newValue != oldValue){
      $scope.searchParams.in_stock_eq = newValue;
      $scope.getProducts();
    }
  });

  $scope.$watch('price.selected', function(newValue, oldValue){
    if(newValue != oldValue){
      $scope.price.list.forEach(function(item){
        if(item.value == newValue){
          if(newValue == 0){
            delete $scope.searchParams.price_gteq;
            delete $scope.searchParams.price_lt;
          }else {
            $scope.searchParams.price_gteq = item.start;
            $scope.searchParams.price_lt = item.end;
          }
          $scope.getProducts();
        }
      });
    }
  });

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