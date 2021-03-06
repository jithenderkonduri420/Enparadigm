const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.questionnaire = require("./questionnaire.model");
db.permissions = require("./permissions.model");
db.survey = require("./survey.model");

module.exports = db;
