var startBtn = document.querySelector('.btn_start');
var nextBtn = document.querySelector('.btn_next');
var buttons = document.querySelector('.buttons');
var quiz = document.querySelector('.questions');
var quizElement = document.querySelector('.question');
var currentQuizIndex;
var shuffleQuiz;

startBtn.addEventListener('click', startGame);

//Start of the Quiz

function startGame() {
    startBtn.classList.add("hide");
    shuffleQuiz = questions.sort(() => Math.random() - .5);
    currentQuizIndex = 0;
    nextQuiz();
    quiz.classList.remove("hide");
}

//nextBtn function
nextBtn.addEventListener('click', () => {
    currentQuizIndex++;
    nextQuiz();
});


//set next question
function nextQuiz() {
    resetFunction();
    showQuiz(shuffleQuiz[currentQuizIndex]);
}

//Show Quiz
function showQuiz(quiz) {
    quizElement.innerText = quiz.question;
    quiz.answers.forEach(answer => {
        var btn = document.createElement('button');
        btn.innerText = answer.text;
        btn.classList.add('btn');
        if (answer.correct) {
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener('click', selectAnswer);
        buttons.appendChild(btn);
    });
}

//selecting Answer from the Options
function selectAnswer(e) {
    // const selectBtn = e.target;
    // const correct = selectBtn.dataset.correct;
    Array.from(buttons.children).forEach(
        (button) => {
            setStatus(button, button.dataset.correct);
        });
    if (shuffleQuiz.length > currentQuizIndex + 1) {
        nextBtn.classList.remove('hide');
        var Ndiv = nextBtn.parentElement;
        Ndiv.classList.add('mt-1');
        Ndiv.classList.remove('mt-5');
    } else {
        startBtn.innerText = "Restart the Quiz";
        startBtn.classList.remove('hide');
        Ndiv.classList.add('mt-1');
        Ndiv.classList.remove('mt-5');
    }
}

//set status of the butttons

function setStatus(element, correct) {
    clearStatus(element);
    if (correct) {
        element.classList.add('btn_correct');
    } else {
        element.classList.add('btn_wrong');
    }
}

//set clear status

function clearStatus(element) {
    element.classList.remove('btn_correct');
    element.classList.remove('btn_wrong');
}

// Reset Functions

function resetFunction() {
    nextBtn.classList.add('hide');
    while (buttons.firstChild) {
        buttons.removeChild(buttons.firstChild);
    }
}

// Questions Banks
questions = [{
        question: `
        a = (id(set()) == id({}))
        b = (id(set()) == id({}))
        print(a is b)`,
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false },
            { text: "None", correct: false },
            { text: "Error", correct: false }
        ]
    },
    {
        question: `                                                    a = (lambda x:x+1)                                        
        print(a(2))`,
        answers: [
            { text: "3", correct: true },
            { text: "2", correct: false },
            { text: "Error", correct: false },
            { text: "Lambda Object", correct: false }
        ]
    },
    {
        question: `
        print(type({}))`,
        answers: [
            { text: "set", correct: false },
            { text: "dictionary", correct: true },
            { text: "list", correct: false },
            { text: "tuple", correct: false }
        ]
    },
    {
        question: `
        def func():
        __pass
        print(func())`,
        answers: [
            { text: "pass", correct: false },
            { text: "None", correct: true },
            { text: "Error", correct: false },
            { text: "None of Above", correct: false }
        ]
    },
    {
        question: `
        a=[5,3,'t',"sun",4.5]
        print(a.find(1))`,
        answers: [
            { text: "-1", correct: true },
            { text: "None", correct: false },
            { text: "Error", correct: false },
            { text: "1", correct: false }
        ]
    }

]