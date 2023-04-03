// mock数据（MassMarks）
let data1 = []
for (let i = 0; i < 60; i++) {
  data1.push({
    lnglat: [120 + 0.08 * (i % 20), 29.7 - 0.08 * Math.floor(i / 20)],
    name: 'name-' + i,
    originStyle: i % 8,
    style: i % 8,
  })
}

// mock数据（热力图）
let data2 = []
for (let i = 0; i < 100; i++) {
  data2.push({
    lng: 120.5 + 0.02 * (i % 10),
    lat: 30.3 + 0.02 * Math.floor(i / 10),
    count: Math.random() * 50
  })
}

export const mass = data1
export const heat = data2
