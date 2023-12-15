import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_xuMGwZmv9jJ9sWGgnHTOnu4P9ib7UDdnF9qKndGdQABfxPlnMl0FYNR2RcVtjr6D";

export const fetchBreeds = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://api.thecatapi.com/v1/breeds')
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export const fetchCatByBreed = breedId => {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}

