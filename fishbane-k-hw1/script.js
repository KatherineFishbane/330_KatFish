import { generate, loadJsonXHR } from './utils.js';  



const init = () => {
    loadJsonXHR(); 
    document.querySelector("#my-Button").addEventListener('click', () => generate(1));
    document.querySelector("#five-Button").addEventListener('click', () => generate(5));
};

init();