import Phaser from 'phaser'

const SPEED = 100

class Character extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'img:chara')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setCollideWorldBounds(true)
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
}

export default Character
