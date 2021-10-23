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

export const getBrawler = async (brawlerId: number): Promise<types.Brawlers.List | undefined> => {
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
        const res = await fetch(`https://api.brawlapi.com/v1/maps/${mapId}/600+`);
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}

export const getRecords = async (): Promise<types.Records.RootObject | undefined> => {
    try {
        const res = await fetch(`https://api.brawlapi.com/v1/records`);
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}

export const getEvents = async (): Promise<types.Events.RootObject | undefined> => {
    try {
        const res = await fetch(`https://api.brawlapi.com/v1/events/600+`);
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}

