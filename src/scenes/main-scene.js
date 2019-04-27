import Phaser from 'phaser'

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'main' })
  }

  init() {}

  preload() {
    // load assets here
  }

  create() {
    // set clear color to muted dark blue
    this.cameras.main.setBackgroundColor('#171c2a')

    // setup the game world
    this.add.bitmapText(128, 64, 'retrofont', '(GAME GOES HERE)').setOrigin(0.5)
  }

  update() {
    // update the game world
  }
}

export default MainScene
