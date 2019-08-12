import { IUser, ITournament, ITeam, IPlayer } from './interfaces';

//TOKEN
type TToken = {
    type: "SET_TOKEN";
    token: string;
};

//USER
type TUser = {
    type: "SET_USERS";
    users: [];
};

type TUserById = {
    type: "SET_USER_BY_ID";
    UserId: number;
    user: IUser;
};

type TPutUser = {
    type: "PUT_USER";
    UserId: string;
    user: IUser;
};

//LEAGUE
type TLeague = {
    type: "SET_LEAGUES";
    leagues: [];
};

type TNewLeague = {
    type: "NEW_LEAGUE";
    league: ITournament
};

type TPutLeague = {
    type: "PUT_LEAGUE";
    LeagueId: number;
    league: ITournament;
};

type TDeleteLeague = {
    type: "DELETE_LEAGUE";
    LeagueId: number
};

type TLeagueId = {
    type: "SET_LEAGUEID";
    leagueId: number
};

type TLeagueTeams = {
    type: "SET_LEAGUE_TEAMS",
    leagueTeams: []
}

//PLAYOFF
type TPlayoff = {
    type: "SET_PLAYOFFS";
    playoffs: [];
};

type TNewPlayoff = {
    type: "NEW_PLAYOFF";
    playoff: ITournament
};

type TDeletePlayoff = {
    type: "DELETE_PLAYOFF";
    PlayoffId: number
};

type TPutPlayoff = {
    type: "PUT_PLAYOFF";
    PlayoffId: number;
    playoff: ITournament;
};

type TPlayoffId = {
    type: "SET_PLAYOFFID";
    playoffId: number
};


//TEAMS
type TTeamId = {
    type: "SET_TEAMID";
    TeamId: number
};

type TPutTeam = {
    type: "PUT_TEAM";
    TeamId: number;
    team: ITeam;
};

//PLAYERS
type TPlayer = {
    type: "SET_TEAM_PLAYERS";
    teamPlayers: [];
};

type TPlayerId = {
    type: "SET_PLAYERID";
    PlayerId: number
};

type TPutPlayer = {
    type: "PUT_PLAYER";
    PlayerId: number;
    player: IPlayer;
};


//MATCHS
type TMatchs = {
    type: "SET_MATCHS";
    matchs: [];
};


//TOURNAMENTS
// type TTournament = {
//     type: "SET_TOURNAMENTS";
//     tournaments: [];
// };

// type TNewTournament = {
//     type: "NEW_TOURNAMENT";
//     tournament: ITournament
// };

// type TPutTournament = {
//     type: "PUT_TOURNAMENT";
//     TournamentId: number;
//     tournament: ITournament;
// };

// type TDeleteTournament = {
//     type: "DELETE_TOURNAMENT";
//     TournamentId: number
// };

// type TTournamentId = {
//     type: "SET_TOURNAMENTID";
//     TournamentId: number
// };

// type TTournamentTeams = {
//     type: "SET_TOURNAMENT_TEAMS",
//     tournamentTeams: []
// }






export type TAction = 
            TToken |
/*User*/    TUser | TPutUser | TUserById |
/*League*/  TNewLeague | TLeague | TPutLeague | TDeleteLeague | TLeagueId | TLeagueTeams |
/*Playoff*/ TPlayoff | TNewPlayoff | TDeletePlayoff | TPlayoffId | TPutPlayoff |
/*Team*/    TTeamId | TPutTeam |
/*Matchs*/  TMatchs |
/*Players*/ TPlayer | TPutPlayer | TPlayerId