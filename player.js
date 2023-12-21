import * as pg from "./pygame.js";

export class PlayerState { //【状態の基本形】
    constructor(player) {
        // プロパティ：どんなデータを持つのか？
        this._player = player
        this._image = null
    }

    get image() {
        return this._image;
    }

    update() { // 更新処理
    }
};


export class IdleState extends PlayerState { //【待機状態】
    constructor(player) {
        super(player);
        // プロパティ：どんなデータを持つのか？
        this._image = pg.image.load("images/kaeru1.png")
    }

    // メソッド：どんな処理をするのか？
    update() { // 更新処理
        const key = pg.key.get_pressed()
        if (key[pg.K_LEFT] || key[pg.K_RIGHT]) {
            return new MovingState(this._player);
        } else {
            return this
        }
    }
};

export class MovingState extends PlayerState { //【移動状態】
    constructor(player) {
        super(player);
        // プロパティ：どんなデータを持つのか？
        this._images = [
            pg.image.load("images/kaeru1.png"),
            pg.image.load("images/kaeru2.png"),
            pg.image.load("images/kaeru3.png"),
            pg.image.load("images/kaeru4.png")
        ]
        this._cnt = 0
        this._image = this._images[0]
    }

    // メソッド：どんな処理をするのか？
    update() { // 更新処理
        this._cnt += 1
        this._image = this._images[Math.floor(this._cnt / 5) % 4]
        const key = pg.key.get_pressed()
        if (!(key[pg.K_LEFT] || key[pg.K_RIGHT])) {
            return new IdleState(this._player)
        } else {
            return this
        }
    }
};

export class DamageState extends PlayerState { //【ダメージ状態】
    constructor(player) {
        super(player);
        // プロパティ：どんなデータを持つのか？
        this._images = [
            pg.image.load("images/kaeru5.png"),
            pg.image.load("images/kaeru6.png")
        ]        
        this._cnt = 0
        this._image = this._images[0]
        this._timeout = 20
    }

    // メソッド：どんな処理をするのか？
    update() { // 更新処理
        this._cnt += 1
        this._image = this._images[Math.floor(this._cnt / 5) % 2]
        // タイムアウトチェック
        this._timeout -= 1
        if (this._timeout < 0) {
            return new IdleState(this._player)
        } else {
            return this;
        }
    }
};

export class Player { //【主人公】
    constructor() {
        // プロパティ：どんなデータを持つのか？
        this.reset()
    }

    get rect() {
        return this._rect;
    }
    get hp() {
        return this._hp;
    }
    set hp(n) {
        this._hp = n;
    }
    
    // メソッド：どんな処理をするのか？
    reset() { // このキャラのリセット
        this._state = new IdleState(this)
        this._rect = new pg.Rect(250, 550, 50, 50)
        this._speed = 10
        this._maxhp = 150
        this._hp = 150
    }


    update() { // 更新処理
        this._state = this._state.update()
        const key = pg.key.get_pressed()
        let vx = 0
        if (key[pg.K_RIGHT]) {
            vx = this._speed
        }
        if (key[pg.K_LEFT]) {
            vx = -this._speed
        }
        if (this._rect.x + vx < 0 || this._rect.x + vx > 550) {
            vx = 0
        }
        this._rect.x += vx
    }

    draw(screen) { // 描画処理
        screen.blit(this._state.image, this._rect)
        // hpbar
        const rect1 = new pg.Rect(this._rect.x, this._rect.y - 20, 4, 20)
        const h = (this._hp / this._maxhp) * 20
        const rect2 = new pg.Rect(this._rect.x, this._rect.y - h, 4, h)
        pg.draw.rect(screen, new pg.Color("RED"), rect1)
        pg.draw.rect(screen, new pg.Color("GREEN"), rect2)
    }

    damage() { // ダメージ化
        this._state = new DamageState(this);
    }
};
