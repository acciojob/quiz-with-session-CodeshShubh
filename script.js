// importent write code again

// Questions array
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Retrieve user's saved progress from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem('progress')) || [];

// Display the quiz questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ''; // Clear previous questions

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // If the answer is saved in sessionStorage, mark it as checked
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

// Function to save user's answers to sessionStorage
function saveProgress() {
  const answers = [];
  const inputs = document.querySelectorAll("input[type='radio']:checked");

  inputs.forEach((input) => {
    const questionIndex = parseInt(input.name.split('-')[1]);
    answers[questionIndex] = input.value;
  });

  // Save the progress in sessionStorage
  sessionStorage.setItem('progress', JSON.stringify(answers));
  userAnswers = answers; // Update the userAnswers variable
}

// Function to calculate and display the score
function calculateScore() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display the score on the page
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}`;

  // Save the score in localStorage
  localStorage.setItem('score', score);
}

// Render the questions and restore the user's progress
renderQuestions();

// Event listener for submit button
document.getElementById("submit").addEventListener('click', function() {
  calculateScore();
});

// Save progress on any change (selecting a radio button)
document.getElementById("questions").addEventListener('change', saveProgress);

// Load the saved score from localStorage when the page is reloaded
window.addEventListener('load', function() {
  const savedScore = localStorage.getItem('score');
  if (savedScore) {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
  }
});
