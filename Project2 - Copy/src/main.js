        import * as utils from "./utils.js"; 
        import * as loader from "./loader.js";
        //onLoad activates search button and loads the categories and selections
        window.onload = () => {
            document.querySelector("#search").onclick = searchButtonClicked;
            loader.loadCategories();
            loader.loadSelections();  
        };

        

            //when search is clicked loads the questions and answers based on selectiosn
        const searchButtonClicked = () =>{
            const questionCount = document.querySelector("#question-count").value;
            const category = document.querySelector("#question-category").value;
            const difficulty = document.querySelector("#question-difficulty").value;


            localStorage.setItem("question-count", questionCount);
            localStorage.setItem("question-category", category);
            localStorage.setItem("question-difficulty", difficulty);

            let url = `https://opentdb.com/api.php?amount=${questionCount}`;
            if (category) {
                url += `&category=${category}`;
            }
            if (difficulty) {
                url += `&difficulty=${difficulty}`;
            }
            //console.log(`URL: ${url}`);
            loader.getData(url);
        }

        
        
        
        
      

