/* 其他/日志记录器
 *
 * 功能：使用这个工具可以简单地控制日志详细程度，还能快速格式化实体信息
 * 作者：Alan Best
 * 最近更新时间：2021-2-20
 * 此脚本不可用于控制台执行
 *
 * 使用方法请见 说明文档/日志记录器
 */

module.exports = function (level = 0) {
  this.level = level;
  this.tickTime = 0;
  // 添加tick计时器
  world.onTick(({ tick }) => { this.tickTime = tick })
  this.format = (obj) => {
    // 通过对象特征来判断类型
    if (typeof obj === "string") { return obj }
    else if (obj.isPlayer) { return `P{ @${obj.player.name} }` }
    else if (obj.mesh) { return `E{ #${obj.id} .${obj.tags()} }` }
    else if (obj.x !== undefined && obj.y !== undefined && obj.z !== undefined) {
      return `V{ ${obj.x}, ${obj.y}, ${obj.z} }`
    }
  }
  this.debug = (m, l = -1) => {
    if (l >= this.level) {
      console.log(`[T${this.tickTime} DEBUG]: ${m}`)
    }
  }
  this.error = (m, l = 2) => {
    if (l >= this.level) {
      console.log(`[T${this.tickTime} ERROR]: ${m}`)
    }
  }
  this.warn = (m, l = 1) => {
    if (l >= this.level) {
      console.log(`[T${this.tickTime} WARN]: ${m}`)
    }
  }
  this.info = (m, l = 0) => {
    if (l >= this.level) {
      console.log(`[T${this.tickTime} INFO]: ${m}`)
    }
  }
}
