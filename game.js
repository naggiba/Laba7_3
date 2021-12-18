// Список з кольорами

var colors = ["red","yellow", "green", "blue"];

// Порожній ігровий масив шаблонів кольорів

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var gameStarted = false;


// запускається гра та змінюється назва рівня
$(document).keypress(function() {

	if (gameStarted === false) {
		$("#level-title").text("Level " + level);
		randomColor();
		gameStarted = true;
	}

});


// Ми додамо звук до кліку за допомогою функції playSound і дозволимо гравцеві натиснути попередню кнопку відповідно до правил
$(".btn").click(function(){

	var userChosenColor = $(this).attr("id");

	userClickedPattern.push(userChosenColor);

	playSound(userChosenColor)

	checkingAnswer(userClickedPattern.length-1);

});

// За допомогою цієї функції ми перевіримо, чи дорівнює наш масив кольорів масиву клацання, так само, як і їх довжина, за допомогою умовних операторів,
// ми зробимо затримку, перш ніж наша основна функція randomColor буде виконана, інакше ми застосуємо гру класу, якщо вони не рівні.
// Ми виконаємо скидання рівня, скидання масиву gamePattern і скидання знака, який повідомить нам, чи почалася гра.
function checkingAnswer(usersLevel) {

	if (gamePattern[usersLevel] === userClickedPattern[usersLevel]) {
		if (userClickedPattern.length === gamePattern.length){
			setTimeout(function() {
				randomColor();
			}, 1000);
		}

	} else {
		playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
	setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

		startOver();
	}
}


// Функція для отримання випадкового числа, виберіть випадковий колір за цим числом із масиву з кольорами та посуньте його до кінця масиву шаблонів кольорів гри
// включення анімації за допомогою функції FadeIn, FadeOut і відтворення звуку шляхом вибору звуку відповідно до випадкового кольору, отриманого випадковим чином.
function randomColor() {

userClickedPattern = [];

level++;

$("#level-title").text("Level " + level);

var randomNumber = Math.floor(Math.random()*4);

var randomChosenColor = colors[randomNumber];

	gamePattern.push(randomChosenColor);

$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColor);

}

// Додавання анімації до натиснутої кнопки

$(".btn").click(function() {

	var animated = $(this);

animated.addClass("pressed");

setTimeout(function() {
	animated.removeClass("pressed");

	}, 100);

})
 // Функція відтворення звуку при натисканні

function playSound(name) {

	var audio = new Audio("./sounds/" + name + ".mp3");
	audio.play();
}

// Повне скидання, скидання рівня гри, скидання ігрового режиму та скидання основного масиву з кольоровими візерунками.

function startOver(){
	level = 0;
	gameStarted = false;
	gamePattern = [];
}
