import Phaser from 'phaser'
import MeleeAttack from './melee-attack'

const SPEED = 100
const MAX_ESSENCE = 1000
const ESSENCE_COST = {
  MOVE: -1,
  ATTACK: -20
}

class Character extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sfx) {
    super(scene, x, y, 'img:chara')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    // make the physical body (not the sprite image itself!) smaller
    this.setSize(8, 8)

    // enable collision with world boudns
    this.setCollideWorldBounds(true)

    this.sfx = sfx
    this.attackSprite = null

    this.essencePoints = MAX_ESSENCE
  }

  get isAttacking() {
    return !!this.attackSprite
  }

  get hasEssenceLeft() {
    return this.essencePoints > 0
  }

  get normalizedEssence() {
    return this.essencePoints / MAX_ESSENCE
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

    // moving costs essence points
    if (dirX !== 0 || dirY !== 0) {
      this.incEssencePoints(ESSENCE_COST.MOVE)
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
    this.sfx.melee.play()

    // attacking costs essence points
    this.incEssencePoints(ESSENCE_COST.ATTACK)

    return true
  }

  incEssencePoints(delta) {
    this.essencePoints = Math.min(
      Math.max(0, this.essencePoints + delta),
      MAX_ESSENCE
    )
  }
}

export default Character
