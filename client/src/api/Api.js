import axios from 'axios';
const apiURL = 'http://localhost:3001';
class Api{

    get(path = "", option = null){
        const url = `${apiURL}/${path}`;
        return axios.get(url, option);
    }

    post(path ="", data = {}, option = {headers:{'Contend-Type': 'application/json','Access-Control-Allow-Origin': 'No' }}){
        const url = `${apiURL}/${path}`;
        return axios.post(url, data, option);
    }


    put(path ="", data = {}, option = {headers:{'Contend-Type': 'application/json','Access-Control-Allow-Origin': 'No' }}){
        const url = `${apiURL}/${path}`;
        return axios.put(url, data, option);
    }
}   

export default Api;