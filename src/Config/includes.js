//Third Party
require("angular");
require("angular-route");
require("angular-ui-router");
require("angular-oidc");


//Config
require("./Startup.js");
require("./RouteConfig.js");
require("./AuthInitiator.js");

//Directives
require("../Directives/wsUserLogonControl/wsUserLogonControl.js");
require("../Directives/wsSidebarControl/wsSidebarControl.js");


//Controllers
require("../Features/Home/HomeController.js");
require("../Features/NotFound/NotFoundController.js");


//Servies