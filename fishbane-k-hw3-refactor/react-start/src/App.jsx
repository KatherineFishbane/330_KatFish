import "./styles.css";
import "bulma/css/bulma.min.css";
import { useState } from "react";

const App = () => {
  const [questionCount, setQuestionCount] = useState("5");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [statusMessage, setStatusMessage] = useState("Ready to Search!");

  const handleStartTrivia = () => {
    let url = `https://opentdb.com/api.php?amount=${questionCount}`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;
/*const loadCategories = () => {
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
};*/
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //I changed this part because I understand how map works now
        const formattedQuestions = data.results.map((question, index) => {
          const allAnswers = [question.correct_answer, ...question.incorrect_answers].sort(
            () => Math.random() - 0.5
          );
          //I'm not entirely sure about the return here
          return {
            ...question,
            allAnswers,
            userAnswer: "",
            id: index,
          };
        });
        //todo
        /*.catch((error) => {
            console.error("Error fetching categories:", error);
        });*/
        //also todo set categories
        // make wrong answer red and right green
        //fix the 12 errorssss


        setQuestions(formattedQuestions);
        setStatusMessage("");
      })
      
  };

  const handleAnswerSelect = (questionId, answer) => {
    setQuestions((prev) =>
      //maybe i dont know how map works
      prev.map((question) =>
        question.id === questionId ? { ...question, userAnswer: answer } : question
      )
    );
  };

  //this should stay the same right????
  const submitAnswer = (questionId) => {
      questionId = button.getAttribute("data-question");
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
                console.log(`No answer selected for question ${questionId}`);
            }

  
  };

  return (
    <section className="section">
      <div className="container">
        <header className="has-text-centered mb-5">
          <h1 className="title is-2 has-text-black">Trivia Time!</h1>
        </header>

        
        <div className="box">
        
          <div className="field">
            <label className="label" htmlFor="question-count">
              Number of Questions
            </label>
            <div className="control">
              <div className="select is-primary is-fullwidth">
                <select
                  id="question-count"
                  
                  value={questionCount}
                  onChange={(e) => setQuestionCount(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
            </div>
          </div>


          <div className="field">
            <label className="label" htmlFor="question-category">
              Category
            </label>
            <div className="control">
              <div className="select is-primary is-fullwidth">
                <select
                  id="question-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Any Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>


          <div className="field">
            <label className="label" htmlFor="question-difficulty">
              Difficulty
            </label>
            <div className="control">
              <div className="select is-primary is-fullwidth">
                <select
                  id="question-difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="">Any Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          </div>


          <div className="field has-text-centered mt-5">
            <button
              type="button"
              id="search"
              className="button is-warning is-medium"
              onClick={handleStartTrivia}
            >
              Start Trivia
            </button>
          </div>
        </div>


        {statusMessage && (
          <div id="status" className="notification is-info has-text-centered mt-5">
            {statusMessage}
          </div>
        )}


        {questions.map((question) => (
          <div key={question.id} className="box mt-5">
            <h2 className="subtitle">{question.question}</h2>
            <div className="buttons">
              {question.allAnswers.map((ans, idx) => (
                <button
                  key={idx}
                  className={`button is-light ${
                    question.userAnswer === ans ? "is-link" : ""
                  }`}
                  onClick={() => handleAnswerSelect(question.id, ans)}
                >
                  {ans}
                </button>
              ))}
            </div>
            <div className="field mt-3">
              <button
                className="button is-success"
                onClick={() => submitAnswer(question.id)}
                disabled={!question.userAnswer}
              >
                Submit Answer
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default App;
