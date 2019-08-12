var express = require("express");
var router = express.Router();
const dbConn = require("../config/db");



// SHOW ALL TOURNAMENTS
router.get("/tournaments", (req, res) => {
    dbConn.query("SELECT * FROM tournament", (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

// SHOW TOURNAMENT BY ID
router.get("/tournaments/:TournamentId", (req, res) => {
    const TournamentId = req.params.TournamentId;
    dbConn.query(
        "SELECT * FROM tournament WHERE TournamentId = ?",
        [TournamentId],
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        }
    );
});

// COUNT TEAMS OF A TOURNAMENT BY ID
router.get("/tournaments/countTeams/:TournamentId", (req, res) => {
    const TournamentId = req.params.TournamentId;
    dbConn.query(
        "SELECT COUNT(*) FROM team AS T INNER JOIN tournament AS TOUR on T.TournamentId = TOUR.TournamentId WHERE TOUR.TournamentId = ?;",
        [TournamentId],
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        }
    );
});

// 
router.get("/tournaments/tournamentTeams/:TournamentId", (req, res) => {
    const TournamentId = req.params.TournamentId;
    dbConn.query(
        // `SELECT T.TeamId, T.name, T.locality, T.badge, T.coach, T.coach2, T.contactEmail, T.contactPhone, T.TournamentId
        // FROM tournament AS TOUR INNER JOIN team AS T 
        // WHERE T.TournamentId = TOUR.TournamentId
        // AND TOUR.disabled = 0 AND TOUR.TournamentId = ${TournamentId}
        // GROUP BY T.name;`,
        `
        SELECT T.TeamId, T.name, T.badge, T.locality, T.coach, T.coach2, T.contactEmail, T.contactPhone,
        COUNT(P.PlayerId) AS 'NPlayers' 
        FROM team T
        LEFT JOIN player P 
        ON P.TeamId = T.TeamId
        WHERE T.TournamentId = ${TournamentId}
        GROUP BY TeamId;`,
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        }
    );
});


// CREATE A NEW TOURNAMENT
router.post("/tournaments/newTournament", (req, res) => {
    const data = req.body;
    dbConn.query("INSERT INTO tournament set ?", [data], (err, rows) => {
        if (err) throw err;
        res.send(data);
    });
});

// EDIT TOURNAMENT BY ID
router.put("/tournaments/editTournament/:TournamentId", (req, res) => {
    const data = req.body;
    dbConn.query(
        `UPDATE tournament set 
      name = '${data.name}', 
      category = '${data.category}',  
      sport = '${data.sport}' 
      WHERE TournamentId = ${data.TournamentId};`,
        (err, rows) => {
            if (err) throw err;
            res.send(data);
        }
    );
});

// DISABLE A TOURNAMENT
router.post("/tournaments/deleteTournament/:TournamentId", (req, res) => {
    const TournamentId = req.params.TournamentId;
    dbConn.query(
        "UPDATE tournament SET disabled = 1 WHERE TournamentId = ?",
        [TournamentId],
        (err, result) => {
            if (err) throw err;
            res.send("league deleted");
        }
    );
});


//SHOW ALL MATCHS OF A TOURNAMENT
router.get("/tournaments/matchs/:TournamentId/:matchday", (req, res) => {
    const TournamentId = req.params.TournamentId;
    const matchday = req.params.matchday;
    dbConn.query(
        `SELECT M.Matchid, M.date, T.name AS 'localTeam', T2.name AS 'awayTeam', M.localteam_score, M.awayteam_score, M.matchday, T.badge AS 'localbadge', T2.badge AS 'awaybadge'
		FROM manasport.match AS M
		LEFT JOIN team AS T
		ON M.localTeamId = T.TeamId
        LEFT JOIN team AS T2
		ON M.awayTeamId = T2.TeamId
        WHERE T.TournamentId = ${TournamentId} AND M.matchday = ${matchday};`,
        (err, rows) => {
            if (err) throw err;
            res.send(rows);
        }
    );
});







// TORNEOS JUNTO A LOS EQUIPOS QUE PARTICIPAN
// SELECT TOUR.TournamentId, TOUR.name, TOUR.UserId, T.name
//       FROM tournament AS TOUR INNER JOIN team AS T 
//       WHERE T.TournamentId = TOUR.TournamentId AND TOUR.UserId = 1 AND TOUR.disabled = 0
//       GROUP BY T.name

//EQUIPOS JUNTO A LOS TORNEOS EN LOS QUE PARTICIPAN
// SELECT T.TeamId, T.name, T.name, TOUR.name
//       FROM team AS T INNER JOIN tournament AS TOUR
//       WHERE T.TournamentId = TOUR.TournamentId AND TOUR.UserId = 1 AND TOUR.disabled = 0
//       GROUP BY T.name

//TORNEOS JUNTO A RESULTADOS DE LOS PARTIDOS
// SELECT TOUR.TournamentId, TOUR.name, TOUR.UserId, M.localteam, M.awayteam, M.localteam_score, M.awayteam_score
//       FROM tournament AS TOUR INNER JOIN manasport.match AS M
//       WHERE M.TournamentId = TOUR.TournamentId AND TOUR.UserId = 1 AND TOUR.disabled = 0 AND UserId = 1
//       GROUP BY M.MatchId;
	




// DELETE A TOURNAMENT
// router.delete("/tournaments/deleteTournament/:UserId", (req, res) => {
//     const UserId = req.params.UserId;
//     dbConn.query(
//         "DELETE FROM tournament WHERE TournamentId = ?",
//         [UserId],
//         (err, result) => {
//             if (err) throw err;
//             res.send("tournament deleted");
//         }
//     );
// });




module.exports = router;
