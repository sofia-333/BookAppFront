import axios from "axios";

const mainService = {
    getData() {
        axios.get(MAIN_URL + '/get-data/')
            .then(response => (this.info = response))
    }
}