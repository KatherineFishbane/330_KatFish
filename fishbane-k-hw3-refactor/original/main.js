        //onLoad activates search button and loads the categories and selections
        window.onload = () => {
            document.querySelector("#search").onclick = searchButtonClicked;
            loadCategories();
            loadSelections();  
        };

        //loads all the category options from the api
        function loadCategories() {
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
                    //console.error("Error fetching categories:", error);
                });
        }

        //sets up the options in the dropdown menus
        function loadSelections() {
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
        }

            //when search is clicked loads the questions and answers based on selectiosn
        function searchButtonClicked() {
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
            getData(url);
        }

        function getData(url) {
            let xhr = new XMLHttpRequest();
            xhr.onload = dataLoaded;
            xhr.onerror = dataError;
            xhr.open("GET", url);
            xhr.send();
        }

        //
        function dataLoaded(e) {
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
            }
        

            const statusElement = document.querySelector("#status");
            statusElement.innerHTML = bigString;
        
           
            statusElement.removeEventListener("click", handleEvent); 
        

            statusElement.addEventListener("click", handleEvent);
        }
        
        // Event handler for clicks
        function handleEvent(event) {
            if (event.target.classList.contains("answer")) {
                selectAnswer(event.target);
            }
            if (event.target.classList.contains("submit-button")) {
                submitAnswer(event.target);
            }
        }
        
        
        //user clicks on a option and enables the submit button
        function selectAnswer(answerElement) {
            const questionId = answerElement.getAttribute("data-question");

            document.querySelectorAll(`[data-question='${questionId}']`).forEach((el) => {
                el.classList.remove("selected");
            });

            answerElement.classList.add("selected");

            const submitButton = document.querySelector(`#submit-${questionId}`);
            if (submitButton) {
                submitButton.disabled = false;
            }
        }

        //checks if an answer is correct and displays
        function submitAnswer(button) {
            const questionId = button.getAttribute("data-question");
            const selectedAnswer = document.querySelector(
                `[data-question='${questionId}'].selected`
            );

            const correctAnswer = document.querySelector(
                `[data-question='${questionId}'][data-correct-answer]`
            );

            if (selectedAnswer) {
                const selectedAnswerText = selectedAnswer.getAttribute("data-answer");

                document.querySelectorAll(`[data-question='${questionId}']`).forEach((el) => {
                    el.classList.remove("correct", "incorrect");
                    if (el.getAttribute("data-answer") === correctAnswer.getAttribute("data-answer")) {
                        el.classList.add("correct");
                    } else if (el.classList.contains("selected") && el !== correctAnswer) {
                        el.classList.add("incorrect");
                    }
                });

            } else {
               // console.log(`No answer selected for question ${questionId}`);
            }
        }

        function dataError(e) {
            console.log("An error occurred");
        }

