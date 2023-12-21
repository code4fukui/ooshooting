// 1.準備
import * as pg from "./pygame.js";
import * as gamecontrol from "./gamecontrol.js";
import * as resultscene from "./resultscene.js";
import { images } from "./images.js";

pg.init(images)
const screen = pg.display.set_mode([600, 650])
pg.display.set_caption("ooshooting")
const game = new gamecontrol.GameManager()
const result = new resultscene.ResultScene(game)

// 2.メインループ
const loop = () => {
//for (;;) {
    // 3.画面の初期化
    screen.fill(new pg.Color("NAVY"))
    // 4.入力チェックや判断処理
    if (game.is_playing) {
        game.update();
    } else {
        result.update();
    }
    // 5.描画処理
    game.draw(screen);
    if (!game.is_playing) {
        result.draw(screen);
    }
    // 6.画面の表示
    pg.display.update();
    //new pg.time.Clock().tick(60);
    // 7.閉じるボタンチェック
    /*
    for (const event of pg.event.get()) {
        if (event.type == pg.QUIT) {
            pg.quit()
            sys.exit()
        }
    }
    */
};
setInterval(loop, 1000 / 60);
