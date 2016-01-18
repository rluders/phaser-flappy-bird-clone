var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IntroState = (function (_super) {
    __extends(IntroState, _super);
    function IntroState() {
        _super.apply(this, arguments);
    }
    IntroState.prototype.create = function () {
        this._stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);
        this._stateTransition.configure({
            duration: Phaser.Timer.SECOND * 2,
            ease: Phaser.Easing.Exponential.InOut,
            properties: {
                alpha: 0,
                scale: {
                    x: 1.6,
                    y: 1.6
                }
            }
        });
        this.game.stage.backgroundColor = '#104455';
        this.game.add.sprite(0, 0, 'intro');
        this._stateTransition.to('Menu', true, false);
    };
    return IntroState;
})(BaseState);
