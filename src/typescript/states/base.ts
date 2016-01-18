class BaseState extends Phaser.State {

    game: MyGame;

    constructor(game: MyGame) {
        super();
        this.game = game;
    }

    preload() {
        this.game.load.image('background', 'images/background.png');
        this.game.load.image('menu', 'images/menu.png');
        this.game.load.image('spike', 'images/spike.png');
        this.game.load.spritesheet('bird', 'images/bird.png', 36.2, 31);
    }

}