
var myQuestions = [
    {
        question: "What is 20+11?",
        answers: [3, 5, 25, 31],
        correctAnswer: '3',
        name: "first"
    },
    {
        question: "What is 24-7 ?",
        answers: [17, 15, 18, 31],
        correctAnswer: '0',
        name: "second"
    },
    {
        question: "What is 10/2?",
        answers: [3, 5, 115, 114],
        correctAnswer: '1',
        name: "third"
    },
    {
        question: "What is 30/3?",
        answers: [3, 55, 10, 15],
        correctAnswer: '2',
        name: "forth"
    }
];

var labels = ['first', 'second', 'third', 'forth'];
//==== message desplay ========
var messages = {
    correct: "Yes, that's right!",
    incorrect: "No, that's not it.",
    endTime: "Out of time!",
    
}

//================ create variable======== 

var seconds;
var time;
var userSelect;
var answered;

var currentquestion = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var unanswered = 0;

//start button click
$("#questionbox").hide();
$("#answerbox").hide();

$("#start").on("click", function () {

    $("#screen").hide();
    $("#questionbox").show();
    questiondesplay();

});

$("#test").on("click", function () {

    $("#screen").hide();
    $("#questionbox").show();
    $('.answerList').empty();


});

//===================Timmer=================   


function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
        clearInterval(time);
        //doSomething();
        
        answerPage();
    }
}
//==================== timmer end===============

//================== question deaplay============

function questiondesplay() {
    $('#message').empty();
	$('#correctedAnswer').empty();
    $('#image').empty();
    answered = true;
   
    $('#currentQuestion').html('<h2>Current Question : '+(currentquestion+1)+'/'+myQuestions.length+"</h2>");
    var temp = myQuestions[currentquestion].question;
    $(".question").html("<h2>" + temp + "</h2>");
    for (var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(myQuestions[currentquestion].answers[i]);
        choices.attr({ 'data-index': i });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();

    //clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click', function () {
        userSelect = $(this).data('index');
        clearInterval(time);
        console.log(userSelect);
        answerPage();
    });


}
//================== question deaplay end============

//=================Time Up==========================
function doSomething() {
    $("#screen").hide();
    $("#questionbox").show();
    $('.answerList').empty();
    questiondesplay();

}
//=================Time Up end ==========================
//=================Answer page==========================

function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); //Clears question page
    $('.question').empty();

    $('#currentQuestion').html('<h2>Current Question : '+(currentquestion+1)+'/'+myQuestions.length+"</h2>");
     
    var rightans = myQuestions[currentquestion].correctAnswer;
    console.log(rightans);
    if((userSelect == rightans)){
        //alert("right")
        $("#message").html("This is a Meassage" + messages.correct);
        
        correctAnswers++;
    }else if((userSelect != rightans)){
        //alert("wrong")
        $("#message").html( messages.incorrect);
        
        wrongAnswers++;
    }else{
        $("#message").html( messages.endTime);
        
        unanswered++;
    }
   
       
    $('#image').html('<img src = "assets/image/'+ labels[currentquestion] +'.gif" width = "300px" >');

    if (currentquestion == (myQuestions.length - 1)) {
        alert("No Question")
    } else {
        setTimeout(questiondesplay, 5000);
        currentquestion++;
    }
    
}


//=================Answer page==========================