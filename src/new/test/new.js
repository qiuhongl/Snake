

var game = new Phaser.Game(1500, 700, Phaser.CANVAS, 'gameDiv');

var background;
var snake;
var spacekey;
var speed;
var veggies;
var length=0;
var lengthtext;
//
var bot;
//
var main= {
    preload: function () {
        game.load.image('snake', 'asserts/snake.png');
        game.load.image('background', 'asserts/tile.png');
        //
        game.load.image('bot','asserts/snake.png');
        //
        game.load.spritesheet('veggies', 'asserts/energy.png',32,32);
    },

    create: function () {
        background =game.add.tileSprite(0,0,
            1500,700, 'background');


        veggies = game.add.group();
        veggies.enableBody = true;
        veggies.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 50; i++)
        {
            var c = veggies.create(game.world.randomX, Math.random() * 600, 'veggies', game.rnd.integerInRange(0, 36));
            c.name = 'veg' + i;
            c.body.immovable = true;
        }
        snake = game.add.sprite(game.world.centerX, game.world.centerY + 200, 'snake');
        game.physics.enable(snake, Phaser.Physics.ARCADE);
        lengthtext=game.add.text(1300,650,'length:',{font:'24px Arial',});
        //
        bot = game.add.sprite(game.world.centerX, game.world.centerY, 'bot');
        game.physics.enable(bot, Phaser.Physics.ARCADE)
        //
        game.camera.follow(snake)
        spacekey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)


    },
    update: function () {
        game.physics.arcade.overlap(snake, veggies, collisionHandler, null, this);
        game.physics.arcade.overlap(snake, bot, collisionHandler1, null, this)
        if (spacekey.isDown) {
            speed = 400;
            if (game.input.mousePointer.isDown) {
                game.physics.arcade.moveToPointer(snake, speed);
            } else {
                snake.body.velocity.setTo(0, 0);
            }
        } else {
            speed = 200;
            if (game.input.mousePointer.isDown) {
                game.physics.arcade.moveToPointer(snake, speed);
            } else {
                snake.body.velocity.setTo(0, 0);
            }
        }
        lengthtext.text ='length:'+length;
    }
};

function collisionHandler(snake,veg){
    veg.kill();
    length +=1;
}

//
function collisionHandler1(snake,bot){
    bot.kill();
    length +=1;
}

function rank(input){
    var score = 0;
    var winner = "";
    for (var i in input){
        if (input[i] >= score){
            score = input[i];
            winner = i
        }
    }
    return winner
}
//

game.state.add('game',main);
game.state.start('game');

