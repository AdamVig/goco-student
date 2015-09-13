app.directive('appBanner', function () {
  return {
    templateUrl: 'html/directives/_appbanner.html',
    scope: {
    },
    controller: ['$scope', '$ionicModal', function ($scope, $ionicModal) {

      var appBanner = this;

      $ionicModal.fromTemplateUrl('html/_configuration.html', {
        scope: $scope
      }).then(function (modal) {
        $scope.bannerModal = modal;
      });

      $scope.showBannerModal = function ($event) {
        $scope.bannerModal.show($event);
      };

      $scope.hideBannerModal = function ($event) {
        $scope.bannerModal.hide($event);
      };
    }]
  };
});
