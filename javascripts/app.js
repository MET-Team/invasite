var Invasite = angular.module('Invasite', [
  'ngRoute',
  'ngAnimate',
  'ngSanitize',

  'appControllers',

  'googlemap-ng',
  'LocalStorageModule',

  'mgcrea.ngStrap.select',
  'matchHeight-ng',
  'slugifier'
]);

Invasite.factory('Basket', function(){
  return { list: [], totalPrice: 0 };
});

Invasite.filter("declOfNum", function() {
  return function(number, textVariants) {
    var cases = [2, 0, 1, 1, 1, 2];
    return textVariants[(number % 100 > 4 && number % 100 < 20 ? 2 : cases[(number % 10 < 5 ? number % 10 : 5)])];
  };
});