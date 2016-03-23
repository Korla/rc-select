angular.module('rc')
  .directive('rcSelect', ($timeout) => {
    return {
      transclude: true,
      replace: true,
      scope: {
        id: '@',
        vm: '='
      },
      templateUrl: 'rc-select/rc-select.html',
      link: (scope, element) => {
        element[0].id = '';

        var input = element.find('input')[0];
        scope.$watch('vm.currentState', () => {
          if(scope.vm.currentState.focused === true) {
            input.focus();
          } else {
            input.blur();
          }
        });

        scope.blurIfInputWasntClicked = event =>
          $timeout(() => {
            if(document.activeElement !== input) {
              scope.vm.currentState.blur();
            }
          }, 10);
      }
    }
  });
