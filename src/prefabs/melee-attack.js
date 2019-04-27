import Phaser from 'phaser'

class MeleeAttack extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, angle, offset) {
    super(scene, x, y, 'img:melee')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.angle = angle
    this.play('attack:melee')

    this.on('animationcomplete-attack:melee', () => {
      this.destroy()
    })

    this.offset = offset
  }

  static CreateAnimations(scene) {
    scene.anims.create({
      key: 'attack:melee',
      frames: scene.anims.generateFrameNumbers('img:melee', {
        frames: [0, 1, 2, 3]
      }),
      frameRate: 14
    })
  }

  updatePositionFromParent(x, y) {
    this.x = x + this.offset.x
    this.y = y + this.offset.y
  }
}

export default MeleeAttack
