App.config(['$routeProvider', '$locationProvider', function($routes, $location) {

  $routes.when("/", {
    templateUrl: "/javascripts/templates/about.html",
    reloadOnSearch: false
  })
    .when("/catalog", {
      templateUrl: "/javascripts/templates/catalog.html",
      reloadOnSearch: false
    })
//    .when("/catalog/:productGroupName", {
//      templateUrl: "/javascripts/templates/catalog.html",
//      reloadOnSearch: false
//    })
    .when("/catalog/:productId", {
      templateUrl: "/javascripts/templates/product.html",
      reloadOnSearch: false
    })

    .when("/basket", {
      templateUrl: "/javascripts/templates/basket.html",
      reloadOnSearch: false
    })

    .when("/delivery", {
      templateUrl: "/javascripts/templates/delivery.html"
    })
    .when("/payment", {
      templateUrl: "/javascripts/templates/payment.html"
    })
    .when("/faq", {
      templateUrl: "/javascripts/templates/faq.html"
    })
    .when("/return_guarantee", {
      templateUrl: "/javascripts/templates/return_guarantee.html"
    })

    .when("/about", {
      templateUrl: "/javascripts/templates/about.html",
      reloadOnSearch: false
    })
    .when("/contacts", {
      templateUrl: "/javascripts/templates/contacts.html",
      reloadOnSearch: false
    })
    .when("/info", {
      templateUrl: "/javascripts/templates/info.html",
      reloadOnSearch: false
    })
    .when("/brands", {
      templateUrl: "/javascripts/templates/brands.html",
      reloadOnSearch: false
    })
    .when("/brands/:brandId", {
      templateUrl: "/javascripts/templates/brand-item.html",
      reloadOnSearch: false
    })

    .when("/product_compare", {
      templateUrl: "/javascripts/templates/product_compare.html"
    })

    .when("/search", {
      templateUrl: "/javascripts/templates/search.html"
    })

    .otherwise({
      templateUrl: '/javascripts/templates/404.html',
      reloadOnSearch: false
    });

  $location.html5Mode(true);

}]).run(function($rootScope, localStorageService){
  $rootScope.domain = "http://white-m.ru";
  $rootScope.site_id = 4;

  $rootScope.mainPhone = '+7 495 777-39-18';
  $rootScope.mainEmail = 'info@invasite.ru';
  $rootScope.mainAddress = "г. Москва, Киевское ш., стр. 2, БП «Румянцево», офис 520Г";

  $rootScope.comparedProducts = [];
  $rootScope.searchString = null;

  $rootScope.userPassword = 'q1w2e3r4t5y6';
  $rootScope.userData = $rootScope.userData || {};

  $rootScope.metaTags = {
    pageTitle: 'Invasite',
    pageKeyWords: 'Invasite',
    pageDescription: 'Invasite'
  };

  $rootScope.basketList = localStorageService.get('basketList') || [];
  $rootScope.basketCount = $rootScope.basketList.length || 0;
});