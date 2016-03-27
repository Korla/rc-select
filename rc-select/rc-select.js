angular.module('rc')
  .directive('rcSelect', ($window, $timeout) => {
    return {
      transclude: true,
      replace: true,
      require: 'ngModel',
      scope: {
        id: '@',
        vm: '='
      },
      templateUrl: 'rc-select/rc-select.html',
      link: (scope, $element, attrs, ngModelCtrl) => {
        var element = $element[0];
        var hiddenInput = element.querySelector('.rc-select-hidden-input');
        var selectOptionsElement = element.querySelector('.rc-select-options');
        element.id = '';

        scope.$watch('vm.currentState', () => {
          if(scope.vm.currentState.focused === true) {
            hiddenInput.focus();
          } else {
            hiddenInput.blur();
          }

          if(scope.vm.currentState.showDropdown) {
            selectOptionsElement.classList.add('calculate-height');
            var windowHeight = $window.innerHeight;
            var {height: optionsHeight} = selectOptionsElement.getBoundingClientRect();
            var {top: distanceToTop, bottom: distanceFromBottomToTop} = element.getBoundingClientRect();
            scope.optionsUp = scope.vm.shouldDropdownGoUp(windowHeight - distanceFromBottomToTop, optionsHeight, distanceToTop);
            selectOptionsElement.classList.remove('calculate-height');
          }
        });

        scope.blurIfInputWasntClicked = event =>
          $timeout(() => {
            if(document.activeElement !== hiddenInput) {
              scope.vm.currentState.blur();
            }
          }, 10);

        ngModelCtrl.$render = () => scope.vm.selected = ngModelCtrl.$viewValue;
        scope.$watch('vm.selected', () => ngModelCtrl.$setViewValue(scope.vm.selected));
      }
    }
  });
