var starWars = {
    chosenPlayer: '',
    chosenEnemy: '',
    fighters: {
        jarJarBinks: {
            health: 250,
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
        }
    },
    gameStart: function(){
        $('#attack').on('click', function(){
            starWars.attack();
            console.log(starWars);
        });
        this.updatePage();
    },
    updatePage: function(){
        $('#jarJarHealth').text(this.fighters.jarJarBinks.health);
        $('#anakinHealth').text(this.fighters.anakin.health);
        $('#kenobiHealth').text(this.fighters.generalKenobi.health);

    },
    chooseFighter: function(){
        if(starWars.chosenPlayer === ''){
            $('.fighter').on('click', function(){
                starWars.chosenPlayer = $(this).attr('value');
                $('.fighter').unbind();
                starWars.chooseFighter();
            });
        }else{
            $('.fighter').on('click', function(){
                if($(this).attr('value') !== starWars.chosenPlayer){
                    starWars.chosenEnemy = $(this).attr('value');
                    $('.fighter').unbind();
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
    gameLost: function(){

    },
    enemyKilled: function(){

    }
}


starWars.gameStart();
starWars.chooseFighter();