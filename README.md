# 04 Web APIs: Code Quiz

## Task

Build a timed coding quiz with multiple-choice questions. This web application should run in the browser and will feature dynamically updated HTML and CSS powered by JavaScript. It should also have a clean, polished, and responsive user interface.

## User Story

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

## Mock-Up

The following animation demonstrates the application functionality:

![A user clicks through an interactive coding quiz, then enters initials to save the high score before resetting and starting over.](./assets/img/04-web-apis-homework-demo.gif)

## Completed Work

URL of the deployed application:

https://japinell.github.io/KU-CBC-Homework-4-Code-Quiz/

URL of the GitHub repository:

https://github.com/japinell/KU-CBC-Homework-4-Code-Quiz

## How to Use the Application

The application starts with providing the user with the rules of the Coding Quiz Challenge on JavaScript Fundamentals.

Once ready to start the quiz, the user must click the "Start" button after which a Timer will start at 60 seconds and a series of N (=10) questions will be presented for the user to answer by selecting one choice of M (>=2 and <=4) possible answers, of which, only one answer is correct.

If the user selects the correct answer, a "Correct!" message is displayed under the block of answers; "Wrong!", otherwise. Counters for Correct Answers and Wrong Answers is kept. When a question is answered correctly, the user is rewarded with the addition of 5 seconds to the time remaining; likewise, when a question is answered incorrectly, the user is penalized with the substraction of 10 seconds to the time remaining.

The quiz ends when all the questions have been answered, or when the time remaining reaches 0 seconds. At this point, a screen summarizing the result of the quiz is presented to the user. The user must enter their name or initials and click the "Submit" button. The highest score is kept in localstorage. If the user scored higher than what's in localstorage, the score in the localstorage is replaced with this session's score; otherwise, the score in the localstorage remains.

Finally, the user is provided with an option to "Go Back" to the initial screen and possible start a new quiz session, or an option to "Clear Scores" to delete the highest score in localstorage.

The user can see or delete the highest score by clicking the "Highest Score" button in the initial screen.

Close the browser to leave the application.

![A user clicks through an interactive coding quiz, then enters initials to save the high score before resetting and starting over.] (https://drive.google.com/file/d/16OZmCGDjZyXUFF1P7_-h-6Cq4H4ojkAw/view?usp=sharing)

## Technologies Used to Complete the Task

The following technologies for web development were used to build the application:

### HTML (15%)

To build the general structure of the application

### CSS (20%)

To style the application

### JavaScript (65%)

This application uses an array of objects to store the questionaire, functions to render the questions depending on user input and on JavaScript Timing Events (setInterval and setTimeout), and helper functions to render the different HTML components, handle the user interaction, process the selection of answers, calculate the score, and save and retrieve to/from localstorage.
