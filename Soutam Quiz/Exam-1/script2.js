// Correct Answers Object.....................
const correctAnswers = {
    question1: "3",
    question2: "3",
    question3: "1",
    question4: "4",
    question5: "2",
    question6: "4",
    question7: "2",
    question8: "4",
    question9: "1",
    question10: "2",
    question11: "2",
    question12: "3",
    question13: "2",
    question14: "2",
    question15: "2",
    question16: "1",
    question17: "4",
    question18: "3",
    question19: "1",
    question20: "3",
    question21: "3",
    question22: "2",
    question23: "2",
    question24: "2",
    question25: "2",
    question26: "1",
    question27: "4",
    question28: "4",
    question29: "4",
    question30: "3",
    question31: "4",
    question32: "4",
    question33: "4",
    question34: "2",
    question35: "3",
    question36: "2",
    question37: "2",
    question38: "3",
    question39: "2",
    question40: "4",
    question41: "3",
    question42: "4",
    question43: "3",
    question44: "1",
    question45: "1",
    question46: "1",
    question47: "1",
    question48: "1",
    question49: "3",
    question50: "4",
    question51: "2",
    question52: "4",
    question53: "1",
    question54: "4",
    question55: "4",
    question56: "1",
    question57: "3",
    question58: "4",
    question59: "4",
    question60: "4",
    question61: "2",
    question62: "1",
    question63: "4",
    question64: "3",
    question65: "2",
    question66: "2",
    question67: "4",
    question68: "3",
    question69: "3",
    question70: "4",
    question71: "1",
    question72: "3",
    question73: "2",
    question74: "3",
    question75: "1",
    question76: "1",
    question77: "4",
    question78: "1",
    question79: "4",
    question80: "4",
};

let interval; // Declare interval globally

function submitfunction() {
    timeInSeconds = -1;
    saveAnswers(); // Save the answers
    saveExamState(); // Save the complete exam state
    let timer = document.querySelector(".timer-container");
    timer.remove();

    let score = 0;
    let container = document.querySelector(".container");
    let resultDiv = document.createElement("div");
    resultDiv.setAttribute("id", "result");
    let isResultDiv = document.querySelector("#result");

    if (!isResultDiv) {
        container.appendChild(resultDiv);
    }
    resultDiv.innerHTML = ""; // Clear previous results

    // Loop through each question and check the answers
    for (let question in correctAnswers) {
        let options = document.getElementsByName(question);
        let userAnswer = "";

        // Find selected option
        for (let option of options) {
            if (option.checked) {
                userAnswer = option.value;
                break;
            }
        }

        // Create a result message for each question
        let questionResult = document.createElement("div");
        if (userAnswer === correctAnswers[question]) {
            score += 2;
            questionResult.innerHTML = `<span style="color:green">✔️ Correct option for ${question}: ${correctAnswers[question]}</span>`;
            const selectedRadio = document.querySelector(`input[name="${question}"]:checked`);
            const parentDiv = selectedRadio.closest('div');
            parentDiv.style.backgroundColor = "rgb(82,247,121)";
        } else {
            if (userAnswer != "") {
                score -= 0.25;
                questionResult.innerHTML = `<span style="color:red">❌ Wrong option for ${question} and -0.25. Correct option is: ${correctAnswers[question]}</span>`;
                const selectedRadio = document.querySelector(`input[name="${question}"]:checked`);
                if (selectedRadio) {
                    const parentDiv = selectedRadio.closest('div');
                    parentDiv.style.backgroundColor = "rgb(249,130,130)";
                }
            } else {
                const notCheckedRadio = document.querySelector(`input[name="${question}"]:not(:checked)`);
                const parentDiv = notCheckedRadio.closest('div');
                parentDiv.style.backgroundColor = "rgb(127, 174, 241)";
                questionResult.innerHTML = `<span style="color:red"><img src="image.png" alt="" style="width: 50px; height: 50px;"> Unattempted ${question}. Correct option is: ${correctAnswers[question]}</span>`;
            }
        }

        resultDiv.appendChild(questionResult);
    }

    // Show total score at the end
    let scoreMessage = document.createElement("h2");
    scoreMessage.innerHTML = `<span style="color: grey">Your Score: ${score} / ${(Object.keys(correctAnswers).length) * 2}</span>`;
    resultDiv.appendChild(scoreMessage);
}

