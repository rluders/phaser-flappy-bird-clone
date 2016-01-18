class MenuState extends BaseState {

    private _text: Phaser.Text;
    private _timer: any = 0;

    create() {
        this.game.stage.backgroundColor = '#104455';
        this.game.add.button(0, 0, 'menu', this.startGame, this);

        this._text = this.add.text(
            this.world.centerX,
            this.world.height - 200,
            "TOUCH TO\nSTART GAME",
            {
                size: "32px",
                fill: "#FFF",
                align: "center"
            }

        );
        this._text.anchor.setTo(0.5, 0.5);
    }

    update() {
        this._timer += this.game.time.elapsed;
        if (this._timer >= 1400) {
            this._timer = 0;
            this._text.visible = !this._text.visible;
        }
    }

    private startGame() {
        this.game.state.start('Game');
    }

}