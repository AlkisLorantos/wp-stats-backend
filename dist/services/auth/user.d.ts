export declare const createTeamAndCoach: (username: string, password: string, teamName: string) => Promise<{
    token: string;
    apiKey: string;
    user: {
        id: number;
        username: string;
        role: string;
    };
    team: {
        id: number;
        name: string;
    };
}>;
export declare const authenticateUser: (username: string, password: string) => Promise<{
    token: string;
    apiKey: string;
    user: {
        id: number;
        username: string;
        role: string;
    };
    team: {
        id: number;
        name: string;
    };
}>;
export declare const getUserInfo: (userId: number, teamId: number) => Promise<{
    id: number;
    username: string;
    apiKey: string;
    team: {
        name: string;
        id: number;
    };
}>;
export declare const updateTeamName: (teamId: number, name: string) => Promise<{
    name: string;
    id: number;
}>;
export declare const regenerateApiKey: (userId: number, teamId: number) => Promise<string>;
export declare const deleteUser: (userId: number, teamId: number) => Promise<void>;
