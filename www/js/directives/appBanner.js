app.directive('appBanner', function () {
  return {
    templateUrl: 'html/directives/_appbanner.html',
    controllerAs: 'appBanner',
    controller: ['$scope', '$ionicModal', '$interval', '$window', 'DataService', 'AppInfoRefreshTime', function ($scope, $ionicModal, $interval, $window, DataService, AppInfoRefreshTime) {

      var appBanner = this;
      var refreshCheckTime = 10000; // Time to check for refresh in ms
      var lastRefreshTime = new Date(0);

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
        var now = new Date();
        lastRefreshTime = new Date(
            $window.localStorage.getItem('GoCo.lastRefresh'));

        if (now - lastRefreshTime > AppInfoRefreshTime) {
          lastRefreshTime = now;
          $window.localStorage.setItem('GoCo.lastRefresh', lastRefreshTime);
          DataService.get('AppInfo').then(function (response) {
            if (response.data.banner.title) {
              $scope.banner = response.data.banner;
            }
          });
        }
      };

      appBanner.refreshAppInfo();

      $interval(appBanner.refreshAppInfo, refreshCheckTime);
    }]
  };
});
