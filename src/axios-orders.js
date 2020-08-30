import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-e90db.firebaseio.com/'
});

export default instance;