import * as pg from "./pygame.js";
import * as player from "./player.js";
import * as enemy from "./enemy.js";
import * as bullet from "./bullet.js";
import * as status from "./status.js";
import * as sound from "./sound.js";

export class Subject { //【配信者の基本形】
    constructor() {
        // プロパティ：どんなデータを持つのか？
        this._observers = []
    }
        
    // メソッド：どんな処理をするのか？
    attach(observer) { // 受信者の追加
        this._observers.append(observer)
    }

    notify(ntype) { // 通知
        for (const observer of this._observers) {
            observer.update(ntype)
        }
    }
};

export class GameManager extends Subject { //【ゲーム管理】
    constructor() {
        super();
        // プロパティ：どんなデータを持つのか？
        this._player = new player.Player()
        this._enemies = []
        this._effects = []
        this._bullets = []
        this._factory = new enemy.EnemyFactory()
        this._status = new status.Status()
        this.attach(this._status)
        //this.reset()
    }

    // メソッド：どんな処理をするのか？
    reset() { // ゲームのリセット
        this._is_playing = true
        this._is_cleared = false
        this._player.reset()
        this._enemies.clear()
        this._spawn_count = 0
        this._bullets.clear()
        this._bullet_count = 0
        this._status.reset()
        sound.SoundManager.get_instance().bgmstart()
    }
    
    get is_playing() {
        return this._is_playing;
    }
    get is_cleared() {
        return this._is_cleared;
    }

    update() { // 更新処理
        this.notify("distance")
        this._bullet_count += 1
        if (this._bullet_count > 10) { // 弾発生量
            const key = pg.key.get_pressed()
            if (key[pg.K_a]) { // Aキーで弾発射
                this._bullets.append(new bullet.Bullet(this._player.rect))
                this._bullet_count = 0
            }
        }
        for (const e of this._effects) {
            e.update()
        }
        for (const b of this._bullets) {
            b.update()
        }
        this._player.update()
        this._spawn_count += 1
        if (this._spawn_count > 15) { // 敵発生量
            this._spawn_count = 0
            this._enemies.append(this._factory.random_create())
        }
        for (const e of this._enemies) {
            for (const b of this._bullets) {
                if (e.rect.colliderect(b.rect)) {
                    sound.SoundManager.get_instance().playattack()
                    this._bullets.remove(b)
                    e.hp -= 50
                    if (e.hp <= 0) {
                        this.notify("score")
                        const b = new enemy.BombEffect(e.rect, this._effects)
                        sound.SoundManager.get_instance().playblast()
                        this._effects.append(b)
                        this._enemies.remove(e)
                        if (this._status.score == 30) { // クリア条件
                            this._is_playing = false
                            this._is_cleared = true
                            sound.SoundManager.get_instance().bgmstop()
                            sound.SoundManager.get_instance().playclear()
                        }
                    }
                }
            }
            if (!e.is_alive) {
                this._enemies.remove(e)
                break
            }
            e.update()
            // 敵が下に落ちたら消える
            if (e.rect.y >= 650) {
                this._enemies.remove(e)
            }
            // 敵と主人公が衝突したらダメージ
            if (this._enemies.includes(e)) {
                if (e.rect.colliderect(this._player.rect)) {
                    sound.SoundManager.get_instance().playbomb()
                    this._enemies.remove(e)
                    this._player.damage()
                    this._player.hp -= 50
                    if (this._player.hp <= 0) {
                        this._is_playing = false
                        sound.SoundManager.get_instance().bgmstop()
                        sound.SoundManager.get_instance().playover()
                    }
                }
            }
        }
    }

    draw(screen) { // 描画処理
        for (const b of this._bullets) {
            b.draw(screen)
        }
        for (const e of this._effects) {
            e.draw(screen)
        }
        this._player.draw(screen)
        for (const e of this._enemies) {
            e.draw(screen)
        }
        this._status.draw(screen)
    }
};

