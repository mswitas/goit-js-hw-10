import SlimSelect from "slim-select";
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import { loadHandler } from "./js/loader-handler";
import { resize } from "./js/image-resize";

const selectElement = document.querySelector('.breed-select');
const catInfoElement = document.querySelector('.cat-info');



fetchBreeds()
    .then(response => {
        response.data.map(value => {
            selectElement.insertAdjacentHTML('beforeend', `<option value="${value.id}">${value.name}</option>`);
        });
        new SlimSelect({
            select: '#breed-select'
        });
        loadHandler('breeds', 'loaded');
     })
    .catch(error => { 
        console.log(error);
        loadHandler('breeds', 'error');
    });

selectElement.addEventListener('change', (event) => {
    loadHandler('cat', 'start');
    fetchCatByBreed(event.currentTarget.value)
    .then(response => {
            // console.log(response);
            const url = response.data[0].url;
            const imgW = Number(response.data[0].width);
            const imgH = Number(response.data[0].height);
            let newH = resize(imgW, imgH, 400);
            const catInfo = response.data[0].breeds[0];
            const html = `
                    <img src="${url}" width="400" height="${newH}">
                    <div>
                        <h2>${catInfo.name}</h2>
                        <p>${catInfo.description}</p>
                        <p><strong>Temperament: </strong>${catInfo.temperament}</p>
                    </div>
            `;
            catInfoElement.innerHTML = html;
            loadHandler('cat', 'loaded');
        })
        .catch(error => {
            console.log(error);
            loadHandler('cat', 'error');
        });
});