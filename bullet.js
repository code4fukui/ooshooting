import * as pg from "./pygame.js";

export class Bullet { //【弾】
    constructor(rect) {
        const x = rect.x + 10 // 17
        const y = rect.y - 10
        // プロパティ：どんなデータを持つのか？
        this._image = pg.image.load("images/bullet.png")
        this._rect = this._image.get_rect()
        this._rect.topleft = [x, y]
        this._vy = -8
        this._is_alive = true
    }
    get rect() {
        return this._rect;
    }
    get is_alive() {
        return this._is_alive;
    }
    
    // メソッド：どんな処理をするのか？
    update() { // 更新処理
        this._rect.y += this._vy
        if (this._rect.y < -100) {
            this._is_alive = false;
        }
    }

    draw(screen) { // 描画処理
        screen.blit(this._image, this._rect)
    }
};
