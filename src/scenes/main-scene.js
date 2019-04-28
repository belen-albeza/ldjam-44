import Phaser from 'phaser'

import { TSIZE } from '../utils/constants'
import EssenceBar from '../prefabs/essence-bar'
import Character from '../prefabs/character'
import MeleeAttack from '../prefabs/melee-attack'
import WalkingEnemy from '../prefabs/walking-enemy'
import Goal from '../prefabs/goal'

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
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      attack: Phaser.Input.Keyboard.KeyCodes.Z
    })

    // setup sfx
    this.sfx = {
      goal: {
        hit: this.sound.add('sfx:goal')
      },
      chara: {
        hit: this.sound.add('sfx:chara:hit'),
        melee: this.sound.add('sfx:chara:melee')
      },
      enemy: {
        hit: this.sound.add('sfx:enemy:hit')
      }
    }

    // setup animations
    Character.CreateAnimations(this)
    MeleeAttack.CreateAnimations(this)
    WalkingEnemy.CreateAnimations(this)
    EssenceBar.CreateAnimations(this)

    // setup the game world
    this._createLevel()

    // setup ui
    this._createUI()

    // make the camera follow the main character
    this.cameras.main.startFollow(this.chara)
  }

  update() {
    // collision detection
    const layer = this.map.getLayer('main').tilemapLayer
    this.physics.collide(this.chara, layer)
    this.physics.collide(this.walkingEnemies, layer, enemy => {
      enemy.reverseWalk()
    })
    if (this.chara.isAttacking) {
      this.physics.overlap(
        this.chara.attackSprite,
        this.walkingEnemies,
        (chara, enemy) => {
          enemy.receiveHit()
        }
      )
    }
    this.physics.overlap(this.chara, this.walkingEnemies, (chara, enemy) => {
      chara.receiveHit()
    })

    // check for victory condition
    this.physics.overlap(this.chara, this.goal, (chara, goal) => {
      this._victory()
    })

    this._updatePlayerInput()
    this.chara.update()
    this.essenceBar.setValue(this.chara.normalizedEssence)
    this.essenceBar.update()

    // check for game over condition
    if (!this.chara.hasEssenceLeft) {
      this._gameOver(this.chara.isAlive ? 'YOU RAN OUT OF ESSENCE' : 'YOU DIED')
    }
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

    // attack
    if (Phaser.Input.Keyboard.JustDown(this.keys.attack)) {
      this.chara.attack()
    }
  }

  _createLevel() {
    // create a new tilemap and attach the tileset to it
    this.map = this.make.tilemap({ key: 'lvl:01' })
    const tiles = this.map.addTilesetImage('tileset', 'img:tileset')
    // setup map layers and their collisions
    this.map.createStaticLayer('main', tiles)
    this.map.setCollisionByProperty({ solid: true })

    // update camera and world bounds so the whole map fits
    const width = this.map.widthInPixels
    const height = this.map.heightInPixels
    this.cameras.main.setBounds(0, 0, width, height)
    this.physics.world.setBounds(0, 0, width, height)

    // spawn prefabs
    const prefabs = this.map.objects.find(x => x.name === 'prefabs')
    this._createPrefabs(prefabs.objects)
  }

  _createPrefabs(prefabs) {
    const _getPropertyValue = (prefab, property) => {
      if (!prefab.properties) return null

      const raw = prefab.properties.find(x => x.name === property)
      return raw ? raw.value : null
    }

    // objects from tiled use bottom-left corner as the origin of coordinates,
    // so we need to account for that
    const offsetX = TSIZE / 2
    const offsetY = -TSIZE / 2

    this.walkingEnemies = this.add.group()

    prefabs.forEach(prefab => {
      const x = prefab.x + offsetX
      const y = prefab.y + offsetY
      const direction = _getPropertyValue(prefab, 'direction')

      switch (prefab.type) {
        case 'chara':
          this.chara = new Character(this, x, y, this.sfx.chara)
          break
        case 'walking-enemy':
          this.walkingEnemies.add(
            new WalkingEnemy(this, x, y, direction, this.sfx.enemy)
          )
          break
        case 'goal':
          this.goal = new Goal(this, x, y)
          break
        default:
          console.warn(`Unknown prefab of type: ${prefab.type}`)
      }
    })
  }

  _createUI() {
    this.essenceBar = new EssenceBar(this, 2, 2, 0.5).setScrollFactor(0)
  }

  _gameOver(reason) {
    this.scene.launch('gameover', { title: reason })
    this.scene.pause()
  }

  _victory() {
    this.sfx.goal.hit.play()
    this.scene.launch('victory')
    this.scene.pause()
  }

  _drawDebug() {
    if (!this._debugGraphics) {
      this._debugGraphics = this.add.graphics()
    }
    // Pass in null for any of the style options to disable drawing that component
    this.map.renderDebug(this._debugGraphics, {
      tileColor: null, // Non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
    })
  }
}

export default MainScene
