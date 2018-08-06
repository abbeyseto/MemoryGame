/*
 * Create a list that holds all of your cards
 */
let card = $('.card');

let cards = [...card];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
$(document).ready(function () {
    $('#popupUser').addClass('show');
    const userName = $('#userName');
    $('.deck').html(shuffle(cards));
    shownow();
})
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 */

let cardList = [];
let matchedCard = $("match");
let cardsMatched = 0;
let moves = 0;
let counter = $(".moves");

$('.deck').on('click', '.card', function (e) {
    $(this).addClass('open');
    $(this).addClass('show');
    $(this).addClass('avoid-clicks');
    cardList.push(this);

    if (cardList.length === 2) {
        moveCounter();
        /*console.log(cardList);
        console.log(cardList[0].childNodes[1].className);
        console.log(cardList[1].childNodes[1].className);
        */

        let name1 = cardList[0].childNodes[1].className;
        let name2 = cardList[1].childNodes[1].className;
        if (name1 === name2) {
            matched();
            cardsMatched++;

            if (cardsMatched === 8) {
                congratulations();
                writenow();
                cardsMatched = 0;
            }
        } else {
            unmatched();
        }
    }
});

//disable cards temporarily
function disable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
}
//enable cards and disable matched cards
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        for (let i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}

//for when cards match
function matched() {
    cardList[0].classList.add("match");
    cardList[1].classList.add("match");
    cardList[0].classList.remove("show", "open");
    cardList[1].classList.remove("show", "open");
    cardList = [];
}

//for when cards don't match
function unmatched() {
    cardList[0].classList.add("unmatched");
    cardList[1].classList.add("unmatched");
    disable();
    setTimeout(function () {
        cardList[0].classList.remove("show", "open", "avoid-clicks", "unmatched");
        cardList[1].classList.remove("show", "open", "avoid-clicks", "unmatched");
        enable();
        cardList = [];
    }, 1100);
}

/*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
//game timer
let second = 0, minute = 0;
let timer = $(".timer");
let interval;
function startTimer() {
    interval = setInterval(function () {
        timer.html(minute + "mins " + second + "secs");
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}
const stars = document.querySelectorAll(".fa-star")
function moveCounter() {
    moves++;
    counter.html(moves);
    //start timer on first move
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

function startGame() {
    // shuffle deck
    $('.deck').html(shuffle(cards));
    // remove all existing classes from each card
    $('.card').removeClass("match");
    $('.card').removeClass("show");
    $('.card').removeClass("avoid-clicks");
    $('.card').removeClass('open');
    cardsMatched = 0;
    cardList=[];
    moves = 0;
    $('.moves').html(moves);

    // reset star rating
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.visibility = "visible";
    }
    //reset timer
    timer.html("0 mins 0 secs");
    clearInterval(interval);
}

let modal = $('#popup1');
let modal2 = $('#popupUser');
let closeicon = document.querySelector(".close");
let closeicon2 = document.querySelector(".close2");

// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations() {
    finalTime = timer.html();
    clearInterval(interval);
    // show congratulations modal
    modal.addClass("show");

    // declare star rating variable
    let starRating = document.querySelector(".stars").innerHTML;

    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;

    //closeicon on modal
    closeModal();
}


// @description close icon on modal
function closeModal() {
    closeicon.addEventListener("click", function (e) {
        modal.removeClass("show");
        startGame();
    });
}

closeicon2.addEventListener("click", function (e) {
    if (userName.value.length > 1) {
        closeuserModal();
        startGame();
    } else if(userName.value === ""){
        $('.error').html('i can\'t detect a name, your input is empty');
    }else {
        $('.error').html('Please enter your name');
    }
});
function closeuserModal() {
    modal2.removeClass("show");
    $('#title').html("Welcome " + userName.value);
    console.log(userName.value);
    startGame();
}
$('.play-again').on('click', function () {
    if (userName.value.length > 1) {
        closeuserModal();
    }
});

// @desciption for user to play Again 
function playAgain() {
    startGame();
    modal.removeClass("show");
    shuffle(array);
}
function shownow() {
    let url = 'https://api.adenleabiodun.com/api/v2/mgusers/_table/Score?api_key=2f59dfe705aafc17a07f1dfeab9198fe2bac90f61dd79732d7ff25b1a5d9d2c7&fields=*&order=moves';
    $.ajax({
        url: url,
        method: 'GET',
    }).done(displayScore).fail(function (err) {
        throw err;
    });
    function displayScore(data) {
        if (data.resource) {
            const show = data.resource;
            let showscore = '<tr>' + show.map(details => `<td>${details.name}</td><td>${new Date(details.time).toLocaleString()}</td><td> ${details.moves}</td></tr>`
            ).join('');
            $('#leadboard').find('table').append(showscore);
        }
    }
}


//***CREATE NEW PLAYER USING POST REQUEST***//
function writenow() {
    let newName = userName.value;
    console.log(newName);
    let newMoves = $('#userAge').val();
    let date = Date();
    let url1 = 'https://api.adenleabiodun.com/api/v2/mgusers/_table/Score?api_key=2f59dfe705aafc17a07f1dfeab9198fe2bac90f61dd79732d7ff25b1a5d9d2c7'
    let addingNewUser = {
        "resource": [{
            "name": newName,
            "moves": moves,
            "time": date,
        }]
    };

    $.ajax({ // Begining of ajax query
        url: url1, // url defined in the request statement
        dataType: "json", // type of data to be sent via the POST method
        method: 'POST', // POST method to send data to the API
        data: addingNewUser, // data to se sent to the API
    }).done(function (resp) {
        console.log("User has been created!");
        console.log(resp);
    }).fail(console.log("User NOT created!"));

}
