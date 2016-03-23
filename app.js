require('!style!css!less!./app.less');
import SelectViewModel from'./rc-select/rc-select-view-model.js';

angular.module('rc', [])
  .controller('ctrl', ($scope) => {
    $scope.options = ['One', 'Two', 'Three'];
    $scope.selected = $scope.options[0];
    $scope.selectVm = new SelectViewModel($scope.options, 'rc-select/templates/simple.html');
  });

  require('./rc-select/rc-select.js');
