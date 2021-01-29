const express = require('express');
const validator = require("../routes/validator");
const error = require('../middleware/error');


module.exports = function(app) {
  app.use(express.json());
  app.use('', validator);
  app.use(error);
}