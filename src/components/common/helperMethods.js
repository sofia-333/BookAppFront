import Vue from 'vue';
import store from "@/store";
import router from "@/router";
import axios from "axios";

export default async function handleErrors(response, errorMessage, getResponseFieldErrors = false) {
    if (response.data.non_field_errors && response.data.non_field_errors[0]) {
        Vue.$toast.error(response.data.non_field_errors[0]);
    } else if (response.data.expired_token_error) { //logout user when token is expired
        Vue.$toast.error(response.data.expired_token_error[0]);
        await store.dispatch("logoutUser");
        await router.push({path: 'login'})
    } else if (getResponseFieldErrors) {
        return response.data;
    } else {
        Vue.$toast.error(errorMessage);
    }
}

//helper to set bool success and response data to all axios requests
export async function handleRequest(type, url, data = null, headers) {
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