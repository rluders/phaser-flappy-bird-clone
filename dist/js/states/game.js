var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseSprite = (function (_super) {
    __extends(BaseSprite, _super);
    function BaseSprite() {
        _super.apply(this, arguments);
    }
    return BaseSprite;
})(Phaser.Sprite);
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(game, x, y, key, frame) {
        if (frame === void 0) { frame = null; }
        _super.call(this, game, x, y, key, frame);
        this.scored = false;
    }
    Wall.prototype.start = function (flipped) {
        if (flipped === void 0) { flipped = false; }
        this.body.allowGravity = false;
        this.scored = false;
        this.body.immovable = true;
        this.body.velocity.x = -this.game.speed;
        if (flipped) {
            this.scale.y = -1;
            this.body.offset.y = -this.body.height;
        }
    };
    return Wall;
})(BaseSprite);
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(game, x, y, key, frame) {
        if (frame === void 0) { frame = null; }
        _super.call(this, game, x, y, key, frame);
        this.animations.add('fly', [0, 1, 2, 3], 10, true);
    }
    Player.prototype.start = function () {
        this.body.collideWorldBounds = true;
        this.body.allowGravity = true;
        this.animations.play('fly');
        this.game.input.onDown.add(this.boost, this);
    };
    Player.prototype.boost = function () {
        this.body.velocity.y = -420;
    };
    return Player;
})(BaseSprite);
var WallSpawner = (function () {
    function WallSpawner(state) {
        this._spawnRate = 1.25;
        this.game = state.game;
        this.walls = state.add.group();
    }
    WallSpawner.prototype.start = function () {
        this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.spawnWalls, this);
    };
    WallSpawner.prototype.update = function () {
        this.walls.forEachAlive(function (wall) {
            if (wall.x + wall.width < this.game.world.bounds.left) {
                wall.kill();
            }
            else if (!wall.scored && wall.x <= this._player.x) {
                this.game.score += wall.score;
            }
        });
    };
    WallSpawner.prototype.createWall = function (y, flipped) {
        if (flipped === void 0) { flipped = false; }
        var wall = new Wall(this.game, this.game.width, y + (flipped ? -200 : 200) / 2, 'spike');
        this.game.physics.arcade.enableBody(wall);
        wall.start(flipped);
        this.game.world.add(wall);
    };
    WallSpawner.prototype.spawnWalls = function () {
        var height = this.game.height, posY = this.game.rnd.integerInRange(height * .3, height * .7);
        this.createWall(posY);
        this.createWall(posY, true);
    };
    return WallSpawner;
})();
var GameState = (function (_super) {
    __extends(GameState, _super);
    function GameState() {
        _super.apply(this, arguments);
    }
    GameState.prototype.create = function () {
        this._background = this.add.tileSprite(0, 0, this.world.width, this.world.height, "background");
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 900;
        this.startGame();
    };
    GameState.prototype.update = function () {
        this._wallSpawner.update();
        this.physics.arcade.collide(this._player, this._wallSpawner.walls, this.gameOver, null, this);
    };
    GameState.prototype.startGame = function () {
        this._player = this.world.add(new Player(this.game, this.world.width / 4, this.world.centerY, 'bird'));
        this.physics.arcade.enableBody(this._player);
        this._player.start();
        this._background.autoScroll(-this.game.speed * .80, 0);
        this.game.score = 0;
        this._wallSpawner = new WallSpawner(this, this.game.time);
        this._wallSpawner.start();
    };
    GameState.prototype.gameOver = function () {
        console.log('Game Over');
        this._background.autoScroll(0, 0);
        this._player.body.velocity.x = 0;
    };
    return GameState;
})(BaseState);
