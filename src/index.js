import fetch from 'node-fetch';
import dotenv from "dotenv";

dotenv.config();

fetch("https://zenquotes.io/api/random")
    .then(res => res.json())
    // .then(res => JSON.parse(res))
    .then(data => console.log(data))
    .catch(e => console.error(e));
console.log(process.env['TOKEN']);