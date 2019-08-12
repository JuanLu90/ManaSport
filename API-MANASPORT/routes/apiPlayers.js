var express = require("express");
var router = express.Router();
const dbConn = require("../config/db");

// SHOW ALL PLAYERS
router.get("/players", (req, res) => {
  dbConn.query("SELECT * FROM player", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// SHOW PLAYER BY ID
router.get("/players/:PlayerId", (req, res) => {
  const PlayerId = req.params.PlayerId;
  dbConn.query("SELECT * FROM player WHERE PlayerId = ?", [PlayerId], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// EDIT PLAYER BY ID
router.put("/players/editPlayer/:PlayerId", (req, res) => {
  const data = req.body;
  dbConn.query(
    `UPDATE player set 
      name = ${data.name.length > 0 ? `'${data.name}'` : "NULL"}, 
      surname = ${data.surname.length > 0 ? `'${data.surname}'` : "NULL"},  
      age = '${data.age}',
      position = ${data.position.length > 0 ? `'${data.position}'` : "NULL"}, 
      goals = '${data.goals}'
      WHERE PlayerId = ${data.PlayerId};`,
    (err, rows) => {
      if (err) throw err;
      res.send(data);
    }
  );
});

module.exports = router;
