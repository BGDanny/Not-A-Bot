export declare module Maps {

    export interface Environment {
        id: number;
        name: string;
        hash: string;
        path: string;
        version: number;
        imageUrl: string;
    }

    export interface GameMode {
        id: number;
        name: string;
        hash: string;
        version: number;
        color: string;
        link: string;
        imageUrl: string;
    }

    export interface List {
        id: number;
        new: boolean;
        disabled: boolean;
        name: string;
        hash: string;
        version: number;
        link: string;
        imageUrl: string;
        credit: string;
        environment: Environment;
        gameMode: GameMode;
        lastActive?: number;
        dataUpdated?: number;
    }

    export interface RootObject {
        list: List[];
    }

}

export declare module Map {

    export interface Environment {
        id: number;
        name: string;
        hash: string;
        path: string;
        version: number;
        imageUrl: string;
    }

    export interface GameMode {
        id: number;
        name: string;
        hash: string;
        version: number;
        color: string;
        link: string;
        imageUrl: string;
    }

    export interface Stat {
        brawler: number;
        winRate: number;
        useRate: number;
        starRate: number;
    }

    export interface Data {
        winRate: number;
        useRate: number;
        wins: number;
        losses: number;
        draws: number;
        total: number;
    }

    export interface TeamStat {
        name: string;
        hash: string;
        brawler1: number;
        brawler2: number;
        brawler3: number;
        data: Data;
    }

    export interface RootObject {
        id: number;
        new: boolean;
        disabled: boolean;
        name: string;
        hash: string;
        version: number;
        link: string;
        imageUrl: string;
        credit?: any;
        environment: Environment;
        gameMode: GameMode;
        lastActive: number;
        dataUpdated: number;
        stats: Stat[];
        teamStats: TeamStat[];
    }

}



