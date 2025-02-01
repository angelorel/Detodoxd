document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    // Cargar las preguntas desde el archivo JSON
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            displayQuiz(data);
        });

    function displayQuiz(questions) {
        let output = '';

        questions.forEach((question, index) => {
            output += `<div class="question">${index + 1}. ${question.question}</div>`;
            question.answers.forEach(answer => {
                output += `
                    <label>
                        <input type="radio" name="question${index}" value="${answer.correct}">
                        ${answer.text}
                    </label><br>
                `;
            });
        });

        quizContainer.innerHTML = output;
    }

    submitButton.addEventListener('click', function() {
        const answerContainers = quizContainer.querySelectorAll('.question');
        let numCorrect = 0;

        answerContainers.forEach((question, index) => {
            const selector = `input[name="question${index}"]:checked`;
            const userAnswer = (quizContainer.querySelector(selector) || {}).value;

            if (userAnswer === 'true') {
                numCorrect++;
            }
        });

        resultsContainer.innerHTML = `Obtuviste ${numCorrect} de ${answerContainers.length} respuestas correctas.`;
    });
});

