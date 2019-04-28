import Phaser from 'phaser'

class Goal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'img:goal')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    // make the physical body (not the sprite image itself!) smaller
    this.setSize(5, 5).setOffset(6, 6)
  }
}

export default Goal
