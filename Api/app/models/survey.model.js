const mongoose = require("mongoose");

const Survey = mongoose.model(
  "Survey",
  new mongoose.Schema({
    name: String,
    organization: String,
    location: String,
    email: String,
    questionnaires: []
  })
);

module.exports = Survey;
