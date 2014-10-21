var App = angular.module('App',
  [
    'ngRoute',
    'ngAnimate',
    'ngSanitize',

    'appControllers',

    'customFilters',
    'googlemap-ng',
    'LocalStorageModule',

    'stickyfloat-ng',

    'mgcrea.ngStrap.select',
    'range-slider',
    'matchHeight-ng'
  ]
);

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
    .when("/brands", {
      templateUrl: "javascripts/templates/brands.html",
      reloadOnSearch: false
    })
    .when("/brands/:brandId", {
      templateUrl: "javascripts/templates/brand-item.html",
      reloadOnSearch: false
    })

    .otherwise({
      templateUrl: 'javascripts/templates/404.html',
      reloadOnSearch: false
    });

}]);

App.factory('Basket', function(){
  return { list: [], totalPrice: 0 };
});

App.directive('toggleMenuIco', function(){
  return {
    restrict: "EAC",
    scope: {
      toggleMenuItem: "="
    },
    link: function(scope, elements){
      var item = scope.toggleMenuItem,
          element = $(elements[0]);

      element.hover(function(){
        $('img.ico', $(this)).attr('src', item['ico-hover'])
      }, function(){
        $('img.ico', $(this)).attr('src', item['ico'])
      });
    }
  };
});

App.directive('blinkBasket', function(){
  return {
    restrict: "EAC",
    link: function(scope, elements){
      var element = $(elements[0]);

      element.click(function(){
        $('.sidebar-menu .item-basket').addClass('hovered');
        $('img.ico', '.sidebar-menu .item-basket').attr('src', 'images/menu/ico-1-hover.png');

        setTimeout(function(){
          $('.sidebar-menu .item-basket').removeClass('hovered');
          $('img.ico', '.sidebar-menu .item-basket').attr('src', 'images/menu/ico-1.png');
        }, 200)
      })
    }
  };
});