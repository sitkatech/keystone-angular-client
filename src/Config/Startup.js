(function () {
    angular
        .module("WhiteSturgeon", ["ngRoute", "ui.router", "oauth2", "settings.config"])
        .config(configure)
        .run(run);

    configure.$inject = ["$locationProvider"];

    function configure(locationProvider) {
        locationProvider.html5Mode(true);
    }

    run.$inject = [];

    function run() {
   
    }
})();