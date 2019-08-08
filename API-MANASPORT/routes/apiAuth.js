var express = require("express");
var router = express.Router();
const dbConn = require("../config/db");
var jwt = require("jsonwebtoken");

router.get("/", (_request, response) => {
  response.send("Welcome to Manasport API");
});

//token sent, WORKS FINE!!
router.post("/auth", (_request, response) => {
  const data = _request.body;
  dbConn.query(
    `SELECT * FROM user WHERE email = 
    "${data.email}" AND password = MD5("${data.password}")`,
    (err, rows) => {
      if (err) throw err;
      if (rows.length > 0) {
        let token = jwt.sign(
          {
            UserId: rows[0].UserId,
            username: rows[0].username,
            avatar: rows[0].avatar,
            isAdmin: rows[0].isAdmin ? true : false,
            isMaster: rows[0].isAdmin ? true : false
          },
          "mysecret",
          { expiresIn: 3600 }
        );
        response.send(token);
      } else {
        response.status(400).send("invalid credentials");
      }
    }
  );
});


module.exports = router;
