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
};

let interval; // Declare interval globally

function submitfunction() {
    timeInSeconds = -1;
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
    }, 1000);
}

// Start the timer when the page loads
window.onload = startTimer;

let TotalScore = document.querySelector(".span2");
TotalScore.innerHTML = `Full Marks=${(Object.keys(correctAnswers).length) * 2}`;

// Add event listener for the submit button
document.getElementById("submit").addEventListener("click", function () {
    submitfunction();
});





// Question Pannel Development...........
const question_pannel = document.querySelector('.question-panel');
const questionDivs = document.querySelectorAll('.question-cont'); // Select all question divs

questionDivs.forEach((div, index) => {
    let isActiveReview = false; // Track if the question is marked for review
    let isRadioChecked = false;

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

    // Add click event to the review button
    reviewButton.addEventListener("click", () => {
        isActiveReview = !isActiveReview;

        // Change button text to "Remove Mark" if it's marked for review
        if (isActiveReview) {
            reviewButton.innerHTML = `Remove Mark`; // Change button text
            questionButton.classList.add("review-active"); // Make the question button purple
            questionButton.classList.remove("answered")
        } else {
            reviewButton.innerHTML = `Mark As Review`; // Reset button text
            questionButton.classList.remove("review-active"); // Revert question button color
            if (isRadioChecked) {
                questionButton.classList.add("answered")
            }

        }
    });

    // Add event listener to radio buttons in this question
    const radioInputs = div.nextElementSibling.querySelectorAll('input[type="radio"]');
    radioInputs.forEach((radio) => {
        let lastClickedRadio = null; // Track the last clicked radio button


        radio.addEventListener('change', () => {
            // If a radio button is selected, change the button color
            questionButton.classList.add("answered"); // Add an "answered" class to the button
        });

        radio.addEventListener('click', (event) => {
            if (lastClickedRadio === radio) {
                // If clicking the same radio button again, uncheck it
                radio.checked = false;
                isRadioChecked = false;
                lastClickedRadio = null; // Reset the last clicked radio
                questionButton.classList.remove("answered"); // Remove the answered class
            } else {
                // If clicking a new radio button, mark it and highlight the button
                lastClickedRadio = radio;
                isRadioChecked = true;
                questionButton.classList.add("answered"); // Add the answered class
            }

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

        // Optional: Highlight the active question by adding/removing classes
        questionDivs.forEach((qDiv) => qDiv.classList.remove('active')); // Remove 'active' class from all questions
        targetQuestion.classList.add('active'); // Add 'active' class to the clicked question

        // Optionally update button active state
        document.querySelectorAll('.question-button').forEach((btn) => btn.classList.remove('active'));
        questionButton.classList.add('active');
    });
});


