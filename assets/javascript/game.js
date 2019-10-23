var starWars = {
    chosenFighter: '',
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
        if(!starWars.chosenFighter){
            $('.fighter').on('click', function(){
            starWars.chosenFighter = $(this).attr('value');
            })
        }
    }
}

// starWars.gameStart();

