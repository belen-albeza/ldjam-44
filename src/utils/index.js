import Phaser from 'phaser'
import { DIRECTION } from './constants'

export function getOppositeDirection(direction) {
  switch (direction) {
    case DIRECTION.UP:
      return DIRECTION.DOWN
    case DIRECTION.DOWN:
      return DIRECTION.UP
    case DIRECTION.RIGHT:
      return DIRECTION.LEFT
    case DIRECTION.LEFT:
      return DIRECTION.RIGHT
  }
  return null
}

export function getVectorFromDirection(direction) {
  return Phaser.Math.Vector2[direction]
}
