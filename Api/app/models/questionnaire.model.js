const mongoose = require("mongoose");

const Questionnaire = mongoose.model(
  "Questionnaire",
  new mongoose.Schema({
    questionnaire: String,
    options: [],
    values: []
  })
);

module.exports = Questionnaire;