// Save and load timer
function saveTimer() {
    localStorage.setItem("timeRemaining", timeInSeconds);
}

function loadTimer() {
    const savedTime = localStorage.getItem("timeRemaining");
    if (savedTime) {
        timeInSeconds = parseInt(savedTime, 10);
    }
}

// Save and load answers
function saveAnswers() {
    const answers = {};
    const inputs = document.querySelectorAll("input[type='radio']");
    inputs.forEach((input) => {
        if (input.checked) {
            answers[input.name] = input.value;
        }
    });
    localStorage.setItem("savedAnswers", JSON.stringify(answers));
}

function loadAnswers() {
    const savedAnswers = JSON.parse(localStorage.getItem("savedAnswers")) || {};
    const inputs = document.querySelectorAll("input[type='radio']");
    inputs.forEach((input) => {
        if (savedAnswers[input.name] === input.value) {
            input.checked = true;
        }
    });
}

// Save and load exam state
function saveExamState() {
    const state = {
        buttonStates: {},
        reviewStates: {},
        scrollPosition: window.scrollY,
        activeQuestion: document.querySelector('.question-cont.active')?.id || null,
    };

    document.querySelectorAll('.question-button').forEach((button) => {
        state.buttonStates[button.textContent] = {
            classes: Array.from(button.classList),
        };
    });

    document.querySelectorAll('.review-btn').forEach((btn, index) => {
        state.reviewStates[`question${index + 1}`] = btn.textContent.includes('Remove Mark');
    });

    localStorage.setItem("examState", JSON.stringify(state));
}

function loadExamState() {
    const state = JSON.parse(localStorage.getItem("examState")) || {};

    if (state.buttonStates) {
        Object.entries(state.buttonStates).forEach(([buttonText, data]) => {
            const button = Array.from(document.querySelectorAll('.question-button'))
                .find((btn) => btn.textContent === buttonText);
            if (button) {
                button.className = ""; // Clear all classes
                data.classes.forEach((cls) => button.classList.add(cls));
            }
        });
    }

    if (state.reviewStates) {
        Object.entries(state.reviewStates).forEach(([questionId, isReviewed], index) => {
            const reviewBtn = document.querySelectorAll('.review-btn')[index];
            if (reviewBtn) {
                reviewBtn.textContent = isReviewed ? 'Remove Mark' : 'Mark As Review';
            }
        });
    }

    if (state.scrollPosition) {
        window.scrollTo(0, state.scrollPosition);
    }

    if (state.activeQuestion) {
        const activeQuestion = document.getElementById(state.activeQuestion);
        if (activeQuestion) {
            document.querySelectorAll('.question-cont').forEach((qDiv) => qDiv.classList.remove('active'));
            activeQuestion.classList.add('active');
        }
    }
}

// Set the starting time for the quiz (in seconds)
let timeInSeconds = 3600;

function startTimer() {
    const timerElement = document.getElementById('timer');
    loadTimer();

    interval = setInterval(() => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;

        timerElement.innerHTML = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeInSeconds === 0) {
            clearInterval(interval);
            let a = confirm("Time is up! Want to View Score?");

            if (a) {
                submitfunction();
            } else {
                window.location.href = 'https://gongobongofounder.github.io/endpageofthequiz/';
            }
        }

        if (timeInSeconds === -1) {
            clearInterval(interval);
        }

        timeInSeconds--;
        saveTimer();
    }, 1000);
}

// Start the timer and load state on page load
window.onload = function () {
    loadAnswers();
    loadExamState();
    startTimer();
};

// Save state before page unload
window.addEventListener("beforeunload", () => {
    saveAnswers();
    saveTimer();
    saveExamState();
});
