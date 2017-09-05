(function () {
    angular
        .module("WhiteSturgeon")
        .run(authInitiator);

    authInitiator.$inject = ["settings", "$http", "$window", "oauthService"];

    function authInitiator(config, http, win, auth) {

        auth.loginUrl = config.keystoneLoginUrl;
        auth.logoutUrl = config.keystoneLogoutUrl;
        auth.redirectUri = location.origin + "/";
        auth.clientId = config.keystoneClientID;
        auth.scope = config.keystoneScope;
        auth.issuer = config.keystoneIssuer;
        auth.oidc = true;

        auth.setup({
            loginState: "login",
            onTokenReceived: function (context) {
                var authHeader = "Bearer " + context.accessToken;
                http.defaults.headers.common["Authorization"] = authHeader;
                win.localStorage.setItem("UserClaims", JSON.stringify(context.idClaims));

                var filteredOrgs = win.localStorage.getItem("FilteredOrganizations");
                if (!filteredOrgs) {
                    var userOrgName = [context.idClaims.organization_shortname];
                    win.localStorage.setItem("FilteredOrganizations", JSON.stringify(userOrgName));
                }
            }
        });
    }
})();