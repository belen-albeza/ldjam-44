import Phaser from 'phaser'

const FLASH_THRESHOLD = 0.01

class EssenceBar extends Phaser.GameObjects.Container {
  constructor(scene, x, y, value = 1) {
    super(scene, x, y)

    this.value = value

    scene.add.existing(this)

    const label = new Phaser.GameObjects.BitmapText(
      scene,
      0,
      0,
      'fnt:retro',
      'ESSENCE'
    )
    this.add(label)

    const barX = x + label.width + 2
    const barY = y + 1

    const backgroundBar = scene.add
      .image(barX, barY, 'img:essence-bar')
      .setOrigin(0, 0.5)
      .setAlpha(0.2)
    this.add(backgroundBar)

    this.bar = scene.add.sprite(barX, barY, 'img:essence-bar').setOrigin(0, 0.5)
    this.bar.setCrop(0, 0, this.bar.width * this.value, this.bar.height)
    this.add(this.bar)
  }

  static CreateAnimations(scene) {
    scene.anims.create({
      key: 'bar:flash',
      frames: scene.anims.generateFrameNumbers('img:essence-bar', {
        frames: [1, 1, 0]
      }),
      frameRate: 16,
      repeat: 2
    })
  }

  flash() {
    this.bar.play('bar:flash')
  }

  update() {
    this.bar.setCrop(0, 0, this.bar.width * this.value, this.bar.height)
  }

  setValue(newValue) {
    if (!this.bar.anims.isPlaying) {
      this.bar.setFrame(newValue < this.value ? 1 : 0)
    }

    if (newValue < this.value && this.value - newValue >= FLASH_THRESHOLD) {
      this.flash()
    }

    this.value = newValue
  }
}

export default EssenceBar
