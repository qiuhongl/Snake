Game =function(game){}
var background;var score; var stops;var snake;var keys;
Game.prototype={
    preload:function() {
        this.game.load.image('background','assert/tilesprites.png');
        this.game.load.image('snake','assert/snake.png');
        this.game.load.image('energy','assert/energy.jpg');
        this.game.load.image('button','assert/button.png')
    },
    create: function(){
        this.game.world.setBounds(this.game.world.width, this.game.world.height, this.game.world.width*3, this.game.world.height*4);
        background = this.game.add.tileSprite(0,0,
            this.game.world.width,this.game.world.height, 'background');
        for (var i =0; i<300;i++){
            var randomx=Math.floor(Math.random()*this.game.width*3);
            var randomy=Math.floor(Math.random()*this.game.height*3);
            var image=this.game.add.sprite(randomx,randomy, 'energy');image=image.scale.setTo(0.03,0.03);
        }
        snake =this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'snake');
        snake.angle = 0

        score =this.game.add.text('864','16','score: 0', { fontSize: '32px', fill: '#000' });
//        stops =this.game.add.button(this.game.world.centerX+115,this.game.world.centerY+200,'button',actionOnClick,this.game,2,1,0);
//        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.camera.follow(snake);
        this.game.physics.enable(snake, Phaser.Physics.ARCADE);
        keys =  this.input.keyboard.createCursorKeys();
        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    },
    update: function(){
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
//        background.position.y+=0.1
        if (this.game.input.mousePointer.isDown){
            this.game.physics.arcade.moveToPointer(snake, 400);
        }
        else {
            snake.body.velocity.setTo(0,0)
        }
        if (keys.left.isDown) {
            snake.body.setVelocityX(-200);
        } 
        else if (keys.right.isDown) {
            snake.body.setVelocityX(200);
        }
        if (keys.up.isDown) {
            snake.body.setVelocityY(-200);
        } 
        else if (keys.down.isDown) {
            snake.body.setVelocityY(200);
        }
        snake.body.velocity.normalize().scale(200);
        if (keys.left.isDown) {
            snake.angle = 180;
        } 
        else if (keys.right.isDown) {
            snake.angle = 0;
        } 
        else if (keys.up.isDown) {
            snake.angle = 270;
        } 
        else if (keys.down.isDown) {
            snake.angle = 90;
        }
    }
}
