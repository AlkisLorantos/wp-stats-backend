import { Prisma } from "@prisma/client";
export declare const createGame: (data: Prisma.GameCreateInput) => Promise<{
    date: Date;
    id: number;
    leagueId: number;
    homeTeamId: number;
    awayTeamId: number;
    homeTeamScore: number;
    awayTeamScore: number;
}>;
export declare const getGame: (id: number) => Promise<{
    date: Date;
    id: number;
    leagueId: number;
    homeTeamId: number;
    awayTeamId: number;
    homeTeamScore: number;
    awayTeamScore: number;
} | {
    date: Date;
    id: number;
    leagueId: number;
    homeTeamId: number;
    awayTeamId: number;
    homeTeamScore: number;
    awayTeamScore: number;
}[]>;
export declare const updateGame: (id: number, data: Prisma.GameUpdateInput) => Promise<{
    date: Date;
    id: number;
    leagueId: number;
    homeTeamId: number;
    awayTeamId: number;
    homeTeamScore: number;
    awayTeamScore: number;
}>;
export declare const removeGame: (id: number) => Promise<{
    date: Date;
    id: number;
    leagueId: number;
    homeTeamId: number;
    awayTeamId: number;
    homeTeamScore: number;
    awayTeamScore: number;
}>;
export declare const createGameStat: (data: Prisma.GameStatCreateInput) => Promise<{
    id: number;
    playerId: number;
    gameId: number;
    shotsMissed: number;
    shotsScored: number;
    assists: number;
    exclusions: number;
    turnovers: number;
}>;
export declare const getGameStat: (id: number) => Promise<{
    id: number;
    playerId: number;
    gameId: number;
    shotsMissed: number;
    shotsScored: number;
    assists: number;
    exclusions: number;
    turnovers: number;
} | {
    id: number;
    playerId: number;
    gameId: number;
    shotsMissed: number;
    shotsScored: number;
    assists: number;
    exclusions: number;
    turnovers: number;
}[]>;
export declare const updateGameStats: (id: number, data: Prisma.GameStatUpdateInput) => Promise<{
    id: number;
    playerId: number;
    gameId: number;
    shotsMissed: number;
    shotsScored: number;
    assists: number;
    exclusions: number;
    turnovers: number;
}>;
export declare const removeGameStats: (id: number) => Promise<{
    id: number;
    playerId: number;
    gameId: number;
    shotsMissed: number;
    shotsScored: number;
    assists: number;
    exclusions: number;
    turnovers: number;
}>;
