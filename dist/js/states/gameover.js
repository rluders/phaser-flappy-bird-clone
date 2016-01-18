var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameOverState = (function (_super) {
    __extends(GameOverState, _super);
    function GameOverState() {
        _super.apply(this, arguments);
    }
    GameOverState.prototype.create = function () {
        console.log('GameOver');
    };
    return GameOverState;
})(BaseState);
