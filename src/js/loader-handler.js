import { errorReport } from "./error-report";

export function loadHandler(type, status) {
    const selectElement = document.querySelector('.select-wrapper');
    const loaderElement = document.querySelector('.loader');
    const errorElement = document.querySelector('.error');
    const catInfoElement = document.querySelector('.cat-info');
    
    if (type === 'breeds') {
        switch (status) {
            case 'loaded':
                loaderElement.classList.add('visually-hidden');
                selectElement.classList.remove('visually-hidden');
                break;
            case 'error':
                loaderElement.classList.add('visually-hidden');
                // errorElement.classList.remove('visually-hidden');
                errorReport();
                break;
            default:
                console.log('error - wrong status in loadHandler');
        }
    } else if (type === 'cat') {
        switch (status) {
            case 'start':
                catInfoElement.classList.add('visually-hidden');
                loaderElement.classList.remove('visually-hidden');
                break;
            case 'loaded':
                catInfoElement.classList.remove('visually-hidden');
                loaderElement.classList.add('visually-hidden');
                break;
            case 'error':
                selectElement.classList.add('visually-hidden');
                loaderElement.classList.add('visually-hidden');
                catInfoElement.classList.add('visually-hidden');
                // errorElement.classList.remove('visually-hidden');
                errorReport();
                break;
            default:
                console.log('error - wrong status in loadHandler');
        }
    } else {
        console.log('Wrong type in loadHandler');
    }

}
