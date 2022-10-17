import axios from "axios";
import {MAIN_URL} from "@/assets/js/consts";
import store from '../../store/index'

const mainService = {
    createUser(data) {
        return handleRequest('post', MAIN_URL + 'register/', data);
    },
    getUser(data) {
        return handleRequest('get', MAIN_URL + 'user/', data, authHeader());
    },
    getToken(data) {
        return handleRequest('post', MAIN_URL + 'api-token-auth/', data);
    },
    getBookData(isbn) {
        return handleRequest('get', MAIN_URL + `book/${isbn}`, authHeader());
    },
}

async function handleRequest(type, url, data = null, headers) {
    let response = {}
    try {
        switch (type) {
            case 'get':
                response = await axios.get(url, {headers: headers});
                break;
            case 'post':
                response = await axios.post(url, data, {headers: headers});
                break;
            case 'put':
                response = await axios.put(url, data, {headers: headers});
                break;
            default:
                response = await axios.delete(url, {headers: headers});
        }
        response.success = true;
    } catch (error) {
        response = error.response;
        response.success = false;
    }
    return response;
}

function authHeader() {
    if (store.state.auth.token) {
        return {Authorization: 'Token ' + store.state.auth.token};
    } else {
        return {};
    }
}

export default mainService;