export declare const createPlayer: (teamId: number, data: {
    firstName: string;
    lastName: string;
    capNumber?: number;
    position?: string;
}) => Promise<{
    name: string;
    id: number;
    teamId: number;
    firstName: string;
    lastName: string;
    birthday: Date | null;
    position: string | null;
    capNumber: number | null;
}>;
export declare const getPlayers: (teamId: number) => Promise<{
    name: string;
    id: number;
    teamId: number;
    firstName: string;
    lastName: string;
    birthday: Date | null;
    position: string | null;
    capNumber: number | null;
}[]>;
export declare const getPlayerById: (id: number, teamId: number) => Promise<{
    totals: {
        goals: number;
        shots: number;
        assists: number;
        steals: number;
        blocks: number;
        exclusions: number;
    };
    games: {
        gameId: number;
        date: Date;
        opponent: string;
        goals: number;
        shots: number;
        assists: number;
        steals: number;
        blocks: number;
        exclusions: number;
    }[];
    stats: ({
        game: {
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
        };
    } & {
        x: number | null;
        y: number | null;
        type: import(".prisma/client").$Enums.EventType;
        id: number;
        capNumber: number | null;
        period: number | null;
        timestamp: Date;
        context: import(".prisma/client").$Enums.GameSituation | null;
        shotOutcome: import(".prisma/client").$Enums.ShotOutcome | null;
        clock: number | null;
        goalX: number | null;
        goalY: number | null;
        playerId: number;
        gameId: number;
        assistEventId: number | null;
    })[];
    name: string;
    id: number;
    teamId: number;
    firstName: string;
    lastName: string;
    birthday: Date | null;
    position: string | null;
    capNumber: number | null;
}>;
export declare const updatePlayer: (id: number, teamId: number, data: {
    firstName?: string;
    lastName?: string;
    capNumber?: number | null;
    position?: string;
}) => Promise<{
    name: string;
    id: number;
    teamId: number;
    firstName: string;
    lastName: string;
    birthday: Date | null;
    position: string | null;
    capNumber: number | null;
}>;
export declare const deletePlayer: (id: number, teamId: number) => Promise<{
    name: string;
    id: number;
    teamId: number;
    firstName: string;
    lastName: string;
    birthday: Date | null;
    position: string | null;
    capNumber: number | null;
}>;
