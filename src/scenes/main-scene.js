import Phaser from 'phaser'

import { TSIZE } from '../utils/constants'
import Character from '../prefabs/character'

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'main' })
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
