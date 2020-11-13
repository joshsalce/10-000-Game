var totalScore = 0;
var roundScore = 0;
var rollScore = 0
var tempScore = 0;
var request = "none";
var diceArray = [];
var finalRound = false;
var youHaveAllCounters = false;
var rollRoundScore;
var turnCount = 1;


$(document).ready(function(){
	for (i = 0; i < 6; i++) {
		diceArray[i] = {};
		diceArray[i].id = "#img" + (i+1);
		diceArray[i].value = i + 1;
		diceArray[i].state = 0;
	}
});

function newGame() {
		location.reload(true);
}

function refreshScoringRules() {
	window.alert("Scoring\n1 = 100 points\n5 = 50 points\nThree of a kind of 1 = 1000 points\nThree of a kind of 2 = 200 points\nThree of a kind of 3 = 300 points\nThree of a kind of 4 = 400 points\nThree of a kind of 5 = 500 points\nThree of a kind of 6 = 600 points\nEach number over three of a kind = double the points");
}

function newRoll() {
	$(document).ready(function() {
		$("img").off();
		$('#rules').fadeOut('slow');
		request = "roll";
		mainFunction();
	});
}

function rollDice() {
	for (var i = 0; i < 6; i++) {
		if (diceArray[i].state === 0) {
			$(diceArray[i].id).removeClass("more-faded");
			diceArray[i].value = Math.floor((Math.random() * 6) + 1);
		}
	}

}

function updateImage() {
	var diceImage;
	for (var i = 0; i < 6; i++) {
		switch (diceArray[i].value) {
			case 1: diceImage = "images/dice1.png";
							break;
			case 2: diceImage = "images/dice2.png";
							break;
			case 3: diceImage = "images/dice3.png";
							break;
			case 4: diceImage = "images/dice4.png";
							break;
			case 5: diceImage = "images/dice5.png";
							break;
			case 6: diceImage = "images/dice6.png";
							break;
		}
		$(diceArray[i].id).attr("src", diceImage);
	}
}

function selectDice() {
	$("img").on("click", imageClick);
}

function imageClick() {
	var i = $(this).data("number");
	if (diceArray[i].state === 0 || diceArray[i].state === 1) {
			$(this).toggleClass("faded");
			if (diceArray[i].state === 0) {
					diceArray[i].state = 1;
		} else {
					diceArray[i].state = 0;
		}
	}
	calculateRollScore();
	allCounters();
}

function calculateRollScore() {
	tempScore = 0;
	$("#roll-score").text(tempScore);
	var ones = [];
	var twos = [];
	var threes = [];
	var fours = [];
	var fives = [];
	var sixes = [];
	var scoreArray = [];
	for (var i = 0; i < 6; i++) {
			if (diceArray[i].state === 1) {
							switch (diceArray[i].value) {
											case 1: ones.push(1);
															break;
											case 2: twos.push(2);
															break;
											case 3: threes.push(3);
															break;
											case 4: fours.push(4);
															break;
											case 5: fives.push(5);
															break;
											case 6: sixes.push(6);
															break;
										}
						}
	}
	switch (ones.length) {
				case 1: scoreArray[0] = 100; break;
				case 2: scoreArray[0] = 200; break;
				case 3: scoreArray[0] = 1000; break;
				case 4: scoreArray[0] = 2000; break;
				case 5: scoreArray[0] = 4000; break;
				case 6: scoreArray[0] = 8000; break;
				default: scoreArray[0] = 0;
	}
	switch (twos.length) {
				case 3: scoreArray[1] = 200; break;
				case 4: scoreArray[1] = 400; break;
				case 5: scoreArray[1] = 800; break;
				case 6: scoreArray[1] = 1600; break;
				default: scoreArray[1] = 0;
	}
	switch (threes.length) {
				case 3: scoreArray[2] = 300; break;
				case 4: scoreArray[2] = 600; break;
				case 5: scoreArray[2] = 1200; break;
				case 6: scoreArray[2] = 2400; break;
				default: scoreArray[2] = 0;
	}
	switch (fours.length) {
				case 3: scoreArray[3] = 400; break;
				case 4: scoreArray[3] = 800; break;
				case 5: scoreArray[3] = 1600; break;
				case 6: scoreArray[3] = 3200; break;
				default: scoreArray[3] = 0;
	}
	switch (fives.length) {
				case 1: scoreArray[4] = 50; break;
				case 2: scoreArray[4] = 100; break;
				case 3: scoreArray[4] = 500; break;
				case 4: scoreArray[4] = 1000; break;
				case 5: scoreArray[4] = 2000; break;
				case 6: scoreArray[4] = 4000; break;
				default: scoreArray[4] = 0;
	}
	switch (sixes.length) {
				case 3: scoreArray[5] = 600; break;
				case 4: scoreArray[5] = 1200; break;
				case 5: scoreArray[5] = 2400; break;
				case 6: scoreArray[5] = 4800; break;
				default: scoreArray[5] = 0;
	}

	tempScore = scoreArray[0] + scoreArray[1] + scoreArray[2] + scoreArray[3] + scoreArray[4] + scoreArray[5];
	$("#roll-score").text(tempScore);
	rollRoundScore = roundScore + tempScore;
	$("#round-score").text(rollRoundScore);
}

