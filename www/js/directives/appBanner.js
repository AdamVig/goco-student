app.directive('appBanner', function () {
  return {
    templateUrl: 'html/directives/_appbanner.html',
    controllerAs: 'appBanner',
    controller: ['$scope', '$ionicModal', '$interval', 'DataService', 'AppInfoRefreshTime', function ($scope, $ionicModal, $interval, DataService, AppInfoRefreshTime) {

      var appBanner = this;

      $ionicModal.fromTemplateUrl('html/_banner.html', {
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

      // Refresh app info including banner
      appBanner.refreshAppInfo = function () {
        DataService.get('AppInfo').then(function (response) {
          if (response.data.banner.title) {
            $scope.banner = response.data.banner;
          }
        });
      };

      appBanner.refreshAppInfo();
      $interval(appBanner.refreshAppInfo, AppInfoRefreshTime);
    }]
  };
});
