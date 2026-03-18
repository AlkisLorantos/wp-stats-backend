export declare const recordSubstitution: (teamId: number, data: {
    gameId: number;
    period: number;
    time: number;
    playerInId: number;
    playerOutId?: number;
}) => Promise<{
    id: number;
    time: number;
    teamId: number;
    period: number;
    gameId: number;
    playerInId: number;
    playerOutId: number;
}>;
export declare const getSubstitutionsForGame: (gameId: number, teamId: number) => Promise<({
    playerIn: {
        name: string;
        id: number;
        teamId: number;
        firstName: string;
        lastName: string;
        birthday: Date | null;
        position: string | null;
        capNumber: number | null;
    };
    playerOut: {
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
    time: number;
    teamId: number;
    period: number;
    gameId: number;
    playerInId: number;
    playerOutId: number;
})[]>;
export declare const calculatePlayingTime: (gameId: number, playerId: number) => Promise<number>;
