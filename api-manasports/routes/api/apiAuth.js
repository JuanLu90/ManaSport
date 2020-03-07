var express = require("express");
var router = express.Router();
const dbConn = require("../../config/db");
var jwt = require("jsonwebtoken");

//token sent, WORKS FINE!!
router.post("/auth", (req, res) => {

  const data = req.body;

  dbConn.query(
    `SELECT * FROM users WHERE email = 
    "${data.email}" AND password = MD5("${data.password}")`,
    (err, rows) => {
      if (err) throw err;
      if (rows.length > 0) {
        let token = jwt.sign(
          {
            Id: rows[0].UserId,
            username: rows[0].username
          },
          "mysecret",
          { expiresIn: 3600 }
        );

        console.log(token);

        res.send(token);
      } else {
        res.status(400).send("invalid credentials");
      }
    }
  );
});


module.exports = router;
