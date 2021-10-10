import fetch from 'node-fetch';

fetch("https://zenquotes.io/api/random")
    .then(res => res.json())
    // .then(res => JSON.parse(res))
    .then(data => console.log(data))
    .catch(e => console.error(e));