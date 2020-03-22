var express = require('express');
var router = express.Router();
const dbConn = require("../../config/db");

// GET ALL TOURNAMENTS
router.get("/tournaments", function (req, res) {
    dbConn.query("SELECT * FROM TOURNAMENTS", (err, rows) => {
            if (err) throw err;
            res.send(rows);
        }
    )
});

// GET TOURNAMENTS OF CURRENT USER
router.get("/tournaments/:UserId", function (req, res) {
    const UserId = req.params.UserId;
    dbConn.query(
        "SELECT * FROM TOURNAMENTS WHERE UserId = ?",
        [UserId],
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        }
    )
});


module.exports = router;