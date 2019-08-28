export interface IUser {
    UserId: string;
    email: string;
    username: string;
    name: string;
    surname: string;
    isAdmin: boolean;
    isMaster: boolean;
    createdate: string;
    avatar: string;
    NTournaments: number;
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
    NPlayers: number;
}

export interface IMatch {
    MatchId: number;
    date: string;
    localTeam: string;
    awayTeam: string;
    localteam_score: number;
    awayteam_score: number;
    localbadge: string;
    awaybadge: string;
    matchday: number;
}

export interface IPlayer {
    PlayerId: number;
    name: string;
    surname: string;
    age: number;
    position: string;
    goals: number;
    image: string;
}

export interface IQualification {
    ID: number;
    TEAM: string;
    badge: string;
    PTS: number;
    PG: number;
    PE: number;
    PP: number;
}


