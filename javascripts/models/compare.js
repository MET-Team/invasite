Invasite.factory('Compare', [
  '$http', '$rootScope', 'localStorageService', function($http, $rootScope, localStorageService) {
    var Compare;
    return Compare = (function() {
      Compare.all = localStorageService.get('comparedProducts') || [];

      Compare.compareDisabled = false;

      function Compare(params) {
        var self;
        angular.extend(this, params);
        self = this;
      }

      Compare.comparedProductsExists = function(product){
        if(Compare.compareDisabled){
          return true;
        }

        for (item in Compare.all) {
          if (Compare.all.hasOwnProperty(item)) {
            if (Compare.all[item].id == product.id) {
              return true;
            }
          }
        }
        return false;
      };

      Compare.add = function(){
        if(arguments.length > 0) {
          var productParam = arguments[0];

          if(typeof(productParam) == 'object'){
            if(productParam){
              Compare.add_to_list(productParam);
            }
          }else{
            var productId = productParam;

            $http.get($rootScope.domain +'/api/v1/products/'+ productId).success(function(product) {
              if(product){
                Compare.add_to_list(product);
              }
            });
          }
        }
      };

      Compare.add_to_list = function(comparedProduct){
        if(!this.comparedProductsExists(comparedProduct)){
          Compare.all.push(comparedProduct);
          $rootScope.comparedProducts = Compare.all;
          localStorageService.set('comparedProducts', Compare.all);
        }
      };

      Compare.fetch_all = function() {
        return Compare.all;
      };

      return Compare;

    })();
  }
]);