export declare const getTeamStats: (teamId: number) => Promise<{
    totals: {
        goals: number;
        assists: number;
        shots: number;
        steals: number;
        blocks: number;
        saves: number;
        exclusions: number;
        turnovers: number;
    };
    record: {
        wins: number;
        losses: number;
        draws: number;
        gamesPlayed: number;
        winPct: number;
        goalsFor: number;
        goalsAgainst: number;
        goalDiff: number;
    };
    averages: {
        goalsPerGame: string;
        shotsPerGame: string;
        shootingPct: number;
    };
    topScorers: {
        playerId: number;
        name: string;
        goals: number;
        assists: number;
        shots: number;
        steals: number;
        blocks: number;
        saves: number;
        exclusions: number;
        turnovers: number;
    }[];
    topAssisters: {
        playerId: number;
        name: string;
        goals: number;
        assists: number;
        shots: number;
        steals: number;
        blocks: number;
        saves: number;
        exclusions: number;
        turnovers: number;
    }[];
    topShooters: {
        shootingPct: number;
        playerId: number;
        name: string;
        goals: number;
        assists: number;
        shots: number;
        steals: number;
        blocks: number;
        saves: number;
        exclusions: number;
        turnovers: number;
    }[];
    allPlayers: {
        playerId: number;
        name: string;
        goals: number;
        assists: number;
        shots: number;
        steals: number;
        blocks: number;
        saves: number;
        exclusions: number;
        turnovers: number;
    }[];
}>;
