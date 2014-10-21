angular.module("range-slider", []).directive("slider", function() {
  return {
    restrict: "EAC",
    scope: {
      rangeConfig: "=",
      model: "="
    },
    link: function(scope, element) {
      var init;
      init = function(data) {
        var slider;

        slider = $(element[0]).slider({
          range: true,
          min: scope.rangeConfig.min,
          max: scope.rangeConfig.max,
          values: data,
          step: scope.rangeConfig.step
        });

        return slider.on("slide", function(e, ui) {
          scope.model = ui.values;
          scope.$apply();
        });
      };
      return scope.$watch("model", function(oldVal, newVal) {
        return init(newVal);
      });
    }
  };
});
