export declare const createRosterPreset: (teamId: number, name: string, roster: {
    playerId: number;
    capNumber: number;
}[]) => Promise<{
    name: string;
    id: number;
    teamId: number;
    createdAt: Date;
}>;
export declare const getRosterPresets: (teamId: number) => Promise<({
    players: ({
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
        presetId: number;
    })[];
} & {
    name: string;
    id: number;
    teamId: number;
    createdAt: Date;
})[]>;
export declare const getPresetById: (presetId: number, teamId: number) => Promise<{
    players: ({
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
        presetId: number;
    })[];
} & {
    name: string;
    id: number;
    teamId: number;
    createdAt: Date;
}>;
export declare const deleteRosterPreset: (presetId: number, teamId: number) => Promise<{
    name: string;
    id: number;
    teamId: number;
    createdAt: Date;
}>;
