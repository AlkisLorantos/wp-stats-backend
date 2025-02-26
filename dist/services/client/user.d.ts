export declare const createUser: (username: string, password: string, role: string) => Promise<{
    id: number;
    username: string;
    password: string;
    role: string;
    createdAt: Date;
}>;
export declare const authenticateUser: (username: string, password: string) => Promise<{
    token: string;
    user: {
        id: number;
        username: string;
        password: string;
        role: string;
        createdAt: Date;
    };
}>;
