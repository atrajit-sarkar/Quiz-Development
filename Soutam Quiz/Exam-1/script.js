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
    let timer = document.querySelector(".timer-container")
    timer.remove()

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

                score -= 0.25
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


// Set the starting time for the quiz (in seconds)
let timeInSeconds = 3600;

function startTimer() {
    const timerElement = document.getElementById('timer');
    loadTimer();

    // Start the timer and store the interval ID in 'interval'
    interval = setInterval(() => {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = timeInSeconds % 60;

        // Display the time
        timerElement.innerHTML = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Check if time is up
        if (timeInSeconds == 0) {
            clearInterval(interval); // Stop the timer when time is up
            let a = confirm("Time is up! Want to View Score?");
            if (a) {
                submitfunction();
            } else {
                window.location.href = 'https://gongobongofounder.github.io/endpageofthequiz/';
            }
        }

        if (timeInSeconds == -1) {
            clearInterval(interval)
        }

        // Decrease the time by 1 second
        timeInSeconds--;
        saveTimer(); // Save timer value every second
    }, 1000);
}

// Start the timer when the page loads
// window.onload = startTimer;

let TotalScore = document.querySelector(".span2");
TotalScore.innerHTML = `Full Marks=${(Object.keys(correctAnswers).length) * 2}`;

// Add event listener for the submit button
document.getElementById("submit").addEventListener("click", function () {
    submitfunction();
});





// Question Panel Development
const question_pannel = document.querySelector('.buttonLayout');
const questionDivs = document.querySelectorAll('.question-cont'); // Select all question divs

questionDivs.forEach((div, index) => {
    let isActiveReview = false; // Track if the question is marked for review
    let isRadioChecked = false; // Track if any radio button is selected

    // Create the review button container
    let reviewButtonContainer = document.createElement("div");
    reviewButtonContainer.classList.add("review-btn-cont");

    // Create the review button
    let reviewButton = document.createElement("button");
    reviewButton.setAttribute("class", "review-btn");
    reviewButton.innerHTML = `Mark As Review`; // Default text

    // Append review button to the review button container, and then append to the question div
    div.append(reviewButtonContainer);
    reviewButtonContainer.append(reviewButton);

    // Assign IDs to each question div
    div.id = (index + 1).toString();

    // Create question button
    let questionButton = document.createElement("div");
    questionButton.classList.add("question-button"); // Add a class for styling
    questionButton.innerHTML = `${index + 1}`; // Add anchor with link and text

    // Append question button to the question panel
    question_pannel.appendChild(questionButton);

    // Function to update question button classes
    const updateQuestionButtonClasses = () => {
        questionButton.classList.remove("answered", "review-active", "answered-and-reviewed");

        if (isRadioChecked && isActiveReview) {
            questionButton.classList.add("answered-and-reviewed");
        } else if (isRadioChecked) {
            questionButton.classList.add("answered");
        } else if (isActiveReview) {
            questionButton.classList.add("review-active");
        }
        saveExamState(); // Save state whenever indicators change
    };

    // Add click event to the review button
    reviewButton.addEventListener("click", () => {
        isActiveReview = !isActiveReview;

        // Change button text to "Remove Mark" if it's marked for review
        reviewButton.innerHTML = isActiveReview ? `Remove Mark` : `Mark As Review`;

        // Update question button classes
        updateQuestionButtonClasses();
    });

    // Add event listener to radio buttons in this question
    const radioInputs = div.nextElementSibling.querySelectorAll('input[type="radio"]');
    radioInputs.forEach((radio) => {
        let lastClickedRadio = null; // Track the last clicked radio button

        radio.addEventListener('click', () => {
            if (lastClickedRadio === radio) {
                // If clicking the same radio button again, uncheck it
                radio.checked = false;
                isRadioChecked = false;
                lastClickedRadio = null; // Reset the last clicked radio
            } else {
                // If clicking a new radio button, mark it and highlight the button
                lastClickedRadio = radio;
                isRadioChecked = true;
            }

            // Update question button classes
            updateQuestionButtonClasses();
        });
    });

    // Create the question button click functionality
    questionButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default anchor behavior (no page reload)

        // Find the corresponding question div based on the ID
        const targetQuestion = document.getElementById((index + 1).toString());

        // Scroll to the question
        targetQuestion.scrollIntoView({
            behavior: 'instant', // Smooth scrolling
            block: 'start',     // Align to the top of the viewport
        });

        // Highlight the active question by adding/removing classes
        questionDivs.forEach((qDiv) => qDiv.classList.remove('active')); // Remove 'active' class from all questions
        targetQuestion.classList.add('active'); // Add 'active' class to the clicked question

        // Optionally update button active state
        document.querySelectorAll('.question-button').forEach((btn) => btn.classList.remove('active'));
        questionButton.classList.add('active');
        saveExamState(); // Save state whenever indicators change
    });
});


