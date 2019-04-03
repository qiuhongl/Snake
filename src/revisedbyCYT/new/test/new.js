var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');

var background;
var snake;
var spacekey;
var speed;

var main={
    preload: function () {
        game.load.image('snake', 'asserts/snake.png');
        game.load.image('background','asserts/tile.png');
    },

    create:function () {
        var wid=800;
        var hei=600;
        this.game.world.setBounds(-wid, -hei, wid*2, hei*2);
        background = game.add.tileSprite(-wid, -hei,
            800*2, 600*2, 'background');

            snake= game.add.sprite(game.world.centerX,game.world.centerY+200,'snake');
            game.physics.enable(snake,Phaser.Physics.ARCADE);

            game.camera.follow(snake)
            spacekey=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    },
    update: function(){
        if (spacekey.isDown){
            speed=400;
            if (game.input.mousePointer.isDown){
                game.physics.arcade.moveToPointer(snake, speed);
            }
            else{
                snake.body.velocity.setTo(0,0);
            }
        }
        else{
            speed=200
            if (game.input.mousePointer.isDown){
                game.physics.arcade.moveToPointer(snake, speed);
            }
            else{
                snake.body.velocity.setTo(0,0);
            }
        }

},
}
game.state.add('game',main)
game.state.start('game')

