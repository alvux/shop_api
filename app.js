/**
 *  @file   app.js
 *  @author  Alexandre Vu
 *  @date    1/19/2019
 *
 *  @section DESCRIPTION
 *
 * Express configuration
 *
 */
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger/swagger.yaml');

require("./db/db");
const index = require("./routes/index");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// initialize the session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use("/", index);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = app;
