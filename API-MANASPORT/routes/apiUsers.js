var express = require("express");
var router = express.Router();
const dbConn = require("../config/db");

// SHOW ALL USERS
router.get("/users", (req, res) => {
  dbConn.query("SELECT * FROM user", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/users/countTournaments/:UserId", (req, res) => {
  const UserId = req.params.UserId;
  dbConn.query(
    `SELECT 
    COUNT(*) AS 'countTournaments'
    FROM user U 
    INNER JOIN tournament AS TOUR on U.UserId = TOUR.UserId 
    WHERE U.UserId = ${UserId} AND TOUR.disabled = 0`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

// SHOW USER BY ID
router.get("/users/:UserId", (req, res) => {
  const UserId = req.params.UserId;
  dbConn.query(
    `SELECT U.UserID, U.email, U.Username, U.name, U.surname, U.avatar, U.createdate,
    COUNT(TOUR.TournamentId) AS 'NTournaments'
    FROM user u
    LEFT JOIN Tournament TOUR
    ON U.UserId = TOUR.UserId
    WHERE U.UserId = ${UserId} AND TOUR.disabled = 0
    GROUP BY UserId;`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

// CREATE A NEW USER
router.post("/users/newUser", (req, res) => {
  const data = req.body;
  dbConn.query("INSERT INTO user set ?", [data], (err, rows) => {
    if (err) {
      res.status(400).send({ e: err.errno });
    } else {
      res.send(data);
    }
  });
});

// EDIT USER BY ID
router.put("/users/edit/:UserId", (req, res) => {
  const data = req.body;
  dbConn.query(
    `UPDATE user set 
      username = '${data.username}', 
      name = '${data.name}', 
      surname = '${data.surname}',  
      email = '${data.email}',
      avatar = '${data.avatar}'
      WHERE UserId = ${data.UserId};`,
    (err, rows) => {
      if (err) throw err;
      res.send(data);
    }
  );
});

// SEND ALL INFO OF LEAGUES AND THE COUNT OF TEAMS BY USERID
router.get("/users/tournamentsList/leagues/:UserId", (req, res) => {
  const UserId = req.params.UserId;
  dbConn.query(
    `SELECT TOUR.TournamentId, TOUR.name, TOUR.sport, TOUR.category, TOUR.createdate, TOUR.UserId, TOUR.disabled,
        COUNT(T.TeamId) AS 'NTeams' 
        FROM tournament TOUR
        LEFT JOIN team T 
        ON T.TournamentId = TOUR.TournamentId
        WHERE TOUR.UserId = ${UserId} AND TOUR.disabled = 0
        GROUP BY TournamentId`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

//SELECT LEAGUES BY USERID
// router.get("/users/leaguesList/:UserId", (req, res) => {
//   const UserId = req.params.UserId;
//   dbConn.query(
//     "SELECT * FROM user AS U INNER JOIN league AS L on U.UserId = L.UserId WHERE U.UserId = ?",
//     [UserId],
//     (err, rows) => {
//       if (err) throw err;
//       res.send(rows);
//     }
//   );
// });

module.exports = router;
