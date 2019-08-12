var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var apiAuth = require("./routes/apiAuth");
var apiUsers = require("./routes/apiUSers");
var apiTournaments = require("./routes/apiTournaments");
var apiTeams = require("./routes/apiTeams");
var apiPlayers = require("./routes/apiPlayers");

var app = express();


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiAuth);
app.use("/api", apiUsers);
app.use("/api", apiTournaments);
app.use("/api", apiTeams);
app.use("/api", apiPlayers);

module.exports = app;