function allCounters() {
		var counter = 0;
		for (var i = 0; i < 6; i++) {
				if (diceArray[i].state === -1 || diceArray[i].state === 1) {
					counter++;
				}
		}
		if (counter === 6 && tempScore !== 0) {
			window.alert("You have All Counters! You may keep rolling or you can record your score and end you turn.");
			youHaveAllCounters = true;
		}
}

function recordScore() {
	$(document).ready(function() {
		$("img").off();
		request = "record";
		mainFunction();
	});
}

function checkWin() {
	if (totalScore === 10000 && finalRound !== true) {
		window.alert("You have reached 10,000. Congratulations! You have won in " + turnCount + " turns!");
		finalRound = true;
	}
	if (totalScore > 10000 && finalRound != true) {
		window.alert("You have gone over 10,000. To win, your score must add up to 10000 exactly. Please try again.");
		totalScore = totalScore - rollRoundScore;
		$("#player-score").text(totalScore);
		finalRound = false;
	}
}

function mainFunction() {
		if (request === "roll") {
			rollScore = tempScore;
			if (rollScore === 0) {
				roundScore = 0;
			}
			$("#player-turn").html(turnCount);
			roundScore = roundScore + rollScore;
			for (var i = 0; i < 6; i++) {
				if (diceArray[i].state === 1) {
						diceArray[i].state = -1;
						$(diceArray[i].id).removeClass("faded").addClass("more-faded");
				}
			}
			if (youHaveAllCounters === true) {
				for (i = 0; i < 6; i++) {
						diceArray[i].state = 0;
				}
			}
			tempScore = 0;
			$("#roll-score").text(tempScore);
			rollDice();
			updateImage();
			youHaveAllCounters = false;
			selectDice();
		}
		if (request === "record") {
			rollScore = tempScore;
			totalScore = rollRoundScore + totalScore;
			if (rollScore === 0) {
				totalScore = totalScore - rollRoundScore;
				$("#player-score").text(totalScore);
			}
			if (rollRoundScore < 1000 && totalScore < 1000) {
				window.alert("You cannot record your score until you break 1,000 in one turn. Please keep rolling.");
				roundScore = 0;
				rollRoundScore = 0;
				totalScore = 0;
				$("#player-score").text(totalScore);
			}
			tempScore = 0;
			$("#roll-score").text(tempScore);
			$("#player-score").text(totalScore);
			$("#round-score").text(0);
			roundScore = roundScore + rollScore;
			for (var i = 0; i < 6; i++) {
				diceArray[i].state = 0;
				$(diceArray[i].id).removeClass("faded").removeClass("more-faded").addClass("more-faded");
			}
			turnCount += 1;
			$("#player-turn").html(turnCount);
			checkWin();
		}
}
