/* 功能实现/挂机检测器
 *
 * 功能：防止人员挂机(多人挂机可能会造成卡顿等危害)
 * 作者：名字鬼知道
 * 最近更新时间：2021-2-20
 *
 * 使用方法
 * 替换下面的变量来自定义功能
 * AFKCheckerTime  挂机多少秒将会被判定为挂机
 */
const AFKCheckerTime=30*10  //30秒
world.onPlayerJoin(async({entity})=>{
  while(entity){
    for(let i=0;i<AFKCheckerTime;i++){
      await sleep(100)
      if(entity.player.walkState!==''||!entity){
        break;
      }
      if(i>=AFKCheckerTime){
        entity.player.invisible=true//隐形
        entity.player.spectator=true//开启幽灵模式
        entity.player.showName=false//关闭名字显示
        entity.enableDamage=false//关闭受伤
        entity.hurt=()=>{} // 无敌（改进版）
        world.say(`${entity.player.name}由于挂机时间过长进入了观战模式！`)
        entity.player.dialog({
          type:Box3DialogType.TEXT,
          title:'请重新进入',
          content:`挂机超过${AFKCheckerTime/10}秒，请重新进入游戏！`,
        })
        return;
      }
    }
  }
})
