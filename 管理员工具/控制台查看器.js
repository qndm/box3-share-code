/* 管理员工具/控制台查看器
 *
 * 功能：将控制台进行修改，使得在发布后可以使用聊天命令查看控制台内容
 * 作者：Alan Best
 * 最近更新时间：2021-2-14
 * 此脚本不可用于控制台执行
 *
 * 使用方法
 * 替换下面的常量来自定义功能
 * `CV_ADMIN_LIST` 可查看控制台的管理员名单
 * `CV_COMMAND` 触发查看控制台的聊天信息
 * `CV_LOG_MAX_LENGTH` 日志保留长度，超过时会删除最旧的记录
 */

const CV_ADMIN_LIST = [
  /* 根据示例添加管理员 */
  "Alan_Best",
  "示例",
];
const CV_COMMAND = "查看控制台";
const CV_LOG_MAX_LENGTH = 1e3;
let CV_CONSOLE_LOG = []; // 存储控制台信息
// 备份控制台方法
console._log=console.log
console._warn=console.warn
console._error=console.error

/**
 * 检查是否超过日志长度限制
 */
function CV_checkLogLength() {
  if (CV_CONSOLE_LOG.length > CV_LOG_MAX_LENGTH) {
    CV_CONSOLE_LOG.splice(0,);
  }
}

/*
 * 添加日志记录
 */
function CV_logAppend(text) {
  CV_CONSOLE_LOG.push(text)
  CV_checkLogLength()
}

// 重写log
console.log = (message) => {
  CV_logAppend(`[LOG]: ${message}`)
  console._log(message)
}

// 重写error
console.error = (message) => {
  CV_logAppend(`[ERROR]: ${message}`)
  console._error(message)
}

// 重写warn
console.warn = (message) => {
  CV_logAppend(`[WARN]: ${message}`)
  console._warn(message)
}


world.onChat(({entity,message})=>{
  if(CV_ADMIN_LIST.includes(entity.player.name)&&message===CV_COMMAND){
    entity.player.dialog({
      type:Box3DialogType.TEXT,
      title:"控制台记录",
      content:CV_CONSOLE_LOG.join(" \n")
    })
  }
})
