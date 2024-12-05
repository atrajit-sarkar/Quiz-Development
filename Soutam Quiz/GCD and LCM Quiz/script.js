// Correct Answers Object.....................
const correctAnswers = {
    question1: "4", 
    question2: "3",
    question3: "3",
    question4: "2",
    question5: "2",
    question6: "3",
    question7: "4",
    question8: "3",
    question9: "2",
    question10: "4",
};

let interval; // Declare interval globally

function submitfunction() {
    timeInSeconds=-1;
    let timer=document.querySelector(".timer-container")
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
            questionResult.innerHTML = `<span style="color:red">❌ Wrong option for ${question}. Correct option is: ${correctAnswers[question]}</span>`;
            const selectedRadio = document.querySelector(`input[name="${question}"]:checked`);
            if (selectedRadio) {
                const parentDiv = selectedRadio.closest('div');
                parentDiv.style.backgroundColor = "rgb(249,130,130)";
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
let timeInSeconds = 900;

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

        if (timeInSeconds==-1) {
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
document.getElementById("submit").addEventListener("click", function() {
    submitfunction();
});
