(function() {
    angular
        .module("WhiteSturgeon")
        .config(config);

    config.$inject = ["$routeProvider"];
    function config(routeProvider) {
        routeProvider
            .when("/",
                {
                    templateUrl: "/src/Features/Home/home.html",
                    controller: "HomeController",
                    resolve: {
                        LoggedIn: onlyLoggedIn
                    }
            })
            .when("/SignoutCleanup",
                {
                    templateUrl: "/src/Features/Home/home.html",
                    controller: "HomeController",
                    resolve: {
                        LogOut: logout
                    }
            })
            .when("/NotFound",
                {
                    templateUrl: "/src/Features/NotFound/not_found.html",
                    controller: 'NotFoundController'
            })
            .otherwise({ redirectTo: "/NotFound" });
        
    }

    onlyLoggedIn.$inject = ["$q", "$http", "$window", "$rootScope", "oauthService"];
    function onlyLoggedIn(q, http, win, rootScope, oauth) {
        var deferred = q.defer();
        var isLoggedIn = oauth.getIsLoggedIn();

        console.log(isLoggedIn);

        if (isLoggedIn) {
            deferred.resolve(true);
            updateToken(oauth, http);
        } else {
            deferred.reject('Needs Refresh');
            console.log('tryRefresh');
            oauth
                .tryRefresh()
                .then(updateToken)
                .catch(function () {
                    console.log('caught');
                    oauth.initImplicitFlow();
                });
        }

        return deferred.promise;
    }

    logout.$inject = ["$q", "oauthService"];
    function logout(q, oauth) {
        var deferred = q.defer();
        var isLoggedIn = oauth.getIsLoggedIn();
        //console.log(isLoggedIn);

        if (isLoggedIn) {
            deferred.resolve(true);
            oauth.logOut();
        }
        return deferred.promise;
    }

    updateToken.$inject = ["oauthService", "$http"];
    function updateToken(oauth, http) {
        console.log("updating token");
        var token = oauth.getAccessToken();
        console.log('Bearer ' + token);
        http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

})();