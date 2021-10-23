export declare module Events {

    export interface Slot {
        id: number;
        name: string;
        hash: string;
        listAlone: boolean;
        hideable: boolean;
        hideForSlot?: number;
        background?: any;
    }

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
        avgPosition: number;
        starRate?: number;
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

    export interface Map {
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
        lastActive: number;
        dataUpdated: number;
        stats: Stat[];
        teamStats: TeamStat[];
    }

    export interface Active {
        slot: Slot;
        startTime: Date;
        endTime: Date;
        reward: number;
        map: Map;
        modifier?: any;
    }

    export interface Slot2 {
        id: number;
        name: string;
        hash: string;
        listAlone: boolean;
        hideable: boolean;
        hideForSlot?: number;
        background?: any;
    }

    export interface Environment2 {
        id: number;
        name: string;
        hash: string;
        path: string;
        version: number;
        imageUrl: string;
    }

    export interface GameMode2 {
        id: number;
        name: string;
        hash: string;
        version: number;
        color: string;
        link: string;
        imageUrl: string;
    }

    export interface Stat2 {
        brawler: number;
        winRate: number;
        useRate: number;
        avgPosition: number;
        starRate?: number;
    }

    export interface Data2 {
        winRate: number;
        useRate: number;
        wins: number;
        losses: number;
        draws: number;
        total: number;
    }

    export interface TeamStat2 {
        name: string;
        hash: string;
        brawler1: number;
        brawler2: number;
        brawler3: number;
        data: Data2;
    }

    export interface Map2 {
        id: number;
        new: boolean;
        disabled: boolean;
        name: string;
        hash: string;
        version: number;
        link: string;
        imageUrl: string;
        credit: string;
        environment: Environment2;
        gameMode: GameMode2;
        lastActive: number;
        dataUpdated: number;
        stats: Stat2[];
        teamStats: TeamStat2[];
    }

    export interface Upcoming {
        slot: Slot2;
        startTime: Date;
        endTime: Date;
        reward: number;
        map: Map2;
        modifier?: any;
    }

    export interface RootObject {
        active: Active[];
        upcoming: Upcoming[];
    }

}

