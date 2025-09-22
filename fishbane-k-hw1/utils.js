
let words1 = [], words2 = [], words3 = [];

const randomElement = (array) => array[Math.floor(Math.random() * array.length)];


  const loadJsonXHR=()=>{
			console.log("loadJsonXHR");
			const url = "./data/babble-data.json";
			const xhr = new XMLHttpRequest;

			  xhr.onload = (e) => {
				const text = e.target.responseText;
				let json;
				json = JSON.parse(text);
				 words1 = json.words1;
				 words2 = json.words2;
				 words3 = json.words3;
				console.log(words1, words2, words3);
				generate(1);
			 }
			 
			 xhr.open("GET",url);
			 xhr.send();
			 
            

        };

const generate = (num) => {
	console.log("generate");
    let str = "";
    for (let i = 0; i < num; i++) {
        str += `${randomElement(words1)} ${randomElement(words2)} ${randomElement(words3)}<br>`;
    }
    document.querySelector("#output").innerHTML = str;
	console.log(str);
};




export { generate, loadJsonXHR};