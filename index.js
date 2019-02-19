'use strict';

const STORE = [
    {
        question: "Which house did Harry get sorted into?",
        choices:[ "Gryffindor", "Ravenclaw","Hufflepuff","Slytherin"],
        answer: 0,
    },
    {
        question: "Which protective measure did Professor Flitwick contribute for the Philosopher's Stone?",
        choices: ["Devil's Snare","Fluffy","Flying Keys", "Chess"],
        answer: 2,
    },
    {
        question:"How many kids are in the Weasley Family?",
        choices: ["4","5","6","7"],
        answer:3,
    },
    {
        question:"What is Hogwarts motto?",
        choices:["Don't tickle a sleeping dragon", "Be strong and courageous","Live free or die","The wand chooses the wizard"],
        answer:0,
    },
    {
        question:"How does Tom Riddle manipulate Ginny Weasley?",
        choices:["spell","diary", "curse", "touching an object"],
        answer:1,
    },
    {
        question:"What words prompt the Marauder's Map to reveal itself?",
        choices:["Alohamora","Open sesame","I solemnly swear that I am up to no good","expelliarmus"],
        answer: 2,
    },
    {
        question: "What is the composition of Harry Potter's wand?",
        choices:["Laurel wood with a unicore hair core","vine wood with dragon heartstring core","Holly wood with Phoenix feather core", "Elder wood with Thestral tail hair"],
        answer:2,
    },
    {
        question: "Which one is not an unforgivable curse?",
        choices:["Avada Kedavra","Crucio","Imperio","Obliviate"],
        answer:3,
    },
    {
        question: "How did Harry get the golden egg to reveal the second task?",
        choices:["By cracking it","By listening to it underwater","By putting it under the sun","By using a spell"],
        answer:1,
    },
    {
        question: "What potion brings its user unusually good luck?",
        choices:["Polyjuice potion","Felix Felicis","Amortentia", "Veritaserum"],
        answer:1,
    },
]

//starts quiz when the "Let's start" button is clicked
let questionNumber = 0;
let score = 0;
$('#question').hide();

function renderquestion (){
  $('#question').html('')
  let currentQuestion = STORE[questionNumber]
  $('#question').append(`<h2>${currentQuestion.question}</h2>`)
  $('#question').append(`<form> <fieldset>`)
  for (let i=0; i < currentQuestion.choices.length; i++) {
    $('#question').append(`
      <div>
        <input id ="${i}" type ="radio" value="${i} " name="option" required>
        <label for="${i}" class="answerChoice">${currentQuestion.choices[i]}</label>
      </div>
    `)
  }
  $('#question').append(`<button type="submit" class="submitButton">Submit</button>`)
  $('#question').append(`</fieldset></form>`)
}

function startQuiz() {      
    $('.startButton').click(function(event) {
    $('.questionNumber').text(questionNumber + 1);
    $('#startPage').hide();
    $('#question').show();
      renderquestion();
    });
}
 $(startQuiz);

function finalPage() {
  $('#endPage').show();
  $('#question').hide();
  $('.totalScore').text(score);
}                               

function restartQuiz() {
  $('body').on('click','.restartButton', function (event) {
    score = 0;
    $('.currentScore').text(score);
    questionNumber = 0;
    $('.questionNumber').text(questionNumber);
    $('#startPage').show();
    $('#endPage').hide();
  })
}
$(restartQuiz);

function handleQuestions() {      
    $('body').on('click','.submitButton',function(event) {
      //check if it's the last question
    let selectedAnswer = $('input[name="option"]:checked').val();
      if (selectedAnswer == STORE[questionNumber].answer){
        score ++;
        $('.currentScore').text(score);
        $('#correctFeedback').show();
        $('#question').hide();
      }
      else {
        $('#incorrectFeedback').show();
        let answerPosition = STORE[questionNumber].answer
        $('.incorrectFeedbackText').text(STORE[questionNumber].choices[answerPosition]);
        $('#question').hide();
      }  
    if (questionNumber == STORE.length - 1) {
       $('.questionNumber').text(STORE.length);
       $('#incorrectFeedback').hide();
       $('#correctFeedback').hide();      
       finalPage(); 
     }
     else {
      questionNumber++;
      $('.questionNumber').text(questionNumber + 1);
      $('.nextButton').click(function(event){
        $('#question').show();
        $('#incorrectFeedback').hide();
        $('#correctFeedback').hide();

      });
      
      renderquestion();
     }
    });
  } 
  $(handleQuestions); 