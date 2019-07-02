//Global Variables
var attackName = '',
    curAttack = {},
    randInt = 0,
    enemyAttack = {},
    defendProgressInt = null,
    defendProgressComplete = 0,
    progressInt = null,
    progressComplete = 0;

var pokemonTypes = ["electric", "fire", "leaf", "water"] 
var typePic = "./images/pokemontypes.png"

var gameData = {
    step:1,
    hero:{},
    enemy:{}
}

//List of Characters and thier Attributes i.e attack, hp, pp 

var characters = [

    {
        name: "Pikachu",
        type: "electric",
        weakness: "ground",
        stength: "steel",
        img: {
            default: "./assets/images/defaultPikachu.png",
            fightingAgainst: "http://rs1263.pbsrc.com/albums/ii631/Pokemon-Vampire-Knight-lover/pikachu_.gif~c200",
            fightingWith: "http://vignette4.wikia.nocookie.net/pokemon/images/5/5b/Pikachu_Back_XY.gif/revision/latest?cb=20141009080948"
        },
        hp: {
            total: 500,
            current: 500
        },
        attacks: [{
            name: "Tackle",
            hp: attackPower(40, 60),
            pp: {
                available: 20,
                total: 20
            }
        },
        {
            name: "ThunderBolt",
            hp: attackPower(80, 120),
            pp: {
                available: 8,
                total: 8
            }
        },
        {
            name: "VoltTackle",
            hp: attackPower(130, 180),
            pp: {
                available: 3,
                total: 3
            }
        }]
    },
    {
        name: "Bulbasaur",
        type: "leaf",
        weakness: "fire",
        strength: "water",
        img: {
            default: "./assets/images/defaultBulb.png",
            fightingWith: "http://rs425.pbsrc.com/albums/pp335/Grasaldrea/ShinyBulbasauranimatedback.gif~c200",
            fightingAgainst: "https://media.giphy.com/media/iIWW4BM6nNWTu/giphy.gif"
        },
        hp: {
            total:500,
            current:500
        },
        attacks: [{
            name: "Scratch",
            hp: attackPower(50, 75),
            pp: {
                available: 15,
                total: 15
            }
        },
        {
            name: "LeafBlade",
            hp: attackPower(90, 135),
            pp: {
                available: 10,
                total: 10
            }
        },
        {
            name: "FrenzyPlant",
            hp: attackPower(140, 210),
            pp: {
                available: 2,
                total: 2
            }
        }]
    },
    {
        name: "Squirtle",
        type: "water",
        weakness: "leaf",
        strength: "fire",
        img: {
            default: "./assets/images/defaultSquirtle.png",
            fightingWith: "http://vignette3.wikia.nocookie.net/pokemon/images/d/d8/Squirtle_XY_Back_Sprite.gif/revision/latest?cb=20141031154426",
            fightingAgainst: "https://66.media.tumblr.com/ddd22fe10a485ed56a46d958c058a970/tumblr_n9lnpepqkW1scncwdo1_500.gif"
        },
        hp: {
            total:500,
            current:500
        },
        attacks: [{
            name: "Peck",
            hp: attackPower(40, 60),
            pp: {
                available: 20,
                total: 20
            }
        },
        {
            name: "AquaTail",
            hp: attackPower(80, 120),            
            pp: {
                available: 8,
                total: 8
            }
        },
        {
            name: "HydroCannon",
            hp: attackPower(130, 195),
            pp: {
                available: 2,
                total: 2
            }
        }]
    },
    {
        name: "Charmander",
        type: "fire",
        weakness: "water",
        strength: "leaf",
        img: {
            default: "./assets/images/defaultCharmander.png",
            fightingAgainst: "http://rs772.pbsrc.com/albums/yy9/HybridRainbow88/Charmander.gif~c200",
            fightingWith: "http://vignette1.wikia.nocookie.net/pokemon/images/2/23/Charmander_Back_XY.gif/revision/latest?cb=20141009063457"
        },
        hp: {
            total:500,
            current:500
        },
        attacks: [{
            name: "Scratch",
            hp: attackPower(45, 70),
            pp: {
                available: 15,
                total: 15
            }
        },
        {
            name: "Flamethrower",
            hp: attackPower(90, 135),
            pp: {
                available: 5,
                total: 5
            }
        },
        {
            name: "Overheat",
            hp: attackPower(140, 190),
            pp: {
                available: 3,
                total: 3
            }
        }]
    }
]


//Determine a random number that is between max and min and remove decimals
function attackPower(min, max) {

    if (min === undefined || min === "" || min === null) {
        min = 0
    }
    return Math.floor((Math.random() * (max - min)) + min)

}

//Display Character in UI for front or back based on Hero or Enemy

