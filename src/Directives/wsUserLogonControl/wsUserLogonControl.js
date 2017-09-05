(function() {
    angular
        .module("WhiteSturgeon")
        .directive("wsUserLogonControl", wsUserLogonControl);

    wsUserLogonControl.$inject = ["$location", "oauthService"];
    function wsUserLogonControl($location, auth) {
        var directive = {
            scope: {
            },
            link: link,
            controller: userLogonController,
            templateUrl: "src/Directives/wsUserLogonControl/wsUserLogonControl.html",
            restrict: "E"
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    userLogonController.$inject = ["$scope", "$rootScope", "oauthService"];

    function userLogonController(scope, rootScope, auth) {
        scope.isLoggedIn = auth.getIsLoggedIn();

        if (!scope.isLoggedIn) {
            auth.initImplicitFlow();
        }

        scope.claims = auth.getIdentityClaims();

        scope.logout = function () {
            var token = auth.getIdToken();
            auth.logOut();
            window.location = auth.logoutUrl + "?post_logout_redirect_uri=https://" + window.location.host + "/&id_token_hint=" + token;
        };
    }
})();