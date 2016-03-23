require('!style!css!less!./app.less');
import SelectViewModel from'./rc-select/rc-select-view-model.js';

angular.module('rc', [])
  .controller('ctrl', ($scope) => {
    $scope.options = ['One', 'Two', 'Three'];
    $scope.selected = $scope.options[0];
    $scope.selectVm = new SelectViewModel(
      $scope.options,
      $scope.selected,
      'rc-select/templates/simple.html'
    );

    $scope.options2 = [
      {
        text: 'One',
        value: 1
      },
      {
        text: 'Two',
        value: 2
      },
      {
        text: 'Three',
        value: 3
      }
    ];
    $scope.selected2 = $scope.options2[0];
    $scope.selectVm2 = new SelectViewModel(
      $scope.options2,
      $scope.selected2,
      'rc-select/templates/simple.html',
      option => option.text
    );
  });

  require('./rc-select/rc-select.js');
