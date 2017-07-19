/*************** 游戏开始 ***************/
class Game {
  constructor() {
    // 初始化引擎，设置游戏设计宽高
    Laya.init(webgm.config.width, webgm.config.height, Laya.WebGL);

    // 设置适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
    // 设置剧中对齐
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
    // 设置垂直对齐
    Laya.stage.alignV = Laya.Stage.ALIGN_TOP;
    // 设置横竖屏
    Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
    // 设置舞台颜色
    Laya.stage.bgColor = '#000';
    // 显示FPS
    Stat.show(0, 100);

    // 创建静态资源对应版本号集合
    let version = {};

    webgm.asset.map((obj) => {
      if (Array.isArray(obj.url)) {
        obj.url.map((elem) => {
          version[elem] = GM.staticVersion;
        });
      } else {
        version[obj.url] = GM.staticVersion;
      }
    });

    // CDN地址
    Laya.URL.basePath = '';
    // 版本号
    Laya.URL.version = version;

    this.init();
  }

  // 初始化
  init() {
    // 加载页面
    webgm.scene.loading = new Loading(() => {
      // 雪碧图 - 三角形
      webgm.trangle = new SpriteFrames({
        jsonUrl: IMG_PATH + 'trangle.json',
        imageUrl: IMG_PATH + 'trangle.png'
      });
      // 雪碧图 - 主界面
      webgm.roomSprite = new SpriteFrames({
        jsonUrl: IMG_PATH + 'room.json',
        imageUrl: IMG_PATH + 'room.png'
      });
      webgm.scene.room = new Room();
    });
  }
}

//启动游戏
new Game();