var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MenuState = (function (_super) {
    __extends(MenuState, _super);
    function MenuState() {
        _super.apply(this, arguments);
        this._timer = 0;
    }
    MenuState.prototype.create = function () {
        this.game.stage.backgroundColor = '#104455';
        this.game.add.button(0, 0, 'menu', this.startGame, this);
        this._text = this.add.text(this.world.centerX, this.world.height - 200, "TOUCH TO\nSTART GAME", {
            size: "32px",
            fill: "#FFF",
            align: "center"
        });
        this._text.anchor.setTo(0.5, 0.5);
    };
    MenuState.prototype.update = function () {
        this._timer += this.game.time.elapsed;
        if (this._timer >= 1400) {
            this._timer = 0;
            this._text.visible = !this._text.visible;
        }
    };
    MenuState.prototype.startGame = function () {
        this.game.state.start('Game');
    };
    return MenuState;
})(BaseState);
