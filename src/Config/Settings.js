(function () {
    angular.module('settings.config', [])
        .constant('settings', {
  "webSubdomain": "www.",
  "keystoneLoginUrl": "https://keystone.sitkatech.com/core/connect/authorize",
  "keystoneLogoutUrl": "https://keystone.sitkatech.com/core/connect/endsession",
  "keystoneIssuer": "https://keystone.sitkatech.com/core",
  "keystoneScope": "openid all_claims keystone",
  "keystoneClientID": "<ClientID>"
});
})();