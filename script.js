const staticQuestions = [
    {
        question: '¿Cuál es la capital de Italia?',
        options: ['Madrid', 'París', 'Roma', 'Berlín']
    },
    {
        question: 'Resuelve: (15 * 4) + 10',
        options: ['55', '60', '65', '70']
    },
    {
        question: '¿Cuál es el símbolo químico del oxígeno?',
        options: ['O', 'Ox', 'Oz', 'O2']
    },
    {
        question: '¿En qué año se fundó la Organización de las Naciones Unidas (ONU)?',
        options: ['1942', '1945', '1950', '1960']
    },
    {
        question: 'Nombra a los tres primeros presidentes de Estados Unidos.',
        options: ['George Washington, John Adams, Thomas Jefferson', 'John Adams, Thomas Jefferson, James Madison', 'Thomas Jefferson, James Madison, James Monroe', 'James Madison, James Monroe, John Quincy Adams']
    }
];

function startCountDown() {
    finishTime = setTimeout(completedTime, 20000);
    intervalTime = setInterval(ticTac, 1000);

    document.getElementById("countDown").textContent = 20;
    insertQuiz();
}

function ticTac() {
    let times = document.getElementById("countDown").textContent;

    document.getElementById("countDown").textContent = times - 1;
}

function completedTime() {
    clearInterval(intervalTime);
    document.getElementById("countDown").textContent = 0;
    document.getElementById("audioFinal").play();
    alert("GEAME OVER: Se acabó el tiempo. Intenta nuevamente");
}

function insertQuiz() {
    const questionsContainer = document.getElementById("questionsContainer");

    staticQuestions.forEach((question, index) => {
        const questionHTML = `
        <div class="card mb-3">
    <div class="card-body">
       <p class="card-text">${index + 1}. ${question.question}</p>
       <select class="form-control" id="rpta${index + 1}">
          ${question.options.map((option, i) => `<option value="${option.toLowerCase()}">${option}</option>`).join('')}
       </select>
    </div>
 </div>
`;
        questionsContainer.innerHTML += questionHTML;
    });
}


function finish() {
    clearTimeout(completedTime);
    clearInterval(intervalTime);

    let fecha = new Date();
    let score = 0;

    staticQuestions.forEach((question, index) => {
        const respuesta = document.getElementById(`rpta${index + 1}`).value.toLowerCase();

        // Utilizamos la función isCorrectAnswer para verificar si la respuesta es correcta
        if (isCorrectAnswer(index + 1, respuesta)) {
            score++;
            document.getElementById(`rpta${index + 1}`).style.color = 'green';
        } else {
            document.getElementById(`rpta${index + 1}`).style.color = 'red';
        }
    });

    let mensaje = fecha.toLocaleDateString("es-Es") + "\nTu puntaje es: " + score + "\n";

    staticQuestions.forEach((question, index) => {
        const respuesta = document.getElementById(`rpta${index + 1}`).value;
        mensaje += `${index + 1}. ${question.question}: ${respuesta}\n`;
    });

    alert(mensaje);

    // Detener la reproducción del sonido si está en curso
    document.getElementById("audioFinal").pause();
    const scoreMessage = document.getElementById("scoreMessage");
    scoreMessage.innerHTML = `<strong>Tu puntaje es: ${score}</strong>`;
    scoreMessage.style.display = "block";
}


function validateAnswers() {
    let allQuestionsAnswered = true;

    staticQuestions.forEach((question, index) => {
        const respuesta = document.getElementById(`rpta${index + 1}`).value;
        if (!respuesta) {
            allQuestionsAnswered = false;
        }
    });

    return allQuestionsAnswered;
}


function tryAgain() {
    location.reload();
}

function calculateScore() {
    let index = 1; // Comenzamos con la primera pregunta
    let selectedOption;
    let score = 0;

    // Iteramos sobre las respuestas mientras haya preguntas disponibles
    while (document.getElementById(`rpta${index}`)) {
        // Obtenemos el valor de la opción seleccionada
        selectedOption = document.getElementById(`rpta${index}`).value.toLowerCase();

        // Verificamos si la opción seleccionada es la respuesta correcta (puedes ajustar la lógica según tus necesidades)
        if (isCorrectAnswer(index, selectedOption)) {
            score++;
        }

        index++;
    }

    return score;
}

function isCorrectAnswer(questionIndex, selectedOption) {
    // Lógica para determinar si la opción seleccionada es la respuesta correcta para la pregunta dada
    const correctAnswers = [
        null, // La pregunta 0 no existe
        'roma', // Respuesta correcta para la pregunta 1
        '70',   // Respuesta correcta para la pregunta 2
        'o',    // Respuesta correcta para la pregunta 3
        '1945', // Respuesta correcta para la pregunta 4
        'george washington, john adams, thomas jefferson' // Respuesta correcta para la pregunta 5
    ];

    return selectedOption === correctAnswers[questionIndex];
}