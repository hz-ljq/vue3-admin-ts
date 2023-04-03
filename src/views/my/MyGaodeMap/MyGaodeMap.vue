<template>
  <div class="MyGaodeMap">
    <div id="gaode-map"></div>

    <!-- 信息弹窗1（用于普通marker） -->
    <div style="display: none">
      <div ref="infoWindow1Ref" class="infoWindow1">
        <!-- 通过$refs，将vue实例注入到infoWindow，支持vue的数据绑定。 -->
        <div class="item" v-for="(item, index) in infoOfInfoWindow1" :key="index" @click="item.value += 1">
          {{ item.name }}（点击自增）：{{ item.value }}
        </div>
      </div>
    </div>

    <!-- 信息弹窗2（用于massMarks） -->
    <div style="display: none">
      <div ref="infoWindow2Ref" class="infoWindow2">
        <!-- 通过$refs，将vue实例注入到infoWindow，支持vue的数据绑定。 -->
        <div class="title">标题</div>
        <div class="content">我是massMarks的信息弹窗：{{ infoOfInfoWindow2.name }}</div>
        <el-button class="close-btn" type="" link icon="Close" @click="close"></el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx" name="MyGaodeMap">
import { jiedaoData } from './jiedaoData' // 街道数据
import * as iconStyle from './iconStyle'
import * as mockData from './mock'
import myIcon from './images/1.png'

// ------------------------------------------------------------------- data
const AMap = window.AMap

const center = [120.8, 29.9] // 默认中心点
const zoom = 9.5 // 默认zoom
const zooms = [2, 20] // zoom范围
let map = null

// 普通marker实例
let markersArr = []
// MassMarks实例
let mass = null
// 多边形实例
let polygon1 = []
// 街道的多边形实例
let polygon2 = {}
// 折线图层
let polyline = null
// 热力图实例
let heatmap = null
// 图片图层实例
let imageLayer = null
// infoWindow实例
let infoWindow1 = null
let infoWindow2 = null
const infoWindow1Ref = ref()
const infoWindow2Ref = ref()

// 信息弹窗1的数据
const infoOfInfoWindow1 = ref([
  {
    name: '指标1',
    value: 100
  },
  {
    name: '指标2',
    value: 200
  }
])
// 信息弹窗2的数据
const infoOfInfoWindow2 = ref({
  name: null
})

// ------------------------------------------------------------------- methods
// 地图初始化
function initMap() {
  addImageLayer()

  map = new AMap.Map('gaode-map', {
    layers: [
      // 使用多个图层
      // new AMap.TileLayer.Satellite(),
      // new AMap.TileLayer.RoadNet(),
      // new AMap.TileLayer.Traffic(),

      // 图片图层
      AMap.createDefaultLayer(),
      imageLayer
    ],
    zoom, // 缩放级别
    zooms, // 缩放范围
    center, // 中心点坐标
    // viewMode: "3D", // 使用3D视图
    // pitch: 90,
    // pitchEnable: false,
    // rotateEnable: false,
    // mapStyle: 'amap://styles/light' // 设置地图的显示样式
    mapStyle: 'amap://styles/cd072fdb4f014384bc3f622cbd4ba3bc' // 设置地图的显示样式
  })

  // 地图图块加载完成后触发
  map.on('complete', () => {
    // 初始化信息窗体
    infoWindow1 = new AMap.InfoWindow({
      offset: new AMap.Pixel(0, -50),
      closeWhenClickMap: true,
      autoMove: true
      // isCustom: true, // 是否自定义（是的话，信息窗体的外框框样式，以及右上角的关闭按钮都将不存在）
    })

    // 初始化信息窗体
    infoWindow2 = new AMap.InfoWindow({
      offset: new AMap.Pixel(0, -50),
      closeWhenClickMap: true,
      autoMove: true,
      isCustom: true // 是否自定义（是的话，信息窗体的外框框样式，以及右上角的关闭按钮都将不存在）
    })

    // marker1
    const item1 = {
      lng: 120,
      lat: 30,
      indi1: 'indi1',
      indi2: 'indi2'
    }
    addMarker1(item1)

    // marker2
    const item2 = {
      lng: 120.2,
      lat: 30,
      carNo: '浙A·123456',
    }
    addMarker2(item2)

    addMassMarks()

    addText()
    openInfoWindow1()

    addPolygon1()
    addPolygon2()
    addHeatmap()
    AddLineAndjudgePointIsIn()

    // 快速定位 地图和zoom
    map.setZoomAndCenter(zoom, center)
    // 地图自适应
    // map.setFitView();
  })

  // 地图的点击事件
  map.on('click', () => {
    console.log(123)
    // console.log(e);
  })
}

