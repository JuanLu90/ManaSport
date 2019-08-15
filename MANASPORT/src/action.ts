import { ActionCreator } from 'redux';
import { TAction } from './actionTypes';
import { IUser, ITournament, ITeam, IPlayer, IMatch } from './interfaces';

//TOKEN
export const setToken: ActionCreator<TAction> = (token: string) => ({
    type: "SET_TOKEN",
    token
});

//ALL USERS (ONLY FOR MASTER)
export const setUsers: ActionCreator<TAction> = (users: []) => ({
    type: "SET_USERS",
    users
});

//USER BY ID
export const setUserById: ActionCreator<TAction> = (UserId: number, user: IUser) => ({
    type: "SET_USER_BY_ID",
    UserId,
    user
});

//UPDATE USER
export const putUserById: ActionCreator<TAction> = (UserId: string, user: IUser) => ({
    type: "PUT_USER",
    UserId,
    user
});

//LEAGUES
export const setLeagues: ActionCreator<TAction> = (leagues: []) => ({
    type: "SET_LEAGUES",
    leagues
});


export const newLeague: ActionCreator<TAction> = (league: ITournament) => ({
    type: "NEW_LEAGUE",
    league
});

export const putLeagueById: ActionCreator<TAction> = (LeagueId: number, league: ITournament) => ({
    type: "PUT_LEAGUE",
    LeagueId,
    league
});

export const deleteLeagueById: ActionCreator<TAction> = (LeagueId: number) => ({
    type: "DELETE_LEAGUE",
    LeagueId
});

export const setLeagueId: ActionCreator<TAction> = (leagueId: number) => ({
    type: "SET_LEAGUEID",
    leagueId
});

export const setLeagueTeams: ActionCreator<TAction> = (leagueTeams: []) => ({
    type: "SET_LEAGUE_TEAMS",
    leagueTeams
});

//TEAMS
export const setTeamId: ActionCreator<TAction> = (TeamId: number) => ({
    type: "SET_TEAMID",
    TeamId
});

export const newTeam: ActionCreator<TAction> = (team: ITeam) => ({
    type: "NEW_TEAM",
    team
});


export const deleteTeamById: ActionCreator<TAction> = (TeamId: number) => ({
    type: "DELETE_TEAM",
    TeamId
});

export const putTeamById: ActionCreator<TAction> = (TeamId: number, team: ITeam) => ({
    type: "PUT_TEAM",
    TeamId,
    team
});

//PLAYERS
export const setTeamPlayers: ActionCreator<TAction> = (teamPlayers: []) => ({
    type: "SET_TEAM_PLAYERS",
    teamPlayers
});

export const setPlayerId: ActionCreator<TAction> = (PlayerId: number) => ({
    type: "SET_PLAYERID",
    PlayerId
});

export const putPlayerById: ActionCreator<TAction> = (PlayerId: number, player: IPlayer) => ({
    type: "PUT_PLAYER",
    PlayerId,
    player
});


//MATCHS
export const setMatchs: ActionCreator<TAction> = (matchs: []) => ({
    type: "SET_MATCHS",
    matchs
});

export const putMatchById: ActionCreator<TAction> = (MatchId: number, match: IMatch) => ({
    type: "PUT_MATCH",
    MatchId,
    match
});

export const setQualification: ActionCreator<TAction> = (qualification: []) => ({
    type: "SET_QUALIFICATION",
    qualification
});




//TOURNAMENTS
// export const setTournaments: ActionCreator<TAction> = (tournaments: []) => ({
//     type: "SET_TOURNAMENTS",
//     tournaments
// });


// export const newTournament: ActionCreator<TAction> = (tournament: ITournament) => ({
//     type: "NEW_TOURNAMENT",
//     tournament
// });

// export const putTournamentById: ActionCreator<TAction> = (TournamentId: number, tournament: ITournament) => ({
//     type: "PUT_TOURNAMENT",
//     TournamentId,
//     tournament
// });

// export const deleteTournamentById: ActionCreator<TAction> = (TournamentId: number) => ({
//     type: "DELETE_TOURNAMENT",
//     TournamentId
// });

// export const setTournamentId: ActionCreator<TAction> = (TournamentId: number) => ({
//     type: "SET_TOURNAMENTID",
//     TournamentId
// });

// export const setTournamentTeams: ActionCreator<TAction> = (tournamentTeams: []) => ({
//     type: "SET_TOURNAMENT_TEAMS",
//     tournamentTeams
// });

