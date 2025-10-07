import { fetchData } from "./dataFetcher.js";
import { renderList, populateDropdown } from "./uiHandler.js";
populateDropdown();

document.querySelector('#build-button').addEventListener('click', () => {
    const selectedCategory = document.querySelector('#category-select').value;
    


    document.querySelector('#data-list').innerHTML = fetchData('./data/parodyData.json', selectedCategory,  (dataNames) => {
    const dataListConstainer = document.querySelector('#data-list');
    dataListConstainer.innerHTML = renderList(dataNames)});

    // });
    // for the selectedCategory. Then, in the callback function, use renderList 
    // to display the data in #data-list div.  See example usage in practical 
    // instructions.
});
