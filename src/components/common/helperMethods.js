import Vue from 'vue';

export default async function handleErrors(response, errorMessage) {
    if (response.data.non_field_errors && response.data.non_field_errors[0]) {
        Vue.$toast.error(response.data.non_field_errors[0]);
    } else if (response.data.expired_token_error) { //logout user when token is expired
        Vue.$toast.error(response.data.expired_token_error[0]);
        await store.dispatch("logoutUser");
        await router.push({path: 'login'})
    } else {
        Vue.$toast.error(errorMessage);
    }
}