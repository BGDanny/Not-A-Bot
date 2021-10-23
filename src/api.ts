import fetch from "node-fetch";
import * as types from "./types/index"

export const getBrawlers = async (): Promise<types.Brawlers.RootObject | undefined> => {
    try {
        const res = await fetch(`https://api.brawlapi.com/v1/brawlers`);
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}

export const getBralwer = async (brawlerId: number): Promise<types.Brawlers.List | undefined> => {
    try {
        const res = await fetch(`https://api.brawlapi.com/v1/brawlers/${brawlerId}`);
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}

export const getMaps = async (): Promise<types.Maps.RootObject | undefined> => {
    try {
        const res = await fetch(`https://api.brawlapi.com/v1/maps`);
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}

export const getMap = async (mapId: number): Promise<types.Map.RootObject | undefined> => {
    try {
        const res = await fetch(`https://api.brawlapi.com/v1/maps/${mapId}`);
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}

