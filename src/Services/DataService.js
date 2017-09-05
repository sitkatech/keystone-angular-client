(function() {
    angular
        .module("WhiteSturgeon")
        .factory("DataService", dataService);

    dataService.$inject = ["$http"];

    function dataService(http) {
        return {
            GetSettings: getSettings
        };

        function getSettings() {
            var url = "/api/settings";
            var promise = http.get(url)
                .then(success)
                .catch(error);
            return promise;
        }
    }
})();
