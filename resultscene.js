import * as pg from "./pygame.js";

export class ResultScene { //【結果画面】
    constructor(game) {
        const font = new pg.font.Font(null, 50)
        // プロパティ：どんなデータを持つのか？
        this._game = game
        this._msg = font.render("Press SPACE to replay.", true, new pg.Color("WHITE"))
        this._gameover = pg.image.load("images/gameover.png")
        this._gameclear = pg.image.load("images/gameclear.png")
    }

    // メソッド：どんな処理をするのか？
    update() { // 更新処理
        const key = pg.key.get_pressed()
        if (key[pg.K_SPACE]) {
            this._game.reset()
        }
    }

    draw(screen) { // 描画処理
        screen.blit(this._msg, [120, 380])
        if (!this._game.is_playing) {
            if (this._game.is_cleared) {
                screen.blit(this._gameclear, [50, 200])
            } else {
                screen.blit(this._gameover, [50, 200])
            }
        }
    }
};
