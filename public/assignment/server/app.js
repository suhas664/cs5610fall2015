"use strict";

module.exports = function(app) {
    var fmodel = require("./models/form.model.js")(app);
    var umodel = require("./models/user.model.js")(app);

    require("./services/field.service.js")(app, fmodel);
    require("./services/form.service.js")(app, fmodel);
    require("./services/user.service.js")(app, umodel);
};