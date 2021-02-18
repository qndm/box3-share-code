/* 实体查找器简写
 *
 * 功能：让代码中用到`world.querySelector`的地方更加简洁
 * 作者：Alan Best
 * 最近更新时间：2021-2-18
 * 此脚本用于控制台执行
 * 此脚本在代码文件中需要放置在开头
 *
 * 使用方法
 * 在执行此代码段后，
 * 你可以用 $ 来代替 world.querySelector
 *      用 $$ 代替 world.querySelectorAll
 *  代码运行之后在控制台中也可以这样使用
 */

const $ = world.querySelector,$$ = world.querySelectorAll;
global.$ = world.querySelector;global.$$=world.querySelectorAll;
