import Phaser from 'phaser'
import { getVectorFromDirection, getOppositeDirection } from '../utils'

const SPEED = 50

class WalkingEnemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, direction) {
    super(scene, x, y, 'img:walking-enemy')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setSize(8, 8)

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
}

export default WalkingEnemy
