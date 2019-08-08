export interface IUser {
    UserId: string;
    email: string;
    username: string;
    name: string;
    surname: string;
    isAdmin: boolean;
    isMaster: boolean;
    birthDate: string;
}

export interface ITournament {
    TournamentId: number;
    name: string;
    teams: number;
    category: string;
    createdate: string;
    sport: string;
    NTeams: number;
}

export interface ITeam {
    TeamId: number;
    name: string;
    locality: string;
    badge: string;
    coach: string;
    coach2: string;
    contactEmail: string;
    contactPhone: string;
    TournamentId: number;
}

export interface IMatch {
    MatchId: number;
    date: string;
    localTeam: string;
    awayTeam: string;
    localteam_score: number;
    awayteam_score: number;
    matchday: number;
}

// export interface IPlayoff {
//     PlayoffId: number;
//     name: string;
//     teams: number;
//     category: string;
//     createdate: string;
//     sport: string;
//     NTeams: number;
// }



