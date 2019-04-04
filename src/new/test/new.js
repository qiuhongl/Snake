

var game = new Phaser.Game(1500, 700, Phaser.CANVAS, 'gameDiv');

var background;
var snake;
var spacekey;
var speed;
var veggies;
var length=0;
var lengthtext;
var button;
var bot;
var bot1;
var bot2;
var botlength = 0;
var bot1length=0;
var bot2length=0;
var playerkilled=0;
var Elimination;
var main= {
    preload: function () {
        game.load.image('snake', 'asserts/snake.png');
        game.load.image('background', 'asserts/tilesprite.jpg');
//        game.load.image('bot','asserts/snake.png');
        game.load.spritesheet('veggies', 'asserts/energy.png',32,32);
    },

    create: function () {
        background =game.add.tileSprite(0,0,
            1500,700, 'background');


        veggies = game.add.group();
        veggies.enableBody = true;
        veggies.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 130; i++)
        {
            var c = veggies.create(game.world.randomX, Math.random() * 600, 'veggies', game.rnd.integerInRange(0, 36));
            c.name = 'veg' + i;
            c.body.immovable = true;
        }
        snake = game.add.sprite(game.world.centerX, game.world.centerY + 200, 'snake');
        bot = game.add.sprite(game.world.centerX-100, game.world.centerY-250 , 'snake');
        game.physics.enable(bot, Phaser.Physics.ARCADE);
        bot.body.collideWorldBounds =true;
        bot.body.bounce.set(1);
        bot.body.gravity.y=100;
        bot.body.velocity.set(100);
        bot1 = game.add.sprite(game.world.centerX, game.world.centerY , 'snake');
        game.physics.enable(bot1, Phaser.Physics.ARCADE);
        bot1.body.collideWorldBounds =true;
        bot1.body.bounce.set(1);
        bot1.body.gravity.set(0,180);
        bot1.body.velocity.setTo(100,100);
        bot2 = game.add.sprite(game.world.centerX-200, game.world.centerY-200 , 'snake');
        game.physics.enable(bot2, Phaser.Physics.ARCADE);
        bot2.body.collideWorldBounds =true;
        bot2.body.bounce.set(1);
        bot2.body.gravity.x= 100;
        bot2.body.velocity.setTo(100,100);
        game.physics.enable(snake, Phaser.Physics.ARCADE);
        lengthtext=game.add.text(1300,650,'length:',{font:'22px Arial',});
        Elimination=game.add.text(100,650,'Eliminate:',{font:'22px Arial'});

        game.camera.follow(snake);
        spacekey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    },
    update: function () {
        game.physics.arcade.overlap(snake, veggies, collisionHandler, null, this);
        game.physics.arcade.overlap(snake,  bot, collisionHandler1, null, this);
        game.physics.arcade.overlap(bot,  veggies, collisionHandlerbot, null, this);
        game.physics.arcade.overlap(snake,  bot1, collisionHandler2, null, this);
        game.physics.arcade.overlap(bot1,  veggies, collisionHandlerbot1, null, this);
        game.physics.arcade.overlap(snake,  bot2, collisionHandler3, null, this);
        game.physics.arcade.overlap(bot2,  veggies, collisionHandlerbot2, null, this);
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
        lengthtext.text ='length:'+length;
        Elimination.text='Eliminate:'+playerkilled
    },
}
function collisionHandler(snake,veg){
    veg.kill();
    length +=1;
}
function collisionHandler1(snake,bot){
    bot.kill();
    playerkilled +=1;
    length +=botlength;
}
function collisionHandlerbot(bot,veg){
    veg.kill();
    botlength+=1;
}
function collisionHandler2(snake,bot1){
    bot1.kill();
    playerkilled +=1;
    length +=bot1length
}
function collisionHandlerbot1(bot1,veg){
    veg.kill();
    bot1length+=1;
}
function collisionHandler3(snake,bot2){
    bot2.kill();
    playerkilled +=1;
    length +=bot2length
}
function collisionHandlerbot2(bot2,veg){
    veg.kill();
    bot2length+=1;
}

setTimeout(function(){

    var snakeDict = {"Player1":length,"Bot1":botlength,"Bot2":bot1length,"Bot3":bot2length}
    var max = "";
    var score = 0;
    for (var key in snakeDict) {
        if (snakeDict[key] >= score) {
            score = snakeDict[key];
            max = key
        }
    }
    max

    alert(max + " won this round!")


}, 30000);

// function rank(snake){
//     var score = 0;
//     var winner = "";
//     for (var i in input){
//         if (input[i] >= score){
//             score = input[i];
//             winner = i
//         }
//     }
//     return winner
// }
function render(){
    game.debug.body(bot);
    game.debug.body(bot1);
}

game.state.add('game',main)
game.state.start('game')
