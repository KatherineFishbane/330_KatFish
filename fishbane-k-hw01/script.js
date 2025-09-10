
	import { generate } from './utils.js';  

	
	const words2 = [];
	
	const words3 = [];
    
    
    const randomElement = (array) => array[Math.floor(Math.random() * array.length)];



const init = () => {
    generate(1);
    document.querySelector("#my-Button").addEventListener('click', () => generate(1));
    document.querySelector("#five-Button").addEventListener('click', () => generate(5));
};

init();