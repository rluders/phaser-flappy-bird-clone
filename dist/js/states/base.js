var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseState = (function (_super) {
    __extends(BaseState, _super);
    function BaseState(game) {
        _super.call(this);
        this.game = game;
    }
    BaseState.prototype.preload = function () {
        this.game.load.image('background', 'images/background.png');
        this.game.load.image('menu', 'images/menu.png');
        this.game.load.image('spike', 'images/spike.png');
        this.game.load.spritesheet('bird', 'images/bird.png', 36.2, 31);
    };
    return BaseState;
})(Phaser.State);
