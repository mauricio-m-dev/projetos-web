import questions from "./questions.js";

const questionEl = document.querySelector(".question");
const answersEl = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const container = document.querySelector(".container");
const containerFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

let currentIndex = 0;
let questionCorrect = 0;

btnRestart.onclick = () => {
    container.style.display = "flex";
    containerFinish.style.display = "none";
    currentIndex = 0;
    questionCorrect = 0;
    loadQuestion();
};

function nextQuestion(e) {
    if (e.target.getAttribute("data-correct") === "true") {
        questionCorrect++;
    }

    if (currentIndex < questions.length - 1) {
        currentIndex++;
        loadQuestion();
    } else {
        finish();
    }
}

function finish() {
    textFinish.innerHTML = `Você acertou ${questionCorrect} de ${questions.length}`;
    container.style.display = "none";
    containerFinish.style.display = "flex";
}

function loadQuestion() {
    const item = questions[currentIndex];

    spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
    questionEl.innerHTML = item.question;

    // limpa respostas anteriores
    answersEl.innerHTML = "";

    item.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.classList.add("answer-btn");
        button.innerText = answer.option;
        button.setAttribute("data-correct", answer.correct);

        button.addEventListener("click", nextQuestion);
        answersEl.appendChild(button);
    });
}

// inicializa o quiz
loadQuestion();
