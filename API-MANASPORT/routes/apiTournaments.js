var express = require("express");
var router = express.Router();
const dbConn = require("../config/db");

// SHOW ALL TOURNAMENTS
router.get("/tournaments", (req, res) => {
  dbConn.query(`SELECT TOUR.TournamentId, TOUR.name, TOUR.sport, TOUR.category, TOUR.createdate, TOUR.UserId, TOUR.disabled,
  COUNT(T.TeamId) AS 'NTeams', U.name AS 'NameAdmin'  
  FROM tournament TOUR
  LEFT JOIN team T 
  ON T.TournamentId = TOUR.TournamentId
  LEFT JOIN user U 
  ON U.UserId = TOUR.UserId
  WHERE TOUR.disabled = 0
  GROUP BY TournamentId;`, (err, rows) => {
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

    `SELECT T.TeamId, T.name, T.badge, T.locality, T.coach, T.coach2, T.contactEmail, T.contactPhone,
        COUNT(P.PlayerId) AS 'NPlayers' 
        FROM team T
        LEFT JOIN player P 
        ON P.TeamId = T.TeamId
        WHERE T.TournamentId = ${TournamentId} AND T.disabled = 0
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
    `SELECT M.MatchId, M.date, T.name AS 'localTeam', T2.name AS 'awayTeam', M.localteam_score, M.awayteam_score, M.matchday, T.badge AS 'localbadge', T2.badge AS 'awaybadge'
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

//SHOW QUALIFICATION OF A TOURNAMENT
router.get("/tournaments/qualification/:TournamentId/", (req, res) => {
  const TournamentId = req.params.TournamentId;
  dbConn.query(
    `SELECT
    a1.badge,
    a1.TeamId as "ID",
    a1.name as "TEAM",
    a1.ptswin + a2.ptsdraw AS 'PTS',
    a1.pg AS 'PG',
    a2.ptsdraw AS 'PE',
    ((SELECT COUNT(TeamId) from team where TournamentId = ${TournamentId}) * 2 - a1.pg - a2.ptsdraw) AS "PP"
FROM
    (SELECT 
        t.badge,
        t.TeamId,
            name,
            3 * COUNT(m.MatchId) AS ptswin,
            COUNT(m.MatchId) AS pg,
            t.TournamentId
    FROM
        manasport.match m
    JOIN manasport.team t
    WHERE
        (m.localTeamId = t.TeamId
            AND m.localteam_score > m.awayteam_score)
            OR (m.awayTeamId = t.TeamId
            AND m.awayteam_score > m.localteam_score)
    GROUP BY t.TeamId) AS a1
        INNER JOIN
    (SELECT 
        t.TeamId, COUNT(m.MatchId) AS ptsdraw, t.TournamentId
    FROM
        manasport.match m
    JOIN manasport.team t
    WHERE
        (m.localTeamId = t.TeamId
            AND m.localteam_score = m.awayteam_score)
            OR (m.awayTeamId = t.TeamId
            AND m.awayteam_score = m.localteam_score)
    GROUP BY t.TeamId) AS a2 ON a1.TeamId = a2.TeamId
WHERE
    a1.TournamentId = ${TournamentId}
        AND a2.TournamentId = ${TournamentId}
  ORDER BY PTS DESC`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

//Edit result of a match
router.put("/tournaments/editMatch", (req, res) => {
  const data = req.body;
  dbConn.query(
    `UPDATE manasport.match set 
      localteam_score = ${data.localteam_score}, 
      awayteam_score = ${data.awayteam_score} 
      WHERE MatchId = '${data.MatchId}';`,
    (err, rows) => {
      if (err) throw err;
      res.send(data);
    }
  );
});

function bergerTable(teams, useDummy = false, dummy = {}) {
  if (!Array.isArray(teams))
    teams = Array.from({ length: teams }).map((_, i) => i);
  else teams = [...teams]; // copy array to avoid side effects
  if (teams.length % 2 !== 0) teams.push(dummy);

  const n = teams.length;
  const numberOfRounds = n - 1;
  const gamesPerRound = n / 2;

  let columnA = teams.slice(0, gamesPerRound);
  let columnB = teams.slice(gamesPerRound);
  const fixed = teams[0];

  return Array.from({ length: numberOfRounds }).map((_, i) => {
    let gameCount = 1;
    let round = Array.from({ length: gamesPerRound }).reduce((acc, _, k) => {
      if (useDummy || (columnA[k] !== dummy && columnB[k] !== dummy)) {
        acc.push({
          round: i + 1,
          game: gameCount,
          teamA: columnA[k],
          teamB: columnB[k]
        });
        gameCount++;
      }
      return acc;
    }, []);

    // rotate elements
    columnA = [fixed, columnB.shift(), ...columnA.slice(1)];
    columnB.push(columnA.pop());
    return round;
  });
}

router.get("/tournaments/createMatchs/:TournamentId", (req, res) => {
  const TournamentId = req.params.TournamentId;
  dbConn.query(
    `DELETE FROM manasport.match WHERE TournamentId = ${TournamentId};`,
    err => {
      if (err) throw err;
    }
  );
  dbConn.query(
    `SELECT TeamId FROM team WHERE TournamentId = ${TournamentId};`,
    (err, teams) => {
      if (err) throw err;
      const nTeams = teams.length;
      const calculation = bergerTable(nTeams);
      calculation.map(matches => {
        matches.map(match => {
          dbConn.query(
            `INSERT INTO manasport.match (localTeamId, awayTeamId, matchday, TournamentId) VALUES('${
            teams[match.teamA].TeamId
            }', '${teams[match.teamB].TeamId}', '${
            match.round
            }', '${TournamentId}')`
          );
          dbConn.query(
            `INSERT INTO manasport.match (localTeamId, awayTeamId, matchday, TournamentId) VALUES('${
            teams[match.teamB].TeamId
            }', '${teams[match.teamA].TeamId}', '${match.round +
            calculation.length}', '${TournamentId}')`
          );
        });
      });
      res.sendStatus(200);
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
