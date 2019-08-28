import { IUser, ITournament, ITeam, IPlayer, IMatch } from './interfaces';

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

type TAllLeagues = {
    type: "SET_ALLLEAGUES";
    allleagues: [];
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


//TEAMS
type TTeamId = {
    type: "SET_TEAMID";
    TeamId: number
};

type TNewTeam = {
    type: "NEW_TEAM";
    team: ITeam
};

type TDeleteTeam = {
    type: "DELETE_TEAM";
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

type TNewPlayer = {
    type: "NEW_PLAYER";
    player: IPlayer
};

type TPutPlayer = {
    type: "PUT_PLAYER";
    PlayerId: number;
    player: IPlayer;
};

type TDeletePlayer = {
    type: "DELETE_PLAYER";
    PlayerId: number
};

//MATCHS
type TMatchs = {
    type: "SET_MATCHS";
    matchs: [];
};

type TMatchId = {
    type: "SET_MATCHID";
    MatchId: number
};

type TPutMatch = {
    type: "PUT_MATCH";
    MatchId: number;
    match: IMatch;
};

//QUALIFICATION
type TQualification = {
    type: "SET_QUALIFICATION";
    qualification: [];
}


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
/*Token*/   TToken |
/*User*/    TUser | TPutUser | TUserById |
/*League*/  TNewLeague | TAllLeagues | TLeague | TPutLeague | TDeleteLeague | TLeagueId | TLeagueTeams |
/*Team*/    TTeamId | TNewTeam | TDeleteTeam | TPutTeam |
/*Matchs*/  TMatchs | TPutMatch | TMatchId |
/*Players*/ TPlayer | TNewPlayer | TPutPlayer | TPlayerId | TDeletePlayer |
/*Qualification*/ TQualification