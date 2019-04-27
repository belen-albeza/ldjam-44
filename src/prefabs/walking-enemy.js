import Phaser from 'phaser'

class WalkingEnemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'img:chara')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setSize(8, 8)
  }
}

export default WalkingEnemy
