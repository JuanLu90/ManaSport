var express = require("express");
var router = express.Router();
const dbConn = require("../config/db");

// SHOW ALL TEAMS
router.get("/teams", (req, res) => {
  dbConn.query("SELECT * FROM team", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// SHOW TEAM BY ID
router.get("/teams/:TeamId", (req, res) => {
  const TeamId = req.params.TeamId;
  dbConn.query("SELECT * FROM team WHERE TeamId = ?", [TeamId], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

//SHOW PLAYERS OF A TEAM BY TEAMID
router.get("/teams/teamPlayers/:TeamId", (req, res) => {
  const TeamId = req.params.TeamId;
  dbConn.query("SELECT * FROM player WHERE TeamId = ?", [TeamId], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// CREATE A NEW TEAM
router.post("/teams/newTeam", (req, res) => {
  const data = req.body;
  dbConn.query("INSERT INTO team set ?", [data], (err, rows) => {
    if (err) throw err;
    res.send(data);
  });
});

// DISABLE A TEAM
router.post("/teams/deleteTeam/:TeamId", (req, res) => {
  // const data = req.body;
  const TeamId = req.params.TeamId;
  dbConn.query(
    `UPDATE team SET disabled = 1 WHERE TeamId = ?;`,[TeamId],
    (err, rows) => {
      if (err) throw err;
      res.send("team deleted");
    }
  );
});

// EDIT TEAM BY ID
router.put("/teams/editTeam/:TeamId", (req, res) => {
  const data = req.body;
  dbConn.query(
    `UPDATE team set 
      name = ${data.name === null ? null : (data.name.length > 0 ? `'${data.name}'` : "NULL")}, 
      locality = ${data.locality === null ? null : (data.locality.length > 0 ? `'${data.locality}'` : "NULL")},  
      coach = ${data.coach === null ? null : (data.coach.length > 0 ? `'${data.coach}'` : "NULL")},
      coach2 = ${data.coach2 === null ? null : (data.coach2.length > 0 ? `'${data.coach2}'` : "NULL")}, 
      contactEmail = ${data.contactEmail === null ? null : (data.contactEmail.length > 0 ? `'${data.contactEmail}'` : "NULL")}, 
      contactPhone = ${data.contactPhone === null ? null : (data.contactPhone.length > 0 ? `'${data.contactPhone}'` : "NULL")}
      WHERE TeamId = ${data.TeamId};`,
    (err, rows) => {
      if (err) throw err;
      res.send(data);
    }
  );
});

module.exports = router;
