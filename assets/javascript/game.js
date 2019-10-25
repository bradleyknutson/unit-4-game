var starWars = {
    chosenPlayer: false,
    chosenEnemy: false,
    fighters: {
        jarJarBinks: {
            health: 825,
            baseHealth: 825,
            attack: 3,
            baseAttack: 3,
            counterAttack: 10,
        },
        generalKenobi: {
            health: 600,
            baseHealth: 600,
            attack: 6,
            baseAttack: 6,
            counterAttack: 17
        },
        anakin: {
            health: 400,
            baseHealth: 400,
            attack: 12,
            baseAttack: 12,
            counterAttack: 25
        },
        grievous: {
            health: 550,
            baseHealth: 550,
            attack: 7,
            baseAttack: 7,
            counterAttack: 15
        },
        palpatine: {
            health: 325,
            baseHealth: 325,
            attack: 15,
            baseAttack: 15,
            counterAttack: 35
        },
        darthMaul: {
            health: 500,
            baseHealth: 500,
            attack: 8,
            baseAttack: 8,
            counterAttack: 20
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
        if(starWars.chosenPlayer){
            $(".fighterDiv[value=" + this.chosenPlayer + "]").css('visibility', 'hidden');
            $('#fighterImage').attr('src', 'assets/images/' + this.chosenPlayer + '.png');
            $('#playerHealth').text(this.fighters[this.chosenPlayer].health);
        }else{
            $('#chosenFighter').css('visibility', 'hidden');
        }
        if(starWars.chosenEnemy){
            $('.fighterDiv[value=' + this.chosenEnemy + ']').css('visibility', 'hidden');
            $('#enemyImage').attr('src', 'assets/images/' + this.chosenEnemy + '.png');
            $('#enemyHealth').text(this.fighters[this.chosenEnemy].health);
        }else{
            $('#chosenEnemy').css('visibility', 'hidden');
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
                starWars.chosenEnemy = $(this).attr('value');
                $('.fighter').unbind();
                starWars.updatePage();
                $('#chosenEnemy').css('visibility', 'visible');
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
