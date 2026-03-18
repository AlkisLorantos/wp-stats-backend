export declare const saveStartingLineup: ({ gameId, period, lineup, }: {
    gameId: number;
    period: number;
    lineup: {
        playerId: number;
    }[];
}) => Promise<import(".prisma/client").Prisma.BatchPayload>;
export declare const getStartingLineup: (gameId: number, period: number) => Promise<({
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
    period: number;
    playerId: number;
    gameId: number;
})[]>;