// 添加marker1（图片）
function addMarker1(item) {
  const marker = new AMap.Marker({
    map,
    topWhenClick: true,

    // 点
    icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
    // icon: require('@/assets/logo.png'),
    angle: 45,
    position: [item.lng, item.lat],
    anchor: 'bottom-center',
    // 标注
    label: {
      content: `<div class="marker-label">我是marker1</div>`,
      direction: 'top',
      offset: [-20, 0]
    },
    // 用户自定义数据
    extData: item
  })
  // marker.setSize([10, 10]);

  // 暂存 信息弹框的内容
  marker.content = `
        <div class="indi-wrapper">
          <div class="indi">${item.indi1}</div>
          <div class="indi">${item.indi2}</div>
        </div>
      `

  // 绑定click事件
  marker.on('click', markerClick)

  // 暂存marker实例
  markersArr.push(marker)
}

// 添加marker2（自定义div）
function addMarker2(item) {
  var marker = new AMap.Marker({
    map,
    topWhenClick: true,

    // 点
    content: `<div>
          <div class="marker" id="marker-${item.carNo}" />
        </div>`,
    offset: [50, 0],
    position: [item.lng, item.lat],
    anchor: 'center',
    // 标注
    label: {
      content: `<div class="marker-label">我是marker2</div>`,
      direction: 'top',
      offset: [20, 0]
    },
    // 用户自定义数据
    extData: item
  })

  // 暂存 信息弹框的内容
  marker.content = `
        <div class="indi-wrapper">
          <div class="indi">我是marker2：${item.carNo}</div>
        </div>
      `

  // 绑定click事件
  marker.on('click', markerClick)

  markersArr.push(marker)
}

// marker的点击事件
function markerClick(e) {
  console.log(e.target.getExtData());
  infoWindow1.setContent(e.target.content)
  infoWindow1.open(map, e.target.getPosition())
}

// 创建纯文本标注
function addText() {
  var text = new AMap.Text({
    text: '我是纯文本标注',
    anchor: 'center', // 设置文本标注锚点
    draggable: true,
    cursor: 'pointer',
    angle: 10,
    style: {
      padding: '10px',
      'margin-bottom': '100px',
      'border-radius': '4px',
      'border-width': 0,
      'box-shadow': '0 0 20px yellow',
      'text-align': 'center',
      'font-size': '18px',
      color: 'blue'
    },
    position: [120.5, 30]
  })

  text.setMap(map)
}

// 打开信息窗体
function openInfoWindow1() {
  infoWindow1.setContent(infoWindow1Ref.value)
  // 定位 信息窗体
  infoWindow1.open(map, [121, 30])
}

// 拱墅区的图片图层（包含绿点、蓝色）
function addImageLayer() {
  imageLayer = new AMap.ImageLayer({
    // url:
    //   "https://amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/dongwuyuan.jpg",
    // url: require('./1.png'),
    url: myIcon,
    bounds: new AMap.Bounds([120.095539, 30.261185], [120.206055, 30.392389]),
    zIndex: 10000
  })
  // imageLayer.hide();
}

// 热力图
function addHeatmap() {
  if (!heatmap) {
    // 初始化heatmap对象
    heatmap = new AMap.HeatMap(map, {
      radius: 25, // 给定半径
      opacity: [0, 0.8]
      // gradient: {
      //   0.5: "blue",
      //   0.65: "rgb(117,211,248)",
      //   0.7: "rgb(0, 255, 0)",
      //   0.9: "#ffea00",
      //   1.0: "red",
      // },
    })
  }
  // 设置数据集
  heatmap.setDataSet({
    data: mockData.heat
    // max: 40,
  })
  // heatmap.hide();
}

// 海量点
function addMassMarks() {
  if (!mass) {
    // 创建 实例
    mass = new AMap.MassMarks([], {
      opacity: 1,
      zIndex: 111,
      cursor: 'pointer',
      style: iconStyle.styles
      // MassMarks的配置中，没有类似于普通marker的content属性。
    })
    mass.setMap(map)
    mass.on('click', (e) => {
      console.log(e)
      infoOfInfoWindow2.value.name = e.data.name

      infoWindow2.setContent(infoWindow2Ref.value)
      infoWindow2.open(map, e.data.lnglat)

      switchMarker(e.data.name)
    })
    mass.on('mouseover', (e) => {})
  }
  // 设置数据
  mass.setData(mockData.mass)
}

