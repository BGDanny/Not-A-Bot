import fetch from "node-fetch";
import * as types from "./types/index"

export const getBrawler = async (): Promise<types.Brawler.RootObject | undefined> => {
    try {
        const res = await fetch(`https://api.brawlapi.com/v1/brawlers`);
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}

// export const getEvent = (): Promise<EventResponse | void> => {
//     return fetch(`https://api.brawlapi.com/v1/events`)
//         .then(res => res.json())
//         .catch(console.error);
// }