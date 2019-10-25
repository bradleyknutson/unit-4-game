var starWars = {
    chosenPlayer: false,
    chosenEnemy: false,
    fighters: {
        jarJarBinks: {
            health: 10000,
            baseHealth: 10000,
            attack: 5,
            baseAttack: 5,
            counterAttack: 20,
        },
        generalKenobi: {
            health: 150,
            baseHealth: 150,
            attack: 10,
            baseAttack: 10,
            counterAttack: 30
        },
        anakin: {
            health: 200,
            baseHealth: 200,
            attack: 7,
            baseAttack: 7,
            counterAttack: 25
        },
        grievous: {
            health: 300,
            baseHealth: 300,
            attack: 3,
            baseAttack: 3,
            counterAttack: 15
        },
        palpatine: {
            health: 200,
            baseHealth: 200,
            attack: 10,
            baseAttack: 10,
            counterAttack: 20
        },
        darthMaul: {
            health: 125,
            baseHealth: 125,
            attack: 30,
            baseAttack: 30,
            counterAttack: 22
        }
    },
    gameStart: function(){
        this.chooseFighter();
        $('#attack').on('click', function(){
            starWars.attack();
        });
        Object.keys(this.fighters).forEach(element => {
            $('#' + element + 'Health').text(starWars.fighters[element].health);
        });
        this.updatePage();
    },
    updatePage: function(){
        if(this.chosenPlayer){
            $(".fighterDiv[value=" + this.chosenPlayer + "]").css('visibility', 'hidden');
            $('#fighterImage').attr('src', 'assets/images/' + this.chosenPlayer + '.png');
            $('#playerHealth').text(this.fighters[this.chosenPlayer].health);
        }
        if(this.chosenEnemy){
            $('.fighterDiv[value=' + this.chosenEnemy + ']').css('visibility', 'hidden');
            $('#enemyImage').attr('src', 'assets/images/' + this.chosenEnemy + '.png');
            $('#enemyHealth').text(this.fighters[this.chosenEnemy].health);
        }
    },
    chooseFighter: function(){
        if(!starWars.chosenPlayer){
            $('.fighter').on('click', function(){
                starWars.chosenPlayer = $(this).attr('value');
                starWars.chosenEnemy = false;
                $('.fighter').unbind();
                starWars.updatePage();
                $('#chosenFighter').css('visibility', 'visible');
                starWars.chooseFighter();
            });
        }else{
            $('.fighter').on('click', function(){
                // if($(this).attr('value') !== starWars.chosenPlayer){
<<<<<<< HEAD
                starWars.chosenEnemy = $(this).attr('value');
                $('.fighter').unbind();
                starWars.updatePage();
                $('#chosenEnemy').css('visibility', 'visible');
=======
                    starWars.chosenEnemy = $(this).attr('value');
                    $('.fighter').unbind();
                    starWars.updatePage();
                    $('#chosenEnemy').css('visibility', 'visible');
>>>>>>> ed3dd06766bcf00948527a277e3cd7eb01fa2c4d
                // }
            });
        }
    },
    attack: function(){
        if(this.chosenEnemy){
            this.fighters[this.chosenPlayer].health -= this.fighters[this.chosenEnemy].counterAttack;
            this.fighters[this.chosenEnemy].health -= this.fighters[this.chosenPlayer].attack;
            this.fighters[this.chosenPlayer].attack += this.fighters[this.chosenPlayer].baseAttack;
            this.updatePage();
            if(this.fighters[this.chosenPlayer].health <= 0){
                this.gameLost();
            }
            if(this.fighters[this.chosenEnemy].health <= 0){
                this.enemyKilled();
            }
        }
    },
    enemyKilled: function(){
        var numKilled = 0;
        this.chosenEnemy = false;
        $('#chosenEnemy').css('visibility', 'hidden');
        Object.keys(this.fighters).forEach(element => {
            if(this.fighters[element].health <= 0){
                numKilled++;
            }
        });
        if(numKilled === Object.keys(this.fighters).length - 1){
            this.gameWon();
        }
        if(this.fighters[this.chosenPlayer].health >= 0){
            this.chooseFighter();
        }
    },
    gameLost: function(){
        $('#attack').unbind();
        $('#endOfGame').html("<h1>You've failed to save the galaxy!</h1><button type='button' class='btn btn-info playAgain'>Play Again?</button>");
        $('.playAgain').on('click', function(){
            starWars.reset();
        });
    },
    gameWon: function(){
        $('#attack').unbind();
        $('#endOfGame').html("<h1>You did it! Congratulations!</h1><button type='button' class='btn btn-info playAgain'>Play Again?</button>");
        $('.playAgain').on('click', function(){
            starWars.reset();
        });
    },
    reset: function(){
        this.chosenPlayer = false;
        this.chosenEnemy = false;
        Object.keys(this.fighters).forEach(element => {
            starWars.fighters[element].health = starWars.fighters[element].baseHealth;
            starWars.fighters[element].attack = starWars.fighters[element].baseAttack;
            $(".fighterDiv[value=" + element + "]").css('visibility', 'visible');
            $('#chosenFighter').css('visibility', 'hidden');
            $('#chosenEnemy').css('visibility', 'hidden');
        });
        $('#endOfGame').html("");
        this.gameStart();

    }
}


starWars.gameStart();
