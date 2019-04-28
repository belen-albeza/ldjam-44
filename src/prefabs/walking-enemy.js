import Phaser from 'phaser'
import { getVectorFromDirection, getOppositeDirection } from '../utils'

const SPEED = 50

class WalkingEnemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, direction, sfx) {
    super(scene, x, y, 'img:walking-enemy')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setSize(8, 8)

    this.isAlive = true
    this.sfx = sfx
    this.direction = direction

    this.walk(direction)
  }

  walk(direction) {
    const dirVec = getVectorFromDirection(direction)
    this.body.velocity.x = dirVec.x * SPEED
    this.body.velocity.y = dirVec.y * SPEED

    this.direction = direction

    // set image angle depending on which direction the character is moving
    if (this.body.velocity.x > 0) {
      this.angle = 0
    } else if (this.body.velocity.x < 0) {
      this.angle = 180
    } else if (this.body.velocity.y < 0) {
      this.angle = 270
    } else if (this.body.velocity.y > 0) {
      this.angle = 90
    }
  }

  reverseWalk() {
    const newDir = getOppositeDirection(this.direction)
    this.walk(newDir)
  }

  receiveHit() {
    // avoid getting hit once dead
    if (!this.isAlive) return false

    // mark this sprite as dead & disable physics
    this.isAlive = false
    this.body.setEnable(false)

    // play hit animation and self-destroy afterwards
    this.play('walking-enemy:hit')
    this.once('animationcomplete-walking-enemy:hit', () => {
      this.destroy()
    })

    this.sfx.hit.play()

    return true
  }

  static CreateAnimations(scene) {
    scene.anims.create({
      key: 'walking-enemy:walk',
      frames: scene.anims.generateFrameNumbers('img:walking-enemy', {
        frames: [0]
      }),
      frameRate: 1,
      repeat: -1
    })
    scene.anims.create({
      key: 'walking-enemy:hit',
      frames: scene.anims.generateFrameNumbers('img:walking-enemy', {
        frames: [0, 1]
      }),
      frameRate: 16,
      repeat: 3
    })
  }
}

export default WalkingEnemy
