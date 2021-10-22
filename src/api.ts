import fetch from "node-fetch";

const get = async (param: string) => {
    return fetch(`https://api.brawlapi.com/v1/${param}`)
        .then(res => res.json())
        .catch(console.error);
}


export default get;