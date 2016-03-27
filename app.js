require('!style!css!less!./app.less');
import SelectViewModel from'./rc-select/rc-select-view-model.js';

angular.module('rc', [])
  .controller('ctrl', ($scope) => {
    $scope.options = [];
    for(var i = 0; i < 30; i++) $scope.options.push(i);
    $scope.selected = $scope.options[0];
    $scope.selectVm = new SelectViewModel({options: $scope.options});

    $scope.options2 = [];
    for(var i = 0; i < 3; i++) $scope.options2.push({
      text: 'This is a text for element ' + i,
      value: i
    });
    $scope.selected2 = $scope.options2[0];
    $scope.selectVm2 = new SelectViewModel({
      options: $scope.options2,
      textFn: option => option.text
    });
  });

  require('./rc-select/rc-select.js');
