// dataFetcher.js (Handles fetching external data)

/*
 * fetchData retrieves data from a given JSON file and processes a specific category.
 * Parameters:
 * url - A string containing the file path of the JSON data source.
 * category - A string containing the specific category within the JSON to extract.
 * callback - A reference to the function to execute once data is retrieved.
 */
const fetchData = (url, category, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); // Opens a request to the given URL
    
    xhr.onload = (e) => {
        if (xhr.status === 200) { // Checks if the request was successful
            try {

                // Convert xhr.responseText into a JavaScript object and store it in responseData
                let responseData = e.target.responseText;
                responseData = JSON.parse(responseData);
                const data = responseData[category] || []; // Gets the selected category from the response
                callback(data); // Passes data to the callback function
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        } else {
            console.error('Failed to load data');
        }
    };
    
    xhr.onerror = () => console.error('XHR request error');
    xhr.send();
};

export {fetchData};

