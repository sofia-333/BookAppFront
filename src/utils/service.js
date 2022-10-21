import {MAIN_URL} from "@/utils/consts";
import {handleRequest} from "@/utils/helperMethods";

const mainService = {
    createUser(data) {
        return handleRequest('post', MAIN_URL + 'register/', data);
    },
    getUser(data) {
        return handleRequest('get', MAIN_URL + 'user/', data, authHeader());
    },
    logout() {
        return handleRequest('post', MAIN_URL + 'logout/', {}, authHeader());
    },
    getToken(data) {
        return handleRequest('post', MAIN_URL + 'create-token/', data);
    },
    getBookData(isbn) {
        return handleRequest('get', MAIN_URL + `book/${isbn}`, null, authHeader());
    },
    sendForgotPasswordEmail(data) {
        return handleRequest('post', MAIN_URL + 'forgot-password/', data);
    },
    resetPassword(data, pk, token) {
        return handleRequest('patch', MAIN_URL + `reset-password/${pk}/${token}/`, data);
    }
}


function authHeader() {
    if (localStorage.token) {
        return {Authorization: 'Token ' + localStorage.token};
    } else {
        return {};
    }
}

export default mainService;