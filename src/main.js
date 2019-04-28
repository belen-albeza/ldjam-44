import Phaser from 'phaser'

import { SCREEN_WIDTH, SCREEN_HEIGHT } from './utils/constants'
import LoaderScene from './scenes/loader-scene'
import TitleScene from './scenes/title-scene'
import MainScene from './scenes/main-scene'
import GameoverScene from './scenes/gameover-scene'
import VictoryScene from './scenes/victory-scene'

const config = {
  type: Phaser.AUTO,
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  scale: {
    min: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    },
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  pixelArt: true, // set to false for non-pixel games
  roundPixels: true,
  zoom: 3, // set to 1 to keep original graphics size
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      // debugShowBody: true,
      // debugShowStaticBody: true
    }
  },
  scene: [LoaderScene, MainScene, GameoverScene, VictoryScene, TitleScene]
}

window.onload = () => {
  // eslint-disable-next-line no-new
  new Phaser.Game(config)
}
