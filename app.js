require('!style!css!less!./app.less');

angular.module('rc', [])
  .controller('ctrl', ($scope) => {
    $scope.options = ['One', 'Two', 'Three'];
    $scope.selected = $scope.options[0];
  });

  require('./rc-select/rc-select.js');
