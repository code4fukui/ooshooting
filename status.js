import * as pg from "./pygame.js";

export class Observer { //【受信者の基本形】
    // メソッド：どんな処理をするのか？
    update(ntype) {
    }
};

export class Status extends Observer { //【情報表示】
    constructor() {
        super()
        // プロパティ：どんなデータを持つのか？
        this.reset()
        this._board = new pg.Surface([800, 36], pg.SRCALPHA)
    }

    // メソッド：どんな処理をするのか？
    reset() { // 表示データのリセット
        this._font = new pg.font.Font(null, 32)
        this._distance = 0
        this._score = 0
    }

    get score() {
        return this._score;
    }
    set score(n) {
        this._score = n;
    }

    update(ntype) { // 更新処理
        if (ntype == "distance") {
            this._distance += 2
        }
        if (ntype == "score") {
            this._score += 1
        }
    }

    draw(screen) { // 描画処理
        pg.draw.rect(this._board, [0, 0, 0, 128], new pg.Rect(0, 0, 800, 36))
        screen.blit(this._board, [0, 0])
        const info1 = this._font.render(`DISTANCE : ${this._distance}`, true, new pg.Color("WHITE"))
        const info2 = this._font.render(`SCORE : ${this._score}`, true, new pg.Color("WHITE"))
        screen.blit(info1, [20, 10])
        screen.blit(info2, [450, 10])
    }
};
