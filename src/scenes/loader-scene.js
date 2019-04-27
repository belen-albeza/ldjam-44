import Phaser from 'phaser'

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/constants'

// asset paths for loading scren
import IMG_LOADINGBAR from '../assets/images/loading-bar.png'
import FNT_RETROFONT from '../assets/images/retrofont.png'

// asset paths for the game
import IMG_TILESET from '../assets/images/tileset.png'
import IMG_CHARA from '../assets/images/chara.png'
import IMG_MELEE from '../assets/images/chara-melee-attack.png'
import LVL_01 from '../assets/levels/level_tmp.json'

class LoaderScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'loader',
      pack: {
        files: [
          { type: 'image', key: 'img:loading-bar', url: IMG_LOADINGBAR },
          { type: 'image', key: 'img:retro', url: FNT_RETROFONT }
        ]
      }
    })
  }

  init() {
    this.cameras.main.setBackgroundColor('#15171e')
  }

  preload() {
    this._addBitmapFont()
    this._createLoadingBar()

    // load images and spritesheets
    this.load.image('img:tileset', IMG_TILESET)
    this.load.image('img:chara', IMG_CHARA)
    this.load.spritesheet('img:melee', IMG_MELEE, {
      frameWidth: 16,
      frameHeight: 16
    })

    // load levels
    this.load.tilemapTiledJSON('lvl:01', LVL_01)
  }

  create() {
    // loading has finished -> start game
    this.scene.start('main')
  }

  _addBitmapFont() {
    const config = {
      image: 'img:retro',
      width: 4,
      height: 6,
      chars: Phaser.GameObjects.RetroFont.TEXT_SET6
    }

    this.cache.bitmapFont.add(
      'fnt:retro',
      Phaser.GameObjects.RetroFont.Parse(this, config)
    )
  }

  _createLoadingBar() {
    // make bar graphics
    this.add
      .image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'img:loading-bar')
      .setAlpha(0.2)
    this.bar = this.add
      .image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'img:loading-bar')
      .setCrop(0, 0, 0, 0)
    // add a loading label
    this.add
      .bitmapText(
        SCREEN_WIDTH / 2 - this.bar.width / 2,
        SCREEN_HEIGHT / 2 - 4,
        'fnt:retro',
        'LOADING...'
      )
      .setOrigin(0, 1)

    this.load.on('progress', progress => {
      this.bar.setCrop(0, 0, this.bar.width * progress, this.bar.height)
    })
  }
}

export default LoaderScene
