// export const convertToArray = (opt) => {
//   let arr = [];
//   for (let key in opt) {
//     let value = key;
//     if (isNaN(+key)) {
//       // 非数字
//       if (["true", "false"].includes(key)) {
//         // 布尔值
//         value = JSON.parse(key);
//       } else {
//         // 字符串
//         value = key
//       }
//     } else {
//       // 数字
//       value = +key;
//     }

//     arr.push({
//       label: opt[key],
//       value,
//     });
//   }
//   return arr;
// };

// // 下拉框
// export const opt101 = {
//   1: "选项一",
//   2: "选项二",
//   3: "选项三",
// };

// Map转Array
export function convertToArray(map: Map<any, any>): any[] {
  const arr: any[] = [];
  for (const x of map) {
    arr.push({
      label: x[1],
      value: x[0],
    });
  }
  return arr;
}

// 下拉框（key可以是任意类型）
export const opt100: Map<any, any> = new Map([
  [1, '选项一'],
  [2, '选项二'],
  [3, '选项三'],
]);
