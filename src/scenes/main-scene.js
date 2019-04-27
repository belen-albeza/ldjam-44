import Phaser from 'phaser'

import { TSIZE } from '../utils/constants'
import Character from '../prefabs/character'

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'main' })
  }

  create() {
    // setup keys
    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN
    })

    // setup the game world
    this._createLevel()

    // make the camera follow the main character
    this.cameras.main.startFollow(this.chara)
  }

  update() {
    this._updatePlayerInput()
  }

  _updatePlayerInput() {
    // move main character
    if (this.keys.left.isDown) {
      // move left
      this.chara.move(-1, 0)
    } else if (this.keys.right.isDown) {
      // move right
      this.chara.move(1, 0)
    } else if (this.keys.up.isDown) {
      // move up
      this.chara.move(0, -1)
    } else if (this.keys.down.isDown) {
      // move down
      this.chara.move(0, 1)
    } else {
      // stop
      this.chara.move(0, 0)
    }
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

    // spawn prefabs
    const prefabs = this.map.objects.find(x => x.name === 'prefabs')
    this._createPrefabs(prefabs.objects)
  }

  _createPrefabs(prefabs) {
    // objects from tiled use bottom-left corner as the origin of coordinates,
    // so we need to account for that
    const offsetX = TSIZE / 2
    const offsetY = -TSIZE / 2

    prefabs.forEach(prefab => {
      const x = prefab.x + offsetX
      const y = prefab.y + offsetY

      switch (prefab.type) {
        case 'chara':
          this.chara = new Character(this, x, y)
          break
        default:
          console.warning(`Unknown prefab of type: ${prefab.type}`)
      }
    })
  }
}

export default MainScene
