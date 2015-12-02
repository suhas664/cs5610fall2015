"use strict";

module.exports = function(app, mongoose, db) {
    var fmodel = require("./models/form.model.js")(app, mongoose, db);
    var umodel = require("./models/user.model.js")(app, mongoose, db);

    require("./services/field.service.js")(app, fmodel);
    require("./services/form.service.js")(app, fmodel);
    require("./services/user.service.js")(app, umodel);
};