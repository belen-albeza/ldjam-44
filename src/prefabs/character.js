import Phaser from 'phaser'
import MeleeAttack from './melee-attack'

const SPEED = 100

class Character extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'img:chara')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    // make the physical body (not the sprite image itself!) smaller
    this.setSize(8, 8)

    // enable collision with world boudns
    this.setCollideWorldBounds(true)

    this.attackSprite = null
  }

  get isAttacking() {
    return !!this.attackSprite
  }

  update(time, delta) {
    if (this.attackSprite) {
      this.attackSprite.updatePositionFromParent(this.x, this.y)
    }
  }

  move(dirX, dirY) {
    this.body.velocity.x = dirX * SPEED
    this.body.velocity.y = dirY * SPEED

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

  attack() {
    if (this.isAttacking) {
      return false
    }

    const offset = Phaser.Math.Rotate(
      new Phaser.Geom.Point(2, 0),
      this.rotation
    )

    this.attackSprite = new MeleeAttack(
      this.scene,
      this.x + offset.x,
      this.y + offset.y,
      this.angle,
      offset
    )
    this.attackSprite.once('destroy', () => (this.attackSprite = null))

    return true
  }
}

export default Character
