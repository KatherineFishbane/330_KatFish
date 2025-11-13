import * as utils from "./utils"; 

//loads all the category options from the api
const loadCategories = () => {
    const url = "https://opentdb.com/api_category.php";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const categories = data.trivia_categories;
            const categorySelect = document.querySelector("#question-category");

            categories.forEach((category) => {
                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });


            loadSelections();
        })
        .catch((error) => {
            console.error("Error fetching categories:", error);
        });
};

//sets up the options in the dropdown menus
const loadSelections = () => {
    const count = localStorage.getItem("question-count");
    const category = localStorage.getItem("question-category");
    const difficulty = localStorage.getItem("question-difficulty");

    if (count) {
        document.querySelector("#question-count").value = count;
    }
    if (category) {
        document.querySelector("#question-category").value = category;
    }
    if (difficulty) {
        document.querySelector("#question-difficulty").value = difficulty;
    }
};
const getData = (url) => {
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;
    xhr.open("GET", url);
    xhr.send();
};

const dataLoaded = (e) => {
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);
    if (!obj.results || obj.results.length === 0) {
        return;
    }

    let results = obj.results;
    let bigString = "";

    for (let i = 0; i < results.length; i++) {
        let result = results[i];
        let question = result.question;
        let correctAnswer = result.correct_answer;
        let incorrectAnswers = result.incorrect_answers;

        let allAnswers = [correctAnswer, ...incorrectAnswers];
        allAnswers = allAnswers.sort(() => Math.random() - 0.5);

        let line = `<div class='result' id='question-${i}'>`;
        line += `<p><strong>Question:</strong> ${question}</p>`;
        line += "<p><strong>Answers:</strong></p><ul>";

        allAnswers.forEach((answer) => {
            const isCorrect = answer === correctAnswer;
            line += `<li class='answer' data-question='${i}' data-answer='${answer}' ${isCorrect ? `data-correct-answer='${answer}'` : ''}>${answer}</li>`;
        });

        line += "</ul>";
        line += `<button class='submit-button' id='submit-${i}' data-question='${i}' disabled>Submit</button>`;
        line += "</div>";

        bigString += line;
    };


    const statusElement = document.querySelector("#status");
    statusElement.innerHTML = bigString;


    statusElement.removeEventListener("click", utils.handleEvent);


    statusElement.addEventListener("click", utils.handleEvent);
};

const dataError = (e) => {
    console.log("An error occurred");
};

export { loadCategories, loadSelections, getData, dataLoaded };