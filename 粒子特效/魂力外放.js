/* 粒子特效/魂力外放
 * 
 * 作者：BCX的一只萌新/MX的一只萌新
 * 最近更新时间：2021-2-18
 */
Object.assign(entity, {
    particleRate: 400,//粒子数量，可更改，越大粒子越多
    particleSize: [9, 6, 3, 6, 5],//粒子在每个阶段的大小，可更改
    particleColor: [//例子在每个阶段的颜色，可更改
        new Box3RGBColor(0,81,17),//第一阶段
        new Box3RGBColor(6, 80, 5),//第二阶段
    ],
    particleLifetime: 1,
    particleVelocitySpread: new Box3Vector3(10,30,40),
});
