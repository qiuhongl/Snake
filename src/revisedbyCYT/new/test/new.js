

var game = new Phaser.Game(1000, 600, Phaser.CANVAS, 'gameDiv');

var background;
var snake;
var spacekey;
var speed;
var veggies;
var main= {
    preload: function () {
        game.load.image('snake', 'asserts/snake.png');
        game.load.image('background', 'asserts/tile.png');
//        game.load.image('bot','asserts/snake.png');
        game.load.spritesheet('veggies', 'assets/energy.png', 32, 32);
    },

    create: function () {
        background =game.add.tileSprite(0,0,
            1000,600, 'background');


        veggies = game.add.group();
        veggies.enableBody = true;
        veggies.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 100; i++)
        {
            var c = veggies.create(game.world.randomX, Math.random() * 500, 'veggies', game.rnd.integerInRange(0, 36));
            c.name = 'veg' + i;
            c.body.immovable = true;
        }
        snake = game.add.sprite(game.world.centerX, game.world.centerY + 200, 'snake');
        game.physics.enable(snake, Phaser.Physics.ARCADE);

        game.camera.follow(snake)
        spacekey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)


    },
    update: function () {
        game.physics.arcade.overlap(snake, veggies, collisionHandler, null, this);
        if (spacekey.isDown) {
            speed = 400;
            if (game.input.mousePointer.isDown) {
                game.physics.arcade.moveToPointer(snake, speed);
            } else {
                snake.body.velocity.setTo(0, 0);
            }
        } else {
            speed = 200
            if (game.input.mousePointer.isDown) {
                game.physics.arcade.moveToPointer(snake, speed);
            } else {
                snake.body.velocity.setTo(0, 0);
            }
        }

    },
}
function collisionHandler(snake,veg){
    veg.kill();
}


game.state.add('game',main)
game.state.start('game')
