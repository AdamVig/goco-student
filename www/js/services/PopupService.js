app.service('PopupService', ['$ionicPopup', function ($ionicPopup) {
  var popupService = this;

  /**
   * Show a popup
   * @param {String} popupName Name of popup
   * @param {Object} $event      Contains information from ng-click
   */
  this.showPopup = function (popupName, $event) {

    var popupConfig = {
      configuration: {
        title: 'Configuration',
        templateUrl: 'html/_configurationpopup.html',
        buttons: [{
          text: "I'm ready",
          type: 'button-animated'
        }]
      }
    };

    if (popupConfig[popupName]) {
      $ionicPopup.alert(popupConfig[popupName]);
    }
  };
}]);
