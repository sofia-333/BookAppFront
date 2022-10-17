import Vue from 'vue';

export default function displayErrors(response, errorMessage) {
    if (response.data.non_field_errors && response.data.non_field_errors[0]) {
        Vue.$toast.error(response.data.non_field_errors[0]);
    } else {
        Vue.$toast.error(errorMessage);
    }
}