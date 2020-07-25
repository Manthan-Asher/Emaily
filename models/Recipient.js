const mongoose = require("mongoose");
const {Schema} = mongoose;

const RecipientSurvey = new Schema({
  email: String,
  responded: {type: Boolean, default: false},
});

module.exports = RecipientSurvey;