function populateChar(container, character) {
    //Populate Character, progress bar for Hero    
    if (character === 'hero') {
        //Get percentage for width attribute
        var percentage = (gameData.hero.hp.current/gameData.hero.hp.total)*100
        //Display image in html
        container.append('<section class="char hero"><img src="'+gameData.hero.img.fightingWith+'" alt="'+gameData.hero.name+'"></section>');
        //Display data and hp bar
        $("#heroData").append('<div class="data"><p>'+gameData.hero.name+'</p><div class="progress"><div class="progress-bar" role="progressbar" id="heroPercentage" style="width: '+percentage+'%" aria-valuenow="450" aria-valuemin="450" aria-valuemax="500"></div></div></div><br><p>'+gameData.hero.hp.current+'/'+gameData.hero.hp.total+'</p>');        
    }
    //Same for enemy
    else if (character === 'enemy') {
        var percentage = (gameData.enemy.hp.current/gameData.enemy.hp.total)*100
        container.append('<section class="char enemy"><img src="'+gameData.enemy.img.fightingAgainst+'" alt="'+gameData.enemy.name+'"></section>');
        $("#enemyData").append('<div class="data"><p>'+gameData.enemy.name+'</p><div class="progress"><div class="progress-bar" role="progressbar" id="enemyPercentage" style="width: '+percentage+'%" aria-valuenow="450" aria-valuemin="450" aria-valuemax="500"></div></div></div><br><p>'+gameData.enemy.hp.current+'/'+gameData.enemy.hp.total+'</p>');
    }
}




//Attack Multipler
function attackMultipler(attacker){
    //Check if defender is hero or enemy
    var defender = 'enemy';
    if (attacker === 'enemy') {
        defender = 'hero';
    }
    
    //If Defender is weak against Attacker type then double
    if (gameData[defender].weakness === gameData[attacker].type) {
        if (defender === "hero") {
            enemyAttack.hp *= 1.5;
        }
        else {
            curAttack.hp *= 1.5;
        }
    }

    //If Defender is strong against Attacker type then half
    if (gameData[defender].strength === gameData[attacker].type) {
        if (defender === "hero") {
            enemyAttack.hp /= 1.5;
        }
        else {
            curAttack.hp /= 1.5;
        }
    }

    //Remove decimal and return
    if (defender === "hero") {
        enemyAttack.hp = Math.floor(enemyAttack.hp);
        return enemyAttack.hp;
    }

    else {
        curAttack.hp = Math.floor(curAttack.hp);
        return curAttack.hp;
    }
}


//Setup HP of hero and enemy
function setHP() {
    clearInterval(defendProgressInt);
    clearInterval(progressInt);
    $("").val();
    $("").val();
}

function resetGame() {
    //Clear all divs
    $(".characters").empty();
    $("#hero").empty();
    $("#heroData").empty();
    $("#enemy").empty();
    $("#enemyData").empty();

    // Reset
    $("#instructions h2").text("Choose your Pokemon.");

    //Show Characters
    for (var i = 0;i < characters.length; i++) {
        $(".characters").append('<div class="col-lg-3 character '+characters[i].name+'" id='+i+'><img src="'+characters[i].img.default+'" alt="'+characters[i].name+'" id="'+characters[i].name+'"><h2>'+characters[i].name+'</h2><span class="type '+characters[i].type+'"></span></div>')
    }
    characterChoice();
}
resetGame();
$(".logo").click(resetGame());

function characterChoice() {
    $(".container .characters .character").on("click", function() {
        //get index of character clicked
        var nameIndex = $(this).attr("id")

        //Perform action based on progression of the game
        //Get current step
        switch(gameData.step) {

            case 1:
                //Choose your hero:
                for (let i in characters) {
                    //Iterate through characters until you find the one you clicked
                    if (characters[i].name === characters[nameIndex].name){
                        //The one that matches will be your hero
                        gameData.hero = characters[i]
                    }
                }
                //Remove Chosen character from list
                var char = $(this).remove();
                //Add character to arena
                populateChar($("#hero"), "hero");

                for (let i in gameData.hero.attacks) {
                    $("#moves").append('<div class="col-lg-3 moveBox"><h2 class="moveName">'+gameData.hero.attacks[i].name+'</h2><p><span  id="'+gameData.hero.attacks[i].name+'">'+gameData.hero.attacks[i].pp.available+'</span><span>/'+gameData.hero.attacks[i].pp.total+'</span></p></div>')
                }
                //Do not allow user to click on moves until enemy is chose
                $("#moves").addClass("disabled")

                //Instruct to choose enemy
                $("#instructions").text("Choose your Enemy.")
                
                //Set Step to 2
                gameData.step = 2;
                break;

            case 2:
                //Choose your enemy
                for (let i in characters) {
                    if (characters[i].name === characters[nameIndex].name) {
                        //Find chosen enemy and add them to game data
                        gameData.enemy = characters[i];
                    }
                }
                //Remove this character as a choice
                var char = $(this).remove();

                console.log(gameData.enemy.name)
                //Build the enemy
                populateChar($("#enemy"), "enemy");

                $("#instructions").text("FIGHT!");

                //Hide the heros list
                $('.characters').children().slideUp('500', function(){
                    $('.characters').addClass('hidden');
                  });

                gameData.step = 3;
                attackList();
                break;

                
        }
    })
}

