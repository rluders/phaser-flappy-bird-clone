class BaseSprite extends Phaser.Sprite {
    game: MyGame;
}

class Wall extends BaseSprite {

    public scored: boolean = false;

    constructor(game, x, y, key, frame = null) {
        super(game, x, y, key, frame);
    }

    start(flipped: boolean = false) {
        this.body.allowGravity = false;
        this.scored = false;
        this.body.immovable = true;
        this.body.velocity.x = -this.game.speed;
        if (flipped) {
            this.scale.y = -1;
            this.body.offset.y = -this.body.height;
        }
    }

}

class Player extends BaseSprite {

    constructor(game, x, y, key, frame = null) {
        super(game, x, y, key, frame);
        this.animations.add('fly', [0, 1, 2, 3], 10, true);
    }

    start() {
        this.body.collideWorldBounds = true;
        this.body.allowGravity = true;
        this.animations.play('fly');

        this.game.input.onDown.add(this.boost, this);
    }

    public boost() {
        this.body.velocity.y = -420;
    }

}

class WallSpawner {

    private _spawnRate: any = 1.25;

    public game: MyGame;
    public walls: Phaser.Group;

    constructor(state: BaseState) {
        this.game = state.game;
        this.walls = state.add.group();
    }

    public start() {
        this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.spawnWalls, this);
    }

    update() {
        this.walls.forEachAlive(function (wall) {
            if (wall.x + wall.width < this.game.world.bounds.left) {
                wall.kill();
            } else if (!wall.scored && wall.x <= this._player.x) {
                this.game.score += wall.score;
            }
        });
    }

    public createWall(y: any, flipped: boolean = false) {
        var wall = new Wall(
            this.game,
            this.game.width,
            y + (flipped ? -200 : 200) / 2,
            'spike'
        );
        this.game.physics.arcade.enableBody(wall);
        wall.start(flipped);
        this.game.world.add(wall);
    }

    public spawnWalls() {
        var height = this.game.height,
              posY = this.game.rnd.integerInRange(height * .3, height * .7);

        this.createWall(posY);
        this.createWall(posY, true);
    }

}

class GameState extends BaseState {

    private _background: Phaser.TileSprite;
    private _wallSpawner: WallSpawner;
    private _player: Player;

    create() {
        this._background = this.add.tileSprite(
            0,
            0,
            this.world.width,
            this.world.height,
            "background"
        );

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 900;

        this.startGame();
    }

    update() {
        this._wallSpawner.update();

        this.physics.arcade.collide(this._player, this._wallSpawner.walls, this.gameOver, null, this);
    }

    public startGame() {
        this._player = this.world.add(new Player(
            this.game,
            this.world.width / 4,
            this.world.centerY, 'bird'
        ));
        this.physics.arcade.enableBody(this._player);
        this._player.start();

        this._background.autoScroll(-this.game.speed * .80, 0);
        this.game.score = 0;

        this._wallSpawner = new WallSpawner(this, this.game.time);
        this._wallSpawner.start();
    }

    public gameOver() {
        console.log('Game Over');
        this._background.autoScroll(0, 0);
        this._player.body.velocity.x = 0;
    }

}