import {MAIN_URL} from "@/assets/js/consts";
import store from '../../store/index'
import {handleRequest} from "@/components/common/helperMethods";

const mainService = {
    createUser(data) {
        return handleRequest('post', MAIN_URL + 'register/', data);
    },
    getUser(data) {
        return handleRequest('get', MAIN_URL + 'user/', data, authHeader());
    },
    getToken(data) {
        return handleRequest('post', MAIN_URL + 'create-token/', data);
    },
    getBookData(isbn) {
        return handleRequest('get', MAIN_URL + `book/${isbn}`, null, authHeader());
    },
}


function authHeader() {
    if (store.state.auth.token) {
        return {Authorization: 'Token ' + store.state.auth.token};
    } else {
        return {};
    }
}

export default mainService;