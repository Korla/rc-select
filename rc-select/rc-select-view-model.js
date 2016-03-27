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

// Dropdown direction
// Goes up if distance to bottom of window is less than options height and if
// distance to top is more than options height

// Custom templates
// A template url can be provided which is used to render options in the Dropdown

// Textfunction
// A lambda to select which option property to use as display textfunction
export default class SelectViewModel {
  constructor({options, template, textFn}) {
    this.options = options || [];
    this.template = template || 'rc-select/templates/simple.html';
    this.textFn = textFn || (option => option);
    this.states = {
      'Not focused': {
        focused: false,
        showDropdown: false,
        focus: () => this.setState('Focused, no dropdown'),
        selectedClicked: () => this.setState('Focused, open dropdown'),
      },
      'Focused, no dropdown': {
        focused: true,
        showDropdown: false,
        blur: () => this.setState('Not focused'),
        downPressed: () => this.setState('Focused, open dropdown'),
        selectedClicked: () => this.setState('Focused, open dropdown'),
      },
      'Focused, open dropdown': {
        focused: true,
        showDropdown: true,
        blur: () => this.setState('Focused, no dropdown'),
        upPressed: () => this.selected = this.getOption(-1),
        downPressed: () => this.selected = this.getOption(1),
        enterPressed: () => this.setState('Focused, no dropdown'),
        optionClicked: option => {
          this.selected = option;
          this.setState('Focused, no dropdown');
        },
        selectedClicked: () => this.setState('Focused, no dropdown'),
      }
    }

    this.setState('Not focused');

    this.keyDownFunctions = {
      '38': 'upPressed',
      '40': 'downPressed',
      '13': 'enterPressed'
    };
  }

  setState(state) {
    this.currentState = this.states[state];
  }

  getOption(delta) {
    return this.options[Math.max(0, Math.min(this.options.indexOf(this.selected) + delta, this.options.length - 1))];
  }

  shouldDropdownGoUp(distanceToBottom, optionsHeight, distanceToTop) {
    return distanceToBottom < optionsHeight && optionsHeight < distanceToTop;
  }

  keyDown(keyCode) {
    var functionName = this.keyDownFunctions[keyCode];
    if(functionName) {
      if(this.currentState[functionName]){
        this.currentState[functionName]()
      }
    }
  };
}
