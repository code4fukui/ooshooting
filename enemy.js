import * as pg from "./pygame.js";
import * as random from "./random.js";

export class Enemy { //【敵】
    constructor() {
        const x = random.randint(100, 500)
        const y = -100
        // プロパティ：どんなデータを持つのか？
        this._image = pg.image.load("images/enemy1.png")
        this._rect = new pg.Rect(x, y, 50, 50)
        this._vx = random.uniform(-4, 4)
        this._vy = random.uniform(1, 4)
        this._maxhp = 100
        this._hp = 100
        this._is_alive = true
    }

    get rect() {
        return this._rect;
    }
    get is_alive() {
        return this._is_alive;
    }
    get hp() {
        return this._hp;
    }
    set hp(n) {
        this._hp = n;
    }

    update() { // 更新処理
        if (this._rect.x < 0 || this._rect.x > 550) {
            this._vx = -this._vx
        }
        this._rect.x += this._vx
        this._rect.y += this._vy
        if (this._rect.y > 650) {
            this._is_alive = false
        }
    }

    draw(screen) { // 描画処理
        screen.blit(this._image, this._rect)
        // hpbar
        const rect1 = new pg.Rect(this._rect.x, this._rect.y - 20, 4, 20)
        const h = (this._hp / this._maxhp) * 20
        const rect2 = new pg.Rect(this._rect.x, this._rect.y - h, 4, h)
        pg.draw.rect(screen, new pg.Color("RED"), rect1)
        pg.draw.rect(screen, new pg.Color("GREEN"), rect2)
    }
};

export class FlameEnemy extends Enemy { //【炎の敵】
    constructor() {
        super();
        // プロパティ：どんなデータを持つのか？
        this._image = pg.image.load("images/enemy2.png")
        this._vx = random.uniform(-2, 2)
        this._vy = random.uniform(5, 7)
    }
};

export class IceEnemy extends Enemy { //【氷の敵】
    constructor() {
        super();
        // プロパティ：どんなデータを持つのか？
        this._image = pg.image.load("images/enemy3.png")
        this._maxhp = 150
        this._hp = 150
    }
};

export class BombEffect { //【爆発エフェクト】
    constructor(rect, effects) {
        // プロパティ：どんなデータを持つのか？
        this._images = [
            pg.image.load("images/bomb_0.png"),
            pg.image.load("images/bomb_1.png"),
            pg.image.load("images/bomb_2.png"),
            pg.image.load("images/bomb_3.png"),
            pg.image.load("images/bomb_4.png"),
            pg.image.load("images/bomb_5.png")
        ]
        this._image = this._images[0]
        this._effects = effects
        this._rect = rect
        this._cnt = 0
    }

    // メソッド：どんな処理をするのか？
    update() { // 更新処理
        this._cnt += 1
        const idx = Math.floor(this._cnt / 5)
        if (idx <= 5) {
            this._image = this._images[idx]
        } else {
            this._effects.remove(this)
        }
    }

    draw(screen) { // 描画処理
        screen.blit(this._image, this._rect)
    }
};

export class EnemyFactory { //【敵工場】
    create(etype) { // タイプ指定で作る
        if (etype == "flame") {
            return new FlameEnemy()
        } else if (etype == "ice") {
            return new IceEnemy()
        } else {
            return new Enemy()
        }
    }

    random_create() { // ランダムに作る
        const etype = random.choice(["normal", "flame", "ice"])
        return this.create(etype)
    }
};
