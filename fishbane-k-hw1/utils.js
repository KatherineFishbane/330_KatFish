export { generate };

const generate = (num) => {
    let str = "";
    for (let i = 0; i < num; i++) {
        str += `${randomElement(words1)} ${randomElement(words2)} ${randomElement(words3)}<br>`;
    }
    document.querySelector("#output").innerHTML = str;
};

  const loadJsonXHR=()=>{
			const url = "./data/babble-data.json";
			const xhr = new XMLHttpRequest;

			 xhr.onload = (e) => {
				const text = e.target.responseText;
				let json;
				json = JSON.parse(text);
				const words1 = json.words1;
                const words2 = json.words2;
                const words3 = json.words3;
			 }

			 xhr.open("GET",url);
			 xhr.send();
			 
            

        }