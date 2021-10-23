export declare module Records {

    export interface Icon {
        id: number;
    }

    export interface Player {
        tag: string;
        name: string;
        nameColor: string;
        icon: Icon;
    }

    export interface entry {
        brawler: number;
        best: number;
        achieved_at: Date;
        player: Player;
    }

    export interface RootObject {
        [key: number]: entry[];
    }

}