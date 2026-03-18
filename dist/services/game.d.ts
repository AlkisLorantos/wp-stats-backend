export declare const createGame: ({ date, opponent, location, homeOrAway, teamId, competitionId, }: {
    date: Date;
    opponent: string;
    location?: string;
    homeOrAway: "home" | "away";
    teamId: number;
    competitionId?: number;
}) => Promise<{
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
}>;
export declare const getGames: (teamId: number) => Promise<({
    competition: {
        name: string;
        type: string | null;
        id: number;
        teamId: number;
        season: string | null;
    };
} & {
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
})[]>;
export declare const getGameById: (id: number, teamId: number) => Promise<{
    date: Date;
    location: string;
    status: import(".prisma/client").$Enums.GameStatus;
    id: number;
    team: {
        name: string;
    };
    competition: {
        name: string;
        type: string | null;
        id: number;
        teamId: number;
        season: string | null;
    };
    opponent: string;
    homeOrAway: string;
    period: number;
    teamScore: number;
    opponentScore: number;
}>;
export declare const updateGame: (id: number, teamId: number, data: {
    date?: string;
    opponent?: string;
    location?: string;
    homeOrAway?: "home" | "away";
    teamScore?: number;
    opponentScore?: number;
}) => Promise<{
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
}>;
export declare const deleteGame: (id: number, teamId: number) => Promise<{
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
}>;
export declare const startGame: (id: number, teamId: number) => Promise<{
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
}>;
export declare const endGame: (id: number, teamId: number) => Promise<{
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
}>;
