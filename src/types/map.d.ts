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

