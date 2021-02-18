/* 粒子特效/幽灵蓝
 *
 * 作者：Alan Best
 * 最近更新时间：2021-2-14
 */
Object.assign(entity, {
  particleLimit: 2000,
  particleLifetime: 5,
  particleRate: 10,
  particleRateSpread: 50,
  particleSize: [2, 4, 3, 1, 0],
  particleColor: [
    new Box3RGBColor(1, 1, 1),
    new Box3RGBColor(0.11764705882352941, 0.6235294117647059, 100),
    new Box3RGBColor(1, 1, 2.2),
    new Box3RGBColor(0.11764705882352941, 0.6235294117647059, 100),
    new Box3RGBColor(1, 1, 100),
  ],
  particleNoise: 5,
  particleNoiseFrequency: 5,
  particleVelocity: new Box3Vector3(0, 0, 0),
});
