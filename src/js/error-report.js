import Notiflix from "notiflix";
import { Report } from 'notiflix/build/notiflix-report-aio';

export const errorReport = () => {
    Report.failure(
        'API Failure',
        'Oops! Something went wrong! Try reloading the page!',
        'Okay',
    );
}