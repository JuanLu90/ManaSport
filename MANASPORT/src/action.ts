import { ActionCreator } from 'redux';
import { TAction } from './actionTypes';
import { IUser, ITournament, ITeam, IPlayer } from './interfaces';

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

//PLAYOFFS
export const setPlayoffs: ActionCreator<TAction> = (playoffs: []) => ({
    type: "SET_PLAYOFFS",
    playoffs
});

export const newPlayoff: ActionCreator<TAction> = (playoff: ITournament) => ({
    type: "NEW_PLAYOFF",
    playoff
});

export const deletePlayoffById: ActionCreator<TAction> = (PlayoffId: number) => ({
    type: "DELETE_PLAYOFF",
    PlayoffId
});

export const putPlayoffById: ActionCreator<TAction> = (PlayoffId: number, playoff: ITournament) => ({
    type: "PUT_PLAYOFF",
    PlayoffId,
    playoff
});

export const setPlayoffId: ActionCreator<TAction> = (playoffId: number) => ({
    type: "SET_PLAYOFFID",
    playoffId
});

//TEAMS
export const setTeamId: ActionCreator<TAction> = (TeamId: number) => ({
    type: "SET_TEAMID",
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

