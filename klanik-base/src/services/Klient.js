import axios from 'axios';

export default() => {
    return axios.create({
        baseURL: 'https://localhost:44356/api/',
        json:true,
        headers:{
            'X-Clacks-Overhead':'GNU Pratchett'
        }
    })
}