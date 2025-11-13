
// Event handler for clicks
const handleEvent = (event) => {
    if (event.target.classList.contains("answer")) {
        selectAnswer(event.target);
    }
    if (event.target.classList.contains("submit-button")) {
        submitAnswer(event.target);
    }
};
//user clicks on a option and enables the submit button
        const selectAnswer = (answerElement) =>{
            const questionId = answerElement.getAttribute("data-question");

            document.querySelectorAll(`[data-question='${questionId}']`).forEach((el) => {
                el.classList.remove("selected");
            });

            answerElement.classList.add("selected");

            const submitButton = document.querySelector(`#submit-${questionId}`);
            if (submitButton) {
                submitButton.disabled = false;
            }
        };

        //checks if an answer is correct and displays
        const submitAnswer = (button) => {
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
                console.log(`No answer selected for question ${questionId}`);
            }
        };

export {  handleEvent,selectAnswer, submitAnswer };