// Hero Attack

function attackEnemy(that) {
    //What attack was selected
    attackName = that.context.firstChild.innerHTML
    
    //children(".moveBox").children(".moveName").text();
    
    for (let i in gameData.hero.attacks) {
        if (gameData.hero.attacks[i].name === attackName && gameData.hero.attacks[i].pp.available > 0) {
            //Get chosen attack
            curAttack = gameData.hero.attacks[i];
            curAttack.pp.available -= 1;
            let name = "#" + curAttack.name
            console.log(name, curAttack.pp.available)
            $(name).text(curAttack.pp.available);             
        }
    }

    console.log(curAttack)
    if (curAttack.pp.available > 0) {
        $('#moves').addClass("disabled");

        $('.char img').animate(
        {
            'margin-left': '-30px',
            'margin-top': '10px'
        },
        50,
        'swing'
        );
        $('.char img').animate(
        {
            'margin-left': '30px',
            'margin-top': '-10px'
        },
        50,
        'swing'
        );
        $('.char img').animate(
        {
            'margin-left': '0px',
            'margin-top': '0px'
        },
        50,
        'swing'
        );
    }
    //Attack Enemy
    gameData.enemy.hp.current -= attackMultipler('hero', curAttack);
    //Update HP
    $("#enemyPercentage").attr("style", 'width: '+((gameData.enemy.hp.current/500)*100)+'%');
    console.log(gameData.enemy.hp.current)

    if (gameData.enemy.hp.current <= 0){
        //Enemy Died
        clearModal();
        $('.modal-in header').append('<h1>You Enemy is slain</h1><span class="close">x</span>');
        $('.modal-in section').append('<p>Congratulations! Dare you try again?');
        $('.modal-out').slideDown('400');
        modalControls();

        gameData.enemy.hp.current = 0;

        // clear the stadium of the dead
        $('#enemy').empty();
        $('#enemyData').empty();

        // show the available characters
        $('.characters').removeClass('hidden');
        $('.characters').children().slideDown('500');

        //Empty enemy object in gameData
        gameData.enemy = {};

        //Set step to 2 to choose enemy
        gameData.step = 2;

         // unbind click for reset
         $('.moveName').unbind('click');
    }
    else {
        setTimeout(function(){
            // now defend that attack
            defend(that);
        }, 1000);
    }
}

//Enemy Attack 
function defend(that) {
    // random attack
    var randInt = Math.floor(Math.random()*3);
    if (randInt === 2) {
        randInt = Math.floor(Math.random()*3);
    }
    enemyAttack = gameData.enemy.attacks[randInt];

    console.log(randInt, enemyAttack)
    // enemy attack animation sequence
    $('.char img').animate(
      {
        'margin-right': '-30px',
        'margin-top': '-10px'
      },
      50,
      'swing'
    );
    $('.char img').animate(
      {
        'margin-right': '30px',
        'margin-top': '10px'
      },
      50,
      'swing'
    );
    $('.char img').animate(
      {
        'margin-right': '0px',
        'margin-top': '0px'
      },
      50,
      'swing'
    );
    gameData.enemy.hp.current -= attackMultipler('enemy', enemyAttack);
    //Update HP
    $("#heroPercentage").attr("style", 'width: '+((gameData.hero.hp.current/500)*100)+'%');

    if (gameData.hero.hp.current <= 0) {

        //Ya boy is dead
        clearModal();
        $('.modal-in header').append('<h1>Your Hero has died</h1><span class="close">x</span>');
        $('.modal-in section').append('<p>You lose, good day!');
        $('.modal-out').slideDown('400');
        modalControls()

        gameData.hero.hp.current = 0;
        
        resetGame();
    }
    else {
        //I lived mofo


    }
}



// $(".container .characters .character").on("click", function() {
//     //get index of character clicked
//     console.log("Clicked")
//     var nameIndex = $(this).attr("id")
//     console.log(nameIndex)
// })

// $("#0").click(function() {
//     console.log("Click")
// })

// gameData.hero = characters[0]
// gameData.enemy = characters[3]
// console.log(gameData.hero.img.fightingAgainst)

// populateChar($("#hero"), 'hero')
// populateChar($("#enemy"), 'enemy')

function modalControls(){
    $('.modal-out').click(function(){
      $(this).slideUp('400');
    });
    $('.modal-in .close').click(function(e){
      $('.modal-out').slideUp('400');
    });
  
    $('.modal-in').click(function(e){
      e.stopPropagation();
      e.preventDefault();
    });
}
  
function clearModal(){
    $('.modal-in header').empty();
    $('.modal-in section').empty();
    $('.modal-in footer').empty();
    //setHP();
}

function attackList() {
    $("#moves").removeClass("disabled");

    $(".moveBox").click(function() {
        var doAttack = 1;

        if (gameData.step === 3) {
            console.log($(this));
            attackEnemy($(this));
        }
    });
}



