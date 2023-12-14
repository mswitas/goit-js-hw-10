import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";

const selectElement = document.querySelector('.breed-select');

fetchBreeds();

selectElement.addEventListener('change', (event) => {
    fetchCatByBreed(event.currentTarget.value);
});
