import Phaser from 'phaser'

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/constants'

// asset paths for loading scren
import IMG_LOADINGBAR from '../assets/images/loading-bar.png'
import FNT_RETROFONT from '../assets/images/retrofont.png'

// asset paths for the game
import IMG_TILESET from '../assets/images/tileset.png'

class LoaderScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'loader',
      pack: {
        files: [
          { type: 'image', key: 'loading-bar', url: IMG_LOADINGBAR },
          { type: 'image', key: 'fnt:retro', url: FNT_RETROFONT }
        ]
      }
    })
  }

  init() {
    this.cameras.main.setBackgroundColor('#171c2a')
  }

  preload() {
    this._addBitmapFont()
    this._createLoadingBar()

    // load images and spritesheets
    this.load.image('tileset', IMG_TILESET)
  }

  create() {
    // loading has finished -> start game
    this.scene.start('main')
  }

  _addBitmapFont() {
    const config = {
      image: 'fnt:retro',
      width: 4,
      height: 6,
      chars: Phaser.GameObjects.RetroFont.TEXT_SET6
    }

    this.cache.bitmapFont.add(
      'retrofont',
      Phaser.GameObjects.RetroFont.Parse(this, config)
    )
  }

  _createLoadingBar() {
    // make bar graphics
    this.add
      .image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'loading-bar')
      .setAlpha(0.2)
    this.bar = this.add
      .image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'loading-bar')
      .setCrop(0, 0, 0, 0)
    // add a loading label
    this.add
      .bitmapText(
        SCREEN_WIDTH / 2 - this.bar.width / 2,
        SCREEN_HEIGHT / 2 - 4,
        'retrofont',
        'LOADING...'
      )
      .setOrigin(0, 1)

    this.load.on('progress', progress => {
      this.bar.setCrop(0, 0, this.bar.width * progress, this.bar.height)
    })
  }
}

export default LoaderScene
