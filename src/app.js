const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgon = require("morgan");

const apiV1 = require("./routes/api.v1");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");

const app = express();

// Add CORS and security related middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgon("combined"));
app.use("/v1", apiV1);

app.all("*", (req, res, next) => {
  // if arg passed to next it will assume there was an error
  next(new AppError(`Cant't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
