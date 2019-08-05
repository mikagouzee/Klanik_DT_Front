import axios from 'axios';

export default() => {
    return axios.create({
        baseURL: 'https://klanikiat.ddns.net/ids/',
        json:true,
    })
}