// Go back Function....
function goBackToHash() {
    const recentHash = location.hash;
    if (recentHash) {
        location.hash = recentHash; // Navigates to the recent hash
    } else {
        alert("No recent target found!");
    }
}



// Disable reloads and dev tools
document.addEventListener("keydown", (event) => {
    const forbiddenKeys = [
        { key: "F5" },
        { ctrlKey: true, key: "r" },
        { ctrlKey: true, shiftKey: true, key: "I" },
        { ctrlKey: true, key: "U" },
        { ctrlKey: true, shiftKey: true, key: "C" },
    ];
    if (forbiddenKeys.some((k) => Object.keys(k).every((key) => k[key] === event[key]))) {
        event.preventDefault();
        alert("This action is disabled.");
    }
});

document.addEventListener("contextmenu", (e) => e.preventDefault());

window.addEventListener("beforeunload", function (event) {
    // Custom message (note: most browsers ignore the actual message text now)
    const message = "Are you sure you want to leave this page?";
    event.preventDefault(); // Some browsers require this for the dialog to appear
    event.returnValue = message; // Display the message in the dialog

    // Returning a value is necessary to trigger the confirmation
    return message;
});



// Save and reload data even after reloading the page

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

// Save answers when inputs change
const inputs = document.querySelectorAll("input[type='radio']");
inputs.forEach((input) => {
    input.addEventListener("change", saveAnswers);
});



// save all the states 

// Save and Load Exam State
function saveExamState() {
    const state = {
        buttonStates: {}, // To save button indicator states
        reviewStates: {}, // To save review button states
        scrollPosition: window.scrollY, // Save current scroll position
        activeQuestion: document.querySelector('.question-cont.active')?.id || null, // Active question ID
    };

    // Save button states (answered, review-active, etc.)
    document.querySelectorAll('.question-button').forEach((button) => {
        state.buttonStates[button.textContent] = {
            classes: Array.from(button.classList), // Save classes
        };
    });

    // Save review button states
    document.querySelectorAll('.review-btn').forEach((btn, index) => {
        state.reviewStates[`question${index + 1}`] = btn.textContent.includes('Remove Mark'); // Save review state
    });

    localStorage.setItem("examState", JSON.stringify(state));
}

function loadExamState() {
    const state = JSON.parse(localStorage.getItem("examState")) || {};

    // Restore button states
    if (state.buttonStates) {
        Object.entries(state.buttonStates).forEach(([buttonText, data]) => {
            const button = Array.from(document.querySelectorAll('.question-button'))
                .find((btn) => btn.textContent === buttonText);
            if (button) {
                button.className = ""; // Clear all classes
                data.classes.forEach((cls) => button.classList.add(cls)); // Restore saved classes
            }
        });
    }

    // Restore review button states
    if (state.reviewStates) {
        Object.entries(state.reviewStates).forEach(([questionId, isReviewed], index) => {
            const reviewBtn = document.querySelectorAll('.review-btn')[index];
            if (reviewBtn) {
                reviewBtn.textContent = isReviewed ? 'Remove Mark' : 'Mark As Review';
            }
        });
    }

    // Restore scroll position
    if (state.scrollPosition) {
        window.scrollTo(0, state.scrollPosition);
    }

    // Restore active question
    if (state.activeQuestion) {
        const activeQuestion = document.getElementById(state.activeQuestion);
        if (activeQuestion) {
            document.querySelectorAll('.question-cont').forEach((qDiv) => qDiv.classList.remove('active'));
            activeQuestion.classList.add('active');
        }
    }
}


// Save scroll position dynamically
window.addEventListener("scroll", saveExamState);

// Load exam state on page load
window.onload = function () {
    loadAnswers(); // Restore selected answers
    loadExamState(); // Restore other exam states
    startTimer(); // Start or restore the timer
};

// Save answers and state before unloading the page
window.addEventListener("beforeunload", () => {
    saveAnswers();
    saveTimer();
    saveExamState();
});

