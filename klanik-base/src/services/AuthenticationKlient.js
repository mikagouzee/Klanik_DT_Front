import axios from 'axios';

export default() => {
    return axios.create({
        baseURL: "https://klanikiat.ddns.net/ids/", // "https://localhost:44363",//'https://klanikiat.ddns.net/ids/',
        json:true,
    })
}