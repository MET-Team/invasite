angular.module("matchHeight-ng", []).directive("equalHeight", function() {
  return {
    restrict: "EAC",
    link: function(scope, elements){
      setTimeout(function(){
        $('.equal-height').matchHeight();
      }, 100);
    }
  };
});