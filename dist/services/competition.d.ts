export declare const getCompetitions: (teamId: number) => Promise<{
    name: string;
    type: string | null;
    id: number;
    teamId: number;
    season: string | null;
}[]>;
export declare const getCompetitionById: (id: number, teamId: number) => Promise<{
    games: {
        date: Date;
        location: string | null;
        status: import(".prisma/client").$Enums.GameStatus;
        id: number;
        teamId: number;
        opponent: string;
        homeOrAway: string | null;
        period: number;
        teamScore: number;
        opponentScore: number;
        competitionId: number | null;
    }[];
} & {
    name: string;
    type: string | null;
    id: number;
    teamId: number;
    season: string | null;
}>;
export declare const createCompetition: (teamId: number, data: {
    name: string;
    type?: string;
    season?: string;
}) => Promise<{
    name: string;
    type: string | null;
    id: number;
    teamId: number;
    season: string | null;
}>;
export declare const updateCompetition: (id: number, teamId: number, data: {
    name?: string;
    type?: string;
    season?: string;
}) => Promise<{
    name: string;
    type: string | null;
    id: number;
    teamId: number;
    season: string | null;
}>;
export declare const deleteCompetition: (id: number, teamId: number) => Promise<{
    name: string;
    type: string | null;
    id: number;
    teamId: number;
    season: string | null;
}>;
