import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-project-41cd9.firebaseio.com/'
});

export default instance;