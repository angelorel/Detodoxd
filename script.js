document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.getElementById('quiz');
    const questionContainer = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const nextButton = document.getElementById('next-btn');
    const resultsContainer = document.getElementById('results');

    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];

    // Cargar las preguntas desde el archivo JSON
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            showQuestion();
        });

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;
        answersContainer.innerHTML = '';

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer.text;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => selectAnswer(answer.correct));
            answersContainer.appendChild(button);
        });

        nextButton.style.display = 'none';
    }

    function selectAnswer(isCorrect) {
        if (isCorrect) {
            score++;
        }

        // Deshabilitar todos los botones después de seleccionar una respuesta
        const buttons = answersContainer.querySelectorAll('.answer-btn');
        buttons.forEach(button => {
            button.disabled = true;
            if (button.textContent === questions[currentQuestionIndex].answers.find(a => a.correct).text) {
                button.style.backgroundColor = '#4CAF50'; // Verde para la respuesta correcta
            } else {
                button.style.backgroundColor = '#FF5252'; // Rojo para respuestas incorrectas
            }
        });

        nextButton.style.display = 'block';
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    });

    function showResults() {
        quizContainer.style.display = 'none';
        resultsContainer.textContent = `Obtuviste ${score} de ${questions.length} respuestas correctas.`;
    }
});
