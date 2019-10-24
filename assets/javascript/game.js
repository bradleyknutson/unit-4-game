var starWars = {
    chosenPlayer: '',
    chosenEnemy: '',
    fighters: {
        jarJarBinks: {
            health: 10000,
            attack: 5,
            baseAttack: 5,
            counterAttack: 20,
        },
        generalKenobi: {
            health: 150,
            attack: 10,
            baseAttack: 10,
            counterAttack: 30
        },
        anakin: {
            health: 200,
            attack: 7,
            baseAttack: 7,
            counterAttack: 25
        },
        grievous: {
            health: 300,
            attack: 3,
            baseAttack: 3,
            counterAttack: 15
        },
        palpatine: {
            health: 200,
            attack: 10,
            baseAttack: 10,
            counterAttack: 20
        },
        darthMaul: {
            health: 125,
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
        $('#jarJarHealth').text(this.fighters.jarJarBinks.health);
        $('#anakinHealth').text(this.fighters.anakin.health);
        $('#kenobiHealth').text(this.fighters.generalKenobi.health);
        $('#grievousHealth').text(this.fighters.grievous.health);
        $('#palpatineHealth').text(this.fighters.palpatine.health);
        $('#darthMaulHealth').text(this.fighters.darthMaul.health);
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
        if(starWars.chosenPlayer === ''){
            $('.fighter').on('click', function(){
                starWars.chosenPlayer = $(this).attr('value');
                $('.fighter').unbind();
                starWars.updatePage();
                $('#chosenFighter').css('visibility', 'visible');
                starWars.chooseFighter();
            });
        }else{
            $('.fighter').on('click', function(){
                if($(this).attr('value') !== starWars.chosenPlayer){
                    starWars.chosenEnemy = $(this).attr('value');
                    $('.fighter').unbind();
                    starWars.updatePage();
                    $('#chosenEnemy').css('visibility', 'visible');
                }
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
        this.chosenEnemy = '';
        $('#chosenEnemy').css('visibility', 'hidden');
        Object.keys(this.fighters).forEach(element => {
            if(this.fighters[element].health <= 0){
                numKilled++;
            }
        });
        if(numKilled === Object.keys(this.fighters).length - 1){
            this.gameWon();
        }
        this.chooseFighter();
        
    },
    gameLost: function(){
        console.log("You've lost");
    },
    gameWon: function(){
        console.log("You've won");
    }
}


starWars.gameStart();
