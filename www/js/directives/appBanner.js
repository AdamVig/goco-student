app.directive('appBanner', function () {
  return {
    templateUrl: 'html/directives/_appbanner.html',
    controllerAs: 'appBanner',
    controller: ['$scope', '$ionicModal', '$interval', 'DataService', 'StorageService', function ($scope, $ionicModal, $interval, DataService, StorageService) {

      var appBanner = this;
      var refreshCheckTime = 10000; // Time to check for refresh in ms

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

      StorageService.store('lastAppInfoRefresh', new Date(0));

      // Refresh app info including banner
      appBanner.refreshAppInfo = function () {
        var request = DataService.refreshAppInfo();
        var hasBanner = false;

        // If request is made, handle the response
        if (request !== false) {
          request.then(function (appInfo) {
            if (appInfo.testbanner.title) {
              $scope.banner = appInfo.testbanner;
              hasBanner = true;
            }
          });
        }
      };

      appBanner.refreshAppInfo();

      $interval(function () {
        appBanner.refreshAppInfo();
      }, refreshCheckTime);
    }]
  };
});
