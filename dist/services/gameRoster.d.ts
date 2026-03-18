export declare const assignRosterToGame: (teamId: number, gameId: number, roster: {
    playerId: number;
    capNumber?: number;
}[]) => Promise<import(".prisma/client").Prisma.BatchPayload>;
export declare const addPlayerToRoster: (teamId: number, gameId: number, playerId: number, capNumber: number) => Promise<{
    player: {
        name: string;
        id: number;
        teamId: number;
        firstName: string;
        lastName: string;
        birthday: Date | null;
        position: string | null;
        capNumber: number | null;
    };
} & {
    id: number;
    capNumber: number;
    playerId: number;
    gameId: number;
}>;
export declare const removePlayerFromRoster: (teamId: number, gameId: number, rosterId: number) => Promise<{
    id: number;
    capNumber: number;
    playerId: number;
    gameId: number;
}>;
export declare const getRosterForGame: (gameId: number, teamId: number) => Promise<({
    player: {
        name: string;
        id: number;
        teamId: number;
        firstName: string;
        lastName: string;
        birthday: Date | null;
        position: string | null;
        capNumber: number | null;
    };
} & {
    id: number;
    capNumber: number;
    playerId: number;
    gameId: number;
})[]>;
