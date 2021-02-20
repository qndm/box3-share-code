/* 管理员工具/右键运行代码
 *
 * 功能：在运行状态下实现控制台
 * 作者：社区名：BCX编程中手编程狂热分子/岛三名：BCX编程中手~
 * 最近更新时间：2021-2-20
 * 此代码已经过测试，请放心白嫖（划掉）请放心使用
 *
 * 使用方法
 * 替换掉下面的数据
 * “admin”：管理员名单
 * 随后在运行状态下右键，输入代码即可。
 */

var admin = ['BCX编程中手~']//想要防止改名的话自己改成userkey

world.onPress(async({ entity, button })=>{
  if(button == 'action1' && admin.includes(entity.player.name)){//想要防止改名的话自己改成userkey
    const result = await entity.player.dialog({
      type: Box3DialogType.INPUT,
      title: "代码执行器",
      content: `这是管理员专用的代码执行器，可以在运行模式下输入代码并执行。`,
      confirmText: '确定',
      placeholder: '在这里输入代码。（注意“;”）'
    });

    if(!result || result === null){
      entity.player.directMessage('已取消执行。');
      return;
    }

    try{
      await entity.player.dialog({
        type: Box3DialogType.TEXT,
        title: '代码执行器',
        content: '<~ '+eval(result)
      });
    }catch(err){
      await entity.player.dialog({
        type: Box3DialogType.TEXT,
        title: '代码执行器',
        content: 'Error:'+err
      });
    }
  }
})
