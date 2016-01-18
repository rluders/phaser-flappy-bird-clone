class MyGame extends Phaser.Game {

    public score: any = 0;
    public speed: any = 200;

    constructor() {
        super(
            320,
            568,
            Phaser.AUTO,
            'game'
        );

        this.state.add('Menu', new MenuState(this), true);
        this.state.add('Game', new GameState(this));
        this.state.add('GameOver', new GameOverState(this));
    }

    public reset() {
        this.score = 0;
    }

}

window.onload = () => {
    var game = new MyGame();
}