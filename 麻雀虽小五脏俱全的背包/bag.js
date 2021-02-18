/* 麻雀虽小五脏俱全的背包系统
 * 
 * 功能：右键打开背包，添加操作json定义的
 * 作者：ACstudioToby
 * 最近更新时间：2021-2-18
 * 
 * 使用方法
 *右键打开背包
 */
/*武器系统-攻击 */global.dealAtt = function (entity, hitEntity, weapon) { hitEntity.hurt(world.items[weapon].att, { attacker: entity, }) }
global.query = function (q) {
    return world.querySelectorAll(q);
}
world.items = {
    '金币': {//道具名称
        'description': '流通的通用货币',//描述
        'actions': ['调查'],//上面显示的按钮
        'func': {//按下指定按钮发生的事件,entity是按下的玩家
            '调查': function (entity) {
                entity.player.show_dialog_text('系统', '没见过这种金币\n反射着光，金光闪烁')
            },
        }
    },
}

//很容易创建物品 注释都有说明 \）

world.getKeys = function (k) { var l = []; for (var key in k) { l.push(key) }; return l }
/**背包 */
async function PlayerJoin(entity = new Box3Entity()) {
    entity.player.show_dialog_select = async function (title = '系统', options = [], content = '') { const result = await this.dialog({ type: Box3DialogType.SELECT, title: title, titleTextColor: new Box3RGBAColor(0, 0, 0, 1), titleBackgroundColor: new Box3RGBAColor(0.968, 0.702, 0.392, 1), content: content, options: options, }); return result };
    entity.player.show_dialog_text = async function (title = '系统', content = '') { const result = await this.dialog({ type: Box3DialogType.TEXT, title: title, titleTextColor: new Box3RGBAColor(0, 0, 0, 1), titleBackgroundColor: new Box3RGBAColor(0.968, 0.702, 0.392, 1), content: content, hasArrow: true }); return result };
    entity.bag = { '金币': 100, }
    entity.enableDamage = true; entity.hand = '';
    entity.bagremove = function (item) {
        entity.bag[item] -= 1
        if (entity.bag[item] <= 0) {
            delete entity.bag[item]
        }
    }
    entity.bagadd = function (item) {
        if (entity.bag[item] == undefined) {
            entity.bag[item] = 1
        } else {
            entity.bag[item] += 1
        }
    }
}
async function bagfunc(entity) {
    const homepage = await entity.player.show_dialog_select(
        '系统',
        [`道具背包[物品${world.getKeys(entity.bag).length}种]`, '地图', '回到游戏'],
        '玩家名称：' + entity.player.name + '\nid：' + (entity.player.boxId ? entity.player.boxId : '游客无id') + '\n用户识别码：' + (entity.player.userKey ? entity.player.userKey : '游客无id')
    );
    if (!homepage) { return }
    if (homepage.index == 0) {
        result = await entity.player.show_dialog_select(
            `道具背包`,
            ['取消手持物品'].concat(world.getKeys(entity.bag)),
            `物品${world.getKeys(entity.bag).length}种`
        )
        if (!result) { return }
        if (result.value == '取消手持物品') {
            setHandWeapon(entity, ''); return
        }
        f = await entity.player.show_dialog_select(
            '背包-' + result.value,
            world.items[result.value].actions,
            `数量：${entity.bag[result.value]}
描述：${world.items[result.value].description}`

        )
        if (!f) { return }
        world.items[result.value].func[f.value](entity)

    } else if (homepage.index == 1) {
        const dialog = await entity.player.dialog({
            type: Box3DialogType.TEXT,
            title: "地图",
            lookEye: new Box3Vector3(128, 258, 128),
            lookTarget: new Box3Vector3(128, 20, 127),// lookUp:new Box3Vector3(0,1,0),new Box3Vector3(entity.position.x,entity.position.y+100,entity.position.z)
            content: `< 地图已展开 >`,
        });

        // const dialog = await entity.player.dialog({
        //     type: Box3DialogType.TEXT,
        //     title: "地图",
        //     lookEye: new Box3Vector3(0, 100, 0),
        //     lookTarget: new Box3Vector3(128, 10, 128),// lookUp:new Box3Vector3(0,1,0),new Box3Vector3(entity.position.x,entity.position.y+100,entity.position.z)
        //     content: `< 地图已展开 >`,
        // });
    }
}
world.enableAtt = true;//在这里true启用攻击 false关闭
world.onPlayerJoin(async ({ entity }) => {
    PlayerJoin(entity)
    entity.player.onPress(async ({ entity, button, raycast }) => {
        if (button == Box3ButtonType.ACTION1) {
            bagfunc(entity)
        } else if (button == Box3ButtonType.ACTION0) {
            if (entity.hand && raycast.hitEntity && world.enableAtt) {
                if (!entity.player.dead) {
                    if (entity.hp > 0 && entity.position.distance(raycast.hitEntity.position) <= world.items[entity.hand].distance) {
                        dealAtt(entity, raycast.hitEntity, entity.hand)
                    }
                }
            }
        }
    })
})
global.create_store = function (selector, items, text, text2, ra = 4) {
    store = world.querySelector(selector)
    store.enableInteract = true;
    store.interactRadius = ra;
    store.interactHint = store.id
    store.items = items;
    store.onInteract(async ({ entity, targetEntity }) => {
        entity.player.show_dialog_text(targetEntity.id, text)
        buyjuice = await entity.player.show_dialog_select(targetEntity.id, world.getKeys(targetEntity.items), text2)
        if (buyjuice) {
            options = await entity.player.show_dialog_select(targetEntity.id, [
                '不买', '买'
            ], `确定要购买${buyjuice.value}吗？需要花费${targetEntity.items[buyjuice.value]}元，你有${entity.bag.金币 ? entity.bag.金币 : 0}元`)
            if (options) {
                if (options.value == '买') {
                    if (entity.bag.金币 >= targetEntity.items[buyjuice.value]) {
                        entity.bag.金币 -= targetEntity.items[buyjuice.value];
                        if (entity.bag.金币 == 0) {
                            delete entity.bag['金币']
                        }
                        entity.bagadd(buyjuice.value)
                    } else {
                        entity.player.show_dialog_text(targetEntity.id, '你的金币不够')
                        return
                    }
                } else return;
            }
        }
    })
    return store
}
//武器系统
global.setHandWeapon = function (entity, name, orientation = new Box3Quaternion(0, 1, 0, 0)) {
    if (!name) {
        entity.player.wearables(Box3BodyPart.RIGHT_HAND).forEach((e) => {
            entity.player.removeWearable(e)
        }); entity.hand = ''; return
    }
    var a = world.items[name];
    if (a.mesh) {
        entity.hand = name;
        entity.player.wearables(Box3BodyPart.RIGHT_HAND).forEach((e) => {
            entity.player.removeWearable(e)
        });
        entity.player.addWearable({
            bodyPart: Box3BodyPart.RIGHT_HAND,
            mesh: a.mesh,
            orientation: orientation,
            scale: new Box3Vector3(0.7, 0.7, 0.7),
            offset: new Box3Vector3(0, -0.13, 0.5),
        });
    }
}
