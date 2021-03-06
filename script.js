

var triviaQuestions = [{
    question: "What is the name of Alice's Cat?",
    answerList: ["Molly", "Chloe", "Salem", "Dinah"],
    answer: 3
},{
    question: "What does the white rabbit call Alice?",
    answerList: ["Mary Ann", "Lilly", "Sarah", "Louise"],
    answer: 0
},{
    question: "What is the lizard with a ladder's name",
    answerList: ["Bill", "Larry", "George", "Mike"],
    answer: 0
},{
    question: "What song does Alice sing with the Flowers?",
    answerList: ["Blame it on the Begonias", "Danger Zone", "Golden Afternoon", "Let it Go"],
    answer: 2
},{
    question: "What animal does the Queen of Hearts use to play croquet?",
    answerList: ["Elephant", "Mouse", "Lion", "Flamingo."],
    answer: 3
},{
    question: "How tall is the caterpillar?",
    answerList: ["3 inches", "1 inch", "6 inches", "7inches"],
    answer: 0
},{
    question: "Complete the sign from the film: Don't Step on the _______!",
    answerList: ["Nome Maths", "Mome Raths", "Nome Rats", "Cone Wrath"],
    answer: 1
},{
    question: "What color are the Queen's roses before they are painted?",
    answerList: ["Blue", "Pink", "White", "Purple"],
    answer: 2
},{
    question: "What condiment did the Mad Hatter think was ridiculous to put inside the White Rabbit's watch?",
    answerList: ["Butter", "Mustard", "Sugar", "Jelly"],
    answer: 1
},{
    question: "What month was on the calendar behind mother oyster in the oyster bed?",
    answerList: ["April", "June", "October", "March"],
    answer: 3
},{
    question: "What did Alice eat from the Rabbit's garden to make her grow smaller?",
    answerList: ["Carrot", "Tomatoe", "Lettuce", "Onion"],
    answer: 0
},{
    question: "What object made up the bodies of the vultures?",
    answerList: ["Water Pipes", "Umbrellas", "Watermelons", "Cardboard Box"],
    answer: 1
},{
    question: "The flowers force Alice out of their garden because they think she is a what?",
    answerList: ["A Sunflower", "A Person", "A Ghost", "A Weed"],
    answer: 3
},{
    question: "What animal does the Walrus eat in Twiddle Dee and Twiddle Dum's story, 'The Walrus and the Carpenter'?",
    answerList: ["Oysters", "Fish", "Lobster", "Shrimp"],
    answer: 0
},{
    question: "What rodents does the queen use as the croquet balls?",
    answerList: ["Mouse", "Chinchilla", "Hedgehog", "Bird"],
    answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion;
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
    correct: "Yes! You are right!",
    incorrect: "No. You're terribly wrong.",
    endTime: "Out of time!",
    finished: "How did you do?"
}

$('#startBtn').on('click', function(){
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function(){
    $(this).hide();
    newGame();
});

function newGame(){
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion(){
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    answered = true;
    
    $('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for(var i = 0; i < 4; i++){
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({'data-index': i });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();
    $('.thisChoice').on('click',function(){
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown(){
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    time = setInterval(showCountdown, 1000);
}

function showCountdown(){
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if(seconds < 1){
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage(){
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); 
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $('#gif').html('<img src = "assets/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
  
    if((userSelect == rightAnswerIndex) && (answered == true)){
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if((userSelect != rightAnswerIndex) && (answered == true)){
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else{
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }
    
    if(currentQuestion == (triviaQuestions.length-1)){
        setTimeout(scoreboard, 5000)
    } else{
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }   
}

function scoreboard(){
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}