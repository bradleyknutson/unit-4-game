var starWars = {
    chosenPlayer: '',
    chosenEnemy: '',
    fighters: {
        jarJarBinks: {
            health: 250,
            attack: 10,
            counterAttack: 20,
        },
        generalKenobi: {
            health: 150,
            attack: 15,
            counterAttack: 30
        },
        anakin: {
            health: 200,
            attack: 12,
            counterAttack: 25
        }
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
    }
}


starWars.chooseFighter();