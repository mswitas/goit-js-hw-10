import axios from "axios";
import { loadHandler } from "./loader-handler";
import { resize } from "./image-resize";
import SlimSelect from "slim-select";

axios.defaults.headers.common["x-api-key"] = "live_xuMGwZmv9jJ9sWGgnHTOnu4P9ib7UDdnF9qKndGdQABfxPlnMl0FYNR2RcVtjr6D";

export function fetchBreeds() {
    const selectElement = document.querySelector('.breed-select');
    axios.get('https://api.thecatapi.com/v1/breeds')
        .then((response) => {
            response.data.map((value) => {
                // console.log(`ID: ${value.id} name: ${value.name}`);
                selectElement.insertAdjacentHTML('beforeend', `<option value="${value.id}">${value.name}</option>`);
            });
            new SlimSelect({
                select: '#breed-select'
            });
            loadHandler('breeds', 'loaded');

        })
        .catch((error) => {
            console.log(error);
           loadHandler('breeds', 'error');
        });
}

export function fetchCatByBreed(breedId) {
    loadHandler('cat', 'start');
    const catInfoElement = document.querySelector('.cat-info');
    axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then((response) => {
            console.log(response);
            loadHandler('cat', 'loaded');
            response.data.map((value) => {
                const url = value.url;
                const imgW = Number(value.width);
                const imgH = Number(value.height);
                let newH = resize(imgW, imgH, 400);
                const catArr = value.breeds;
                const catInfo = catArr[0];
                const html = `
                        <img src="${url}" width="400" height="${newH}">
                        <div>
                            <h2>${catInfo.name}</h2>
                            <p>${catInfo.description}</p>
                            <p><strong>Temperament: </strong>${catInfo.temperament}</p>
                        </div>
                    `;
                catInfoElement.innerHTML = html;
            });
            
        })
        .catch((error) => {
            console.log(error);
            loadHandler('cat', 'error');
        });
        
}