// 切换 打点的高亮状态
function switchMarker(name) {
  mockData.mass.map((x) => {
    if (x.name === name) {
      x.style = 8
    } else {
      x.style = x.originStyle
    }
  })
  mass.setData(mockData.mass)
}

// 多边形
function addPolygon1() {
  // 创建行政区查询对象
  var district = new AMap.DistrictSearch({
    // 返回行政区边界坐标等具体信息
    extensions: 'all',
    // 设置查询行政区级别为 区
    level: 'district'
  })

  district.search('滨江区', (status, result) => {
    // console.log(22, result);
    var bounds = result.districtList[0].boundaries
    if (bounds) {
      for (var i = 0, l = bounds.length; i < l; i++) {
        //生成行政区划polygon
        var polygon = new AMap.Polygon({
          map,
          strokeWeight: 2,
          path: bounds[i],
          fillOpacity: 0.3,
          // fillColor: "#226B87",
          fillColor: 'pink',
          strokeColor: 'red'
        })
        polygon.on('mouseover', () => {
          polygon.setOptions({
            fillOpacity: 0.5,
            fillColor: 'lightgreen'
          })
        })
        polygon.on('mouseout', () => {
          polygon.setOptions({
            fillOpacity: 0.3,
            fillColor: 'pink'
          })
        })
        polygon1.push(polygon)
      }
    }
  })
}

// 街道的多边形
function addPolygon2() {
  for (let x of jiedaoData) {
    let polygon = new AMap.Polygon({
      map,
      strokeWeight: 2,
      path: JSON.parse(x.locations),
      fillOpacity: 0.3,
      fillColor: '#226B87',
      // fillColor: "red",
      strokeColor: 'white'
    })
    polygon.on('mouseover', () => {
      polygon.setOptions({
        fillOpacity: 0.5,
        fillColor: 'red'
      })
    })
    polygon.on('mouseout', () => {
      polygon.setOptions({
        fillOpacity: 0.3,
        fillColor: '#226B87'
      })
    })
    // polygon.hide();
    // map.add(polygon);
    polygon2[x.streetId] = polygon
  }
}

// 画线，并判断点击位置是否在画线区域内
function AddLineAndjudgePointIsIn() {
  let leftTop = center
  let rightTop = [center[0] + 0.2, center[1]]
  let rightBottom = [center[0] + 0.2, center[1] - 0.1]
  let leftBottom = [center[0], center[1] - 0.1]
  let path = [leftTop, rightTop, rightBottom, leftBottom, leftTop]

  polyline = new AMap.Polyline({
    path,
    isOutline: true,
    outlineColor: '#ffeeff',
    borderWeight: 2,
    strokeColor: '#3366FF',
    strokeOpacity: 1,
    strokeWeight: 3,
    // 折线样式还支持 'dashed'
    strokeStyle: 'solid',
    // strokeStyle是dashed时有效
    strokeDasharray: [10, 5],
    lineJoin: 'round',
    lineCap: 'round',
    zIndex: 150
  })
  map.add([polyline])

  // 地图的点击事件
  map.on('click', (e) => {
    // console.log(e);
    // 判断 point 是否在地图的可视区域内
    let inRing = AMap.GeometryUtil.isPointInRing([e.lnglat.lng, e.lnglat.lat], path)
    console.log(inRing)
  })
}

function close() {
  infoWindow2?.close()
}

// ------------------------------------------------------------------- other
onMounted(() => {
  nextTick(() => {
    initMap()
  })
})

onBeforeUnmount(() => {
  // 销毁 海量点
  if (mass) {
    mass.clear()
  }

  // 销毁 多边形1
  for (let x of polygon1) {
    if (x) {
      x.destroy()
    }
  }

  // 销毁 多边形2
  for (let key in polygon2) {
    if (polygon2[key]) {
      polygon2[key].destroy()
    }
  }

  // 销毁 折线
  if (polyline) {
    polyline.destroy()
  }

  // 销毁 地图
  if (map) {
    map.remove(markersArr)
    map.clearInfoWindow()
    map.destroy()
  }
})
</script>

<style lang="scss" src="./index.scss" scoped />
