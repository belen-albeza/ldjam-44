import Phaser from 'phaser'

class Character extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'img:chara')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setCollideWorldBounds(true)
  }
}

export default Character
