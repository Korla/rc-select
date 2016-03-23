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
export default function SelectViewModel(options, selected, template, textFn) {
  textFn = textFn || (text => text);
  var setState = state => vm.currentState = states[state];

  var getOption = delta =>
    vm.options[Math.max(0, Math.min(vm.options.indexOf(vm.selected) + delta, vm.options.length - 1))];

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
    },
    'Focused, open dropdown': {
      focused: true,
      showDropdown: true,
      blur: () => setState('Focused, no dropdown'),
      upPressed: () => vm.selected = getOption(-1),
      downPressed: () => vm.selected = getOption(1),
      enterPressed: () => setState('Focused, no dropdown'),
      optionClicked: option => {
        vm.selected = option;
        setState('Focused, no dropdown');
      },
      selectedClicked: () => setState('Focused, no dropdown'),
    }
  }

  var vm = {
    options,
    selected,
    template,
    textFn,
    currentState: states['Not focused'],
    keyDown: keyCode => {
      var method = {
        '38': 'upPressed',
        '40': 'downPressed',
        '13': 'enterPressed'
      }[keyCode];
      if(method) {
        if(vm.currentState[method]){
          vm.currentState[method]()
        }
      }
    }
  };

  return vm;
}
