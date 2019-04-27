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
    // setup the game world
    this._createLevel()
  }

  update() {
    // update the game world
  }

  _createLevel() {
    // create a new tilemap and attach the tileset to it
    this.map = this.make.tilemap({ key: 'lvl:01' })
    const tiles = this.map.addTilesetImage('tileset', 'img:tileset')
    this.map.createStaticLayer('main', tiles)

    // update camera and world bounds so the whole map fits
    const width = this.map.widthInPixels
    const height = this.map.heightInPixels
    this.cameras.main.setBounds(0, 0, width, height)
    this.physics.world.setBounds(0, 0, width, height)

    // TODO: create collision terrain
  }
}

export default MainScene
