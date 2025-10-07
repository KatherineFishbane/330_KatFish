// uiHandler.js (Handles UI updates)

/*
 * renderList takes an array of strings and converts them into an HTML list (also formatted as a string).
 * Parameter:
 * data - An array of strings containing the list of video game parodies to display.
 */
const renderList = (data) => {
    let listItems = data.map(data => `<li>${data}</li>`);
    listItems = listItems.join("");
    console.log( `<ul class = 'data-list'>${listItems}</ul>`);
    return `<ul class = 'data-list'>${listItems}</ul>`;
    
    // Use map() to transform each item into a list item string
    // Use join() to merge the array into a single string
    // Wrap all of it in a <ul> element that includes a class 
    //       attribute of "data-list" and return that whole string.
    
};

const populateDropdown = () => {
    const dropdown = document.querySelector('#category-select');
    const categories = [
        { id: 'rpgs', name: 'RPG Game Parodies' },
        { id: 'shooters', name: 'Shooter Game Parodies' },
        { id: 'puzzle', name: 'Puzzle Game Parodies' }
    ];

    dropdown.innerHTML = categories.map(category => `<option value="${category.id}">${category.name}</option>`).join('');
};

export {renderList, populateDropdown};