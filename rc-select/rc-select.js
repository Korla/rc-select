angular.module('rc')
  // 1.   Not focused
  // 1.1. Tabbing to input focuses on field
  // 1.2. Clicking focuses on field and opens dropdown
  // 1.3. Clicking label focuses on field

  // 2.   Focused, no dropdown
  // 2.1. Tabbing defocuses and focuses next input
  // 2.2. Pressing down opens dropdown
  // 2.3. Clicking outside defocuses input
  // 2.4. Clicking on field opens dropdown

  // 3.   Focused, open dropdown
  // 3.1. Tabbing closes dropdown
  // 3.2. Up and down selects next/previous if applicable
  // 3.3. Enter selects value and keeps focus on field
  // 3.4. Mouse click selects value, closes dropdown and keeps focus on field
  // 3.5. Clicking outside closes dropdown
  .directive('rcSelect', ($timeout) => {
    return {
      transclude: true,
      replace: true,
      scope: {
        id: '@',
        options: '=',
        selected: '=',
        template: '='
      },
      templateUrl: 'rc-select/rc-select.html',
      link: (scope, element) => {
        element[0].id = '';
        var states = {
          'Not focused': {
            focused: false,
            showDropdown: false,
            focus: () => setState('Focused, no dropdown'),
            selectedClicked: () => setState('Focused, open dropdown'),
          },
          'Focused, no dropdown': {
            focused: true,
            showDropdown: false,
            blur: () => setState('Not focused'),
            downPressed: () => setState('Focused, open dropdown'),
            selectedClicked: () => setState('Focused, open dropdown'),
            search: letter => console.log(letter),
          },
          'Focused, open dropdown': {
            focused: true,
            showDropdown: true,
            blur: () => setState('Focused, no dropdown'),
            upPressed: () => select(-1),
            downPressed: () => select(1),
            enterPressed: () => setState('Focused, no dropdown'),
            optionClicked: option => {
              scope.selected = option;
              setState('Focused, no dropdown');
            },
            selectedClicked: () => setState('Focused, no dropdown'),
            search: letter => console.log(letter),
          }
        }
        var input = element.find('input')[0];
        var setState = state => {
          scope.currentState = states[state];
          if(scope.currentState.focused === true) {
            input.focus();
          } else {
            input.blur();
          }
        }

        setState('Not focused');

        var select = delta =>
          scope.selected = scope.options[Math.max(0, Math.min(scope.options.indexOf(scope.selected) + delta, scope.options.length - 1))];

        scope.blurIfInputWasntClicked = event =>
          $timeout(() => {
            if(document.activeElement !== input) {
              scope.currentState.blur();
            }
          }, 10);

        scope.keyDown = keyCode => {
          var method = {
            '38': 'upPressed',
            '40': 'downPressed',
            '13': 'enterPressed'
          }[keyCode];
          if(method) {
            if(scope.currentState[method]){
              scope.currentState[method]()
            }
          } else {
            var letter = String.fromCharCode(keyCode);
            if(letter) {
              scope.currentState.search(letter.toLowerCase());
            }
          }
        }
      }
    }
  });
