var express = require('express');
var router = express.Router();
const dbConn = require("../../config/db");

// Get all tournaments
// router.get("/tournaments", function (req, res) {
//     dbConn.query("SELECT * FROM TOURNAMENTS", (err, rows) => {
//         if (err) throw err;
//         res.send(rows);
//     }
//     )
// });

// Get current user´s tournaments
router.post("/tournaments", function (req, res) {
    const filters = req.body;
    let sportFilter = filters.sport ? `AND sport = '${filters.sport}'` : '';
    dbConn.query(
        `SELECT * FROM TOURNAMENTS WHERE UserId = ${filters.UserId} ${sportFilter}`,
        [filters],
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        }
    )
});

// Get all tournament´s teams
router.get("/tournaments/teams/:tournamentId", function (req, res) {
    const tournamentId = req.params.tournamentId;
    dbConn.query(
        "SELECT * FROM teams WHERE TournamentId = ?",
        [tournamentId],
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        }
    );
});

// Create a new tournament
router.post("/tournaments/newTournament", (req, res) => {
    const data = req.body;
    dbConn.query("INSERT INTO tournaments set ?",
        [data],
        (err, rows) => {
            if (err) throw err;
            res.send(data);
        });
});

// Create a new team
router.post("/tournaments/newTeam", (req, res) => {
    const data = req.body;
    console.log(data)
    dbConn.query("INSERT INTO teams set ?", [data], (err, rows) => {
        if (err) throw err;
        res.send(data);
    });
});

// Delete a tournament
router.delete("/tournaments/deleteTournament/:tournamentId", (req, res) => {
    const tournamentId = req.params.tournamentId;
    dbConn.query(
        "DELETE FROM tournaments WHERE Id = ?",
        [tournamentId],
        (err, rows) => {
            if (err) throw err;
            res.send("tournament deleted");
        }
    );
});

// Get tournament´s qualification
router.get("/tournaments/qualification/:tournamentId", (req, res) => {
    const tournamentId = req.params.tournamentId;
    dbConn.query(
        `SELECT a1.badge, a1.Id as "ID", a1.name as "TEAM", a1.ptswin + a2.ptsdraw AS 'PTS', a1.pg AS 'PG', a2.ptsdraw AS 'PE', a3.pp AS 'PP', a3.pp, a1.pg + a2.ptsdraw + a3.pp AS 'PJ'
      FROM
          (SELECT  t.badge, t.Id, name, 3 * COUNT(m.Id) AS ptswin, COUNT(m.Id) AS pg, t.TournamentId
          FROM manasports.matches m
          JOIN manasports.teams t
          WHERE (m.localTeamId = t.Id AND m.localteam_score > m.awayteam_score) OR (m.awayTeamId = t.Id AND m.awayteam_score > m.localteam_score)
          GROUP BY t.Id) AS a1
              INNER JOIN
          (SELECT t.Id, COUNT(m.Id) AS ptsdraw, t.TournamentId 
          FROM manasports.matches m
          JOIN manasports.teams t
          WHERE (m.localTeamId = t.Id AND m.localteam_score = m.awayteam_score) OR (m.awayTeamId = t.Id AND m.awayteam_score = m.localteam_score)
          GROUP BY t.Id) AS a2 
          INNER JOIN
          (SELECT  t.badge, t.Id, name, COUNT(m.Id) AS pp, t.TournamentId
          FROM manasports.matches m
          JOIN manasports.teams t
          WHERE (m.localTeamId = t.Id AND m.localteam_score < m.awayteam_score) OR (m.awayTeamId = t.Id AND m.awayteam_score < m.localteam_score)
          GROUP BY t.Id) AS a3 ON (a1.Id = a2.Id AND a1.Id = a3.Id)
      WHERE a1.TournamentId = ${tournamentId} AND a2.TournamentId = ${tournamentId} AND a3.TournamentId = ${tournamentId}
      ORDER BY PTS DESC`,
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        }
    );
});

// Get all tournament´s matches
router.get("/tournaments/matches/:tournamentId/:matchday", (req, res) => {
    const tournamentId = req.params.tournamentId;
    const matchday = req.params.matchday;
    dbConn.query(
        `SELECT M.Id, M.date, T.name AS 'localTeam', T2.name AS 'awayTeam', M.localteam_score, M.awayteam_score, M.matchday, T.badge AS 'localbadge', T2.badge AS 'awaybadge'
          FROM manasports.matches AS M
          LEFT JOIN teams AS T
          ON M.localTeamId = T.Id
          LEFT JOIN teams AS T2
          ON M.awayTeamId = T2.Id
          WHERE T.TournamentId = ${tournamentId} AND M.matchday = ${matchday};`,
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        }
    );
});

// Edit a match result
router.put("/tournaments/matches/editMatch", (req, res) => {
    const data = req.body;
    dbConn.query(
        `UPDATE manasports.matches set 
        date = '${data.date}',
        localteam_score = ${data.localteam_score}, 
        awayteam_score = ${data.awayteam_score} 
        WHERE Id = '${data.Id}';`,
        (err, rows) => {
            if (err) throw err;
            res.send(data);
        }
    );
});




module.exports = router;