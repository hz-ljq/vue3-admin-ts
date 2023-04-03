let smallGreen = {
  anchor: new AMap.Pixel(17, 17),
  size: new AMap.Size(33, 33),
  zIndex: 2
}
let smallBlue = {
  anchor: new AMap.Pixel(17, 17),
  size: new AMap.Size(33, 33),
  zIndex: 1
}

let bigOrange = {
  anchor: new AMap.Pixel(30, 30),
  size: new AMap.Size(59, 59),
  zIndex: 3
}
let bigGreen = {
  anchor: new AMap.Pixel(30, 40),
  size: new AMap.Size(59, 79),
  zIndex: 2
}
let bigBlue = {
  anchor: new AMap.Pixel(30, 40),
  size: new AMap.Size(59, 79),
  zIndex: 1
}

// -----------------------------------------------------------------图标
export const styles = [
  // ---------------橙色
  {
    // url: require("./images/icon-big/orange-marker.png"),
    url: getUrl({
      basePath: './images/icon-big/',
      name: 'orange-marker'
    }),
    ...bigOrange
  },
  // ---------------绿色
  {
    // url: require("./images/icon-big/green/城市网格.png"),
    url: getUrl({
      basePath: './images/icon-big/green/',
      name: '城市网格'
    }),
    ...bigGreen
  },
  {
    // url: require("./images/icon-big/green/店铺.png"),
    url: getUrl({
      basePath: './images/icon-big/green/',
      name: '店铺'
    }),
    ...bigGreen
  },
  // ---------------蓝色
  {
    // url: require("./images/icon-big/blue/河道水位监测.png"),
    url: getUrl({
      basePath: './images/icon-big/blue/',
      name: '河道水位监测'
    }),
    ...bigBlue
  },
  {
    // url: require("./images/icon-big/blue/排出口.png"),
    url: getUrl({
      basePath: './images/icon-big/blue/',
      name: '排出口'
    }),
    ...bigBlue
  },
  // ---------------小图标
  {
    // url: require("./images/icon-small/orange.png"),
    url: getUrl({
      basePath: './images/icon-small/',
      name: 'orange'
    }),
    ...smallGreen
  },
  {
    // url: require("./images/icon-small/green.png"),
    url: getUrl({
      basePath: './images/icon-small/',
      name: 'green'
    }),
    ...smallGreen
  },
  {
    // url: require("./images/icon-small/blue.png"),
    url: getUrl({
      basePath: './images/icon-small/',
      name: 'blue'
    }),
    ...smallBlue
  }
]

function getUrl({ basePath = './', name }) {
  const url = basePath + `${name}.png`
  let modules
  if (basePath === './images/icon-big/') {
    modules = import.meta.glob('./images/icon-big/*', { eager: true })
  } else if (basePath === './images/icon-big/green/') {
    modules = import.meta.glob('./images/icon-big/green/*', { eager: true })
  } else if (basePath === './images/icon-big/blue/') {
    modules = import.meta.glob('./images/icon-big/blue/*', { eager: true })
  } else if (basePath === './images/icon-small/') {
    modules = import.meta.glob('./images/icon-small/*', { eager: true })
  }

  const mod = modules[url] as { default: string }
  return mod.default
}

// -----------------------------------------------------------------不显示
// export const hide = [
//   {
//     url: require("./images/icon-small/blue.png"),
//     anchor: new AMap.Pixel(0, 0),
//     size: new AMap.Size(0, 0),
//     zIndex: 0,
//   },
// ];
