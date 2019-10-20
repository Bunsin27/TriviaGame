$(document).ready(function () {

    //my question and answers on mythology 
    var questions = {
        zero: {
            question: "The ancient Roman god of war was commonly known as which of the following?",
            answers: ["Mars", "Jupiter", "Juno", "Ares"],
            correct: "Mars"
        },
        one: {
            question: "Who in Greek mythology, who led the Argonauts in search of the Golden Fleece?",
            answers: ["Castor", "Daedalus", "Odysseus", "Jason"],
            correct: "Jason"
        },


        three: {
            question: "This Greek goddess name that was chosen for the dwarf planet responsible for discord on Pluto's classification amongst astronomers.",
            answers: ["Charon", "Eris", "Ceres", "Dysnomia"],
            correct: "Eris"
        },

        four: {
            question: "Who was the King of Gods in Ancient Greek mythology?",
            answers: ["Apollo", "Hermes", "Zeus", "Poseidon"],
            correct: "Zeus"
        },

        five: {
            question: "Which figure from Greek mythology traveled to the underworld to return his wife Eurydice to the land of the living?",
            answers: ["Hercules", "Orpheus", "Perseus", "Daedalus"],
            correct: "Orpheus"
        },

        six: {
            question: "In Greek mythology, who is the god of wine?",
            answers: ["Dionysus", "Apollo", "Demeter", "Hephaestus"],
            correct: "Dionysus"
        },

        seven: {
            question: "In most traditions, who was the wife of Zeus?",
            answers: ["Hera", "Aphrodite", "Athena", "Hestia"],
            correct: "Hera"
        },

        eight: {
            question: "Which of these mythological creatures is said to be half-man and half-horse?",
            answers: ["Pegasus", "Minotaur", "Centaur", "Gorgon"],
            correct: "Centaur"
        },

        nine: {
            question: "What mythology did the god Apollo come from?",
            answers: ["Roman and Spanish", "Greek and chinese", "Greek, Roman and Norse", "Greek and Roman"],
            correct: "Greek and Roman"
        },

        ten: {
            question: "The Nike apparel and footwear brand takes its name from the Greek goddess of what?",
            answers: ["Courage", "Strength", "Honor", "Victory"],
            correct: "Victory"
        },
    };


    var rightDiv = $("<div class='rightAns'></div>");
    var timerDiv = $("<div class='countdown'><h3></h3></div>"); //
    var questionDiv = $("<div class='question'><h3></h3></div>"); // The divs to contain the info .....
    var answerDiv = $("<div class='answers'></div>");

    //object keys to return questions in order
    var keys = Object.keys(questions);
    var key = keys[n];
    var time = 30;
    var n = 0;


    function setup() {
        $(".start").css("display", "none");

        var correct = 0;
        var incorrect = 0;
        var timeout = 0;
        n = 0;
        key = keys[n]; //game and function setup

        var reset = function () {
            time = 30;
            $(".rightAns").empty();
            $(".rightAns").remove();
            $(".main").append(timerDiv);
            $(".countdown h3").html("TIME REMAINING: " + time);
            $(".main").append(questionDiv);
            $(".main").append(answerDiv);
        }

        reset();

        function showQA() {
            $(".question h3").html(questions[key].question);

            for (var i = 0; i < questions[key].answers.length; i++) {
                $(".answers").append("<p class='answer'>" + questions[key].answers[i] + "<p>");
            }

            $(".answers p").on("click", function () {
                var selected = $(this).text();


                if (selected === questions[key].correct) { // wrong answer or right answer functions
                    clearInterval(counter);
                    $(timerDiv).remove();
                    $(questionDiv).remove();
                    $(".answers p").remove();
                    $(answerDiv).remove();
                    $(".main").append(rightDiv);
                    $(".rightAns").text("ZEUS APPROVES!");
                    correct++;
                } else {
                    clearInterval(counter);
                    $(timerDiv).remove();
                    $(questionDiv).remove();
                    $(".answers p").remove();
                    $(answerDiv).remove();
                    $(".main").append(rightDiv);
                    $(".rightAns").text("WRONG! HADES HAS HIS EYE ON YOU--- THE CORRECT ANSWER WAS: " + questions[key].correct);
                    incorrect++;
                }
                n++;
                key = keys[n];


                if (checkIfLast()) {
                    displayFinalScore();

                } else { // end of game check and reset-(this is bugging me)
                    setTimeout(countReset, 3000);
                    setTimeout(reset, 3000);
                    setTimeout(showQA, 3000);
                }
            });
        }

        showQA();

        var counter = setInterval(count, 500);


        function count() {
            time--
            $(".countdown h3").html("TIME REMAINING: " + time); //timer for questions(time to answer)

            if (time < 1) {
                clearInterval(counter);
                $(timerDiv).remove();
                $(questionDiv).remove();
                $(".answers p").remove();
                $(answerDiv).remove();
                $(".main").append(rightDiv);
                $(".rightAns").html("YOU HAVE BEEN BANISHED TO THE UNDERWORLD--- THE CORRECT ANSWER WAS: " + questions[key].correct);
                timeout++;
                n++;
                key = keys[n];

                if (checkIfLast()) {
                    displayFinalScore();
                } else {
                    setTimeout(countReset, 3000);
                    setTimeout(reset, 3000);
                    setTimeout(showQA, 3000);
                }
            }
        }

        function checkIfLast() {
            if (key === undefined) {
                return true;
            }
            return false;
        }

        //Question timer reset
        function countReset() {
            counter = setInterval(count, 400);
        }





        function displayFinalScore() {
            $(".rightAns").remove();
            $(".start").css("margin-top", "30px");
            $(".start").css("display", "inline");
            $(".main").prepend("<h2>UNANSWERED: " + timeout + "</h2>");
            $(".main").prepend("<h2>INCORRECT: " + incorrect + "</h2>");
            $(".main").prepend("<h2>CORRECT: " + correct + "</h2>");
        }
    };

    $(document).on("click", ".start", setup);

});