app.directive('presets', function ($rootScope, AuthService, AUTH_EVENTS, $state) {
  return {
      restrict: 'E',
      scope: {
        presets: '='
      },
      templateUrl: 'js/common/directives/presets/presets.html',
      link: function (scope){
      }
  }
});
