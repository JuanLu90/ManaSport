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


// SHOW USER BY ID
router.get("/users/:UserId", (req, res) => {
    const UserId = req.params.UserId;
    dbConn.query("SELECT * FROM user WHERE UserId = ?", [UserId], (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

// CREATE A NEW USER
router.post("/users/newUser", (req, res) => {
    const data = req.body;
    dbConn.query("INSERT INTO user set ?", [data], (err, rows) => {
        if (err) throw err;
        res.send(data);
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
        WHERE TOUR.UserId = ${UserId} AND TOUR.disabled = 0 AND TOUR.type = "league"
        GROUP BY TournamentId`,
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        }
    );
});

// SEND ALL INFO OF PLAYOFFS AND THE COUNT OF TEAMS BY USERID
router.get("/users/tournamentsList/playoffs/:UserId", (req, res) => {
    const UserId = req.params.UserId;
    dbConn.query(
        `SELECT TOUR.TournamentId, TOUR.name, TOUR.sport, TOUR.category, TOUR.createdate, TOUR.UserId, TOUR.disabled,
        COUNT(T.TeamId) AS 'NTeams' 
        FROM tournament AS TOUR INNER JOIN team AS T 
        WHERE T.TournamentId = TOUR.TournamentId AND TOUR.UserId = ${UserId} AND TOUR.disabled = 0 AND TOUR.type = "playoff"
        GROUP BY TournamentId`,
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        }
    );
});


// SEND ALL INFO OF LEAGUE AND THE COUNT OF TEAMS BY USERID
router.get("/users/playoffsList/:UserId", (req, res) => {
    const UserId = req.params.UserId;
    dbConn.query(
        `SELECT P.PlayoffId, P.name, P.category, P.createdate, P.sport, P.UserId, P.disabled,
      COUNT(T.TeamId) AS 'NTeams' 
      FROM playoff AS P INNER JOIN team AS T 
      WHERE T.PlayoffId = P.PlayoffId AND P.UserId = ${UserId} AND P.disabled = 0
      GROUP BY PlayoffId`,
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        }
    );
});




















// SEND ALL INFO OF PLAYOFF AND THE COUNT OF TEAMS BY USERID
// router.get("/users/playoffsList/:UserId", (req, res) => {
//     const UserId = req.params.UserId;
//     dbConn.query(
//         `SELECT L.PlayoffId, L.name, L.category, L.createdate, L.sport, L.UserId,
//       COUNT(T.TeamId) AS 'NTeams' 
//       FROM manasport.playoff AS L INNER JOIN team AS T 
//       WHERE T.PlayoffId = L.PlayoffId AND L.UserId = ${UserId} 
//       GROUP BY PlayoffId`,
//         (err, rows) => {
//             if (err) throw err;
//             res.send(rows);
//         }
//     );
// });




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
