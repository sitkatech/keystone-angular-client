(function() {
    angular
        .module("WhiteSturgeon")
        .directive("wsSidebarControl", wsSidebarControl);

    wsSidebarControl.$inject = [];
    function wsSidebarControl() {
        var directive = {
            scope: {
            },
            link: link,
            controller: sidebarController,
            templateUrl: "src/Directives/wsSidebarControl/wsSidebarControl.html",
            restrict: "E"
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    sidebarController.$inject = ["$scope"];

    function sidebarController(scope) {

    }
})();