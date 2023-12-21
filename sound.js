import * as pg from "./pygame.js";
import * as random from "./random.js";

export class SoundManager { //【サウンドマネージャ】
    static _instance = null

    static get_instance() { // 1つだけのインスタンスを取得
        if (!this._instance) {
            this._instance = new SoundManager();
        }
        return this._instance
    }

    constructor() {
        pg.mixer.music.load("sounds/bgm.wav")
        // プロパティ：どんなデータを持つのか？
        this._over = new pg.mixer.Sound("sounds/over.wav")
        this._clear = new pg.mixer.Sound("sounds/clear.wav")
        this._clap1 = new pg.mixer.Sound("sounds/clap1.wav")
        //this._clap2 = new pg.mixer.Sound("sounds/clap2.wav")
        //this._clap3 = new pg.mixer.Sound("sounds/clap3.wav")
        this._blast = new pg.mixer.Sound("sounds/blast.wav")
        this._bomb = new pg.mixer.Sound("sounds/bomb.wav")
    }

    // メソッド：どんな処理をするのか？
    bgmstart() { // BGM再生
        pg.mixer.music.play(-1)
    }
    
    bgmstop() { // BGM停止
        pg.mixer.music.stop()
    }

    playover() { // ゲームオーバー音
        this._over.play()
    }

    playclear() { // ゲームクリア音
        this._clear.play()
    }

    playattack() { // 敵破壊音
        this._clap1.play()
        /*
        const r = random.randint(0, 3)
        if (r == 0) {
            this._clap1.play()
        } else if (r == 1) {
            this._clap2.play()
        } else {
            this._clap3.play()
        }
        */
    }

    playblast() { // 攻撃音
        this._blast.play()
    }

    playbomb() { // 自機爆発音
        this._bomb.play()
    }
};

