var express = require("express");
var router = express.Router();
const dbConn = require("../../config/db");
var jwt = require("jsonwebtoken");

//token sent, WORKS FINE!!
router.post("/auth", (req, res) => {

  const data = req.body;

  dbConn.query(
    `SELECT id, username, email, password FROM users WHERE email = 
    "${data.email}" AND password = MD5("${data.password}")`,
    (err, rows) => {
      console.log(rows)
      if (err) throw err;
      if (rows.length > 0) {
        let token = jwt.sign(
          {            
            id: rows[0].id,
            username: rows[0].username,
            email: rows[0].email
          },
          "mysecret",
          { expiresIn: 3600 }
        );
        res.send(token);
      } else {
        res.status(400).send("invalid credentials");
      }
    }
  );
});


module.exports = router;
