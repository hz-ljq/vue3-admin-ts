export const suits: any = ['C', 'D', 'S', 'H']; // 梅花、方块、黑桃、红桃
export const ranks: any = [
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
  '2',
  'joker',
  'JOKER',
];

// 炸弹的星级
const bombStarMap = {
  '4相炸弹': 4,
  '5相炸弹': 5,
  三王炸弹: 6,
  '6相炸弹': 6,
  '4相3连环炸弹': 7,
  '7相炸弹': 7,
  天王炸弹: 7,
  '4相4连环炸弹': 8,
  '5相3连环炸弹': 8,
  '8相炸弹': 8,
  '4相5连环炸弹': 9,
  '5相4连环炸弹': 9,
  '6相3连环炸弹': 9,
  '9相炸弹': 9,
  '5相5连环炸弹': 10,
  '4相6连环炸弹': 10,
  '6相4连环炸弹': 10,
  '7相3连环炸弹': 10,
  '10相炸弹': 10,
  '8相3连环炸弹': 11,
};

// 扑克牌排序（从小到大）
function sort(arr: any[]) {
  return arr.slice().sort((a, b) => {
    return ranks.indexOf(a) - ranks.indexOf(b);
  });
}

// 是否符合任一牌型规则
function verifyRules(cards) {
  // 先排序（从小到大）
  cards = sort(cards);

  const judgement: any = {
    type: null, // 牌型
    result: false, // 是否符合全部规则
  };
  // ■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□ 符合的规则，如下：、
  // 针对：单牌、对子、三张、炸弹
  // （无论几张牌）每张牌都相同
  let result = cards.every((item) => {
    return item === cards[0];
  });
  if (result) {
    judgement.type =
      cards.length === 1
        ? '单牌'
        : cards.length === 2
        ? '对子'
        : cards.length === 3
        ? '三张'
        : cards.length >= 4
        ? `${cards.length}相炸弹`
        : null;
    judgement.result = true;
  }

  // 针对：顺子（34567...A）
  if (cards.length >= 5) {
    result = cards.every((item, index) => {
      // 不能出现：2、joker
      const flag1 = !['2', 'joker'].includes(item);
      // 每张牌都比前一张大1
      const flag2 =
        index === 0
          ? true
          : ranks.indexOf(cards[index]) - ranks.indexOf(cards[index - 1]) === 1;
      return flag1 && flag2;
    });

    if (result) {
      judgement.type = cards.length + '级顺子';
      judgement.result = true;
    }
  }

  // 针对：连对（334455...AA）
  if (cards.length >= 6 && cards.length <= 24) {
    result = cards.every((item, index) => {
      // 不能出现：2、joker
      const flag1 = !['2', 'joker'].includes(item);
      let flag2;
      if (index % 2 === 0) {
        // 索引为0或偶数位的牌，每张牌都比前第2张大1
        flag2 =
          index === 0
            ? true
            : ranks.indexOf(cards[index]) - ranks.indexOf(cards[index - 2]) ===
              1;
      } else {
        // 索引为奇数位的牌，每张牌都与前1张相等
        flag2 =
          index === 0
            ? true
            : ranks.indexOf(cards[index]) - ranks.indexOf(cards[index - 1]) ===
              0;
      }
      return flag1 && flag2;
    });

    if (result) {
      judgement.type = cards.length / 2 + '级连对';
      judgement.result = true;
    }
  }

  // 针对：连三张（333444555...AAA）
  if (cards.length >= 9) {
    result = cards.every((item, index) => {
      // 不能出现：2、joker
      const flag1 = !['2', 'joker'].includes(item);
      let flag2;
      if (index % 3 === 0) {
        // 索引为0或整除3的牌，每张牌都比前第3张大1
        flag2 =
          index === 0
            ? true
            : ranks.indexOf(cards[index]) - ranks.indexOf(cards[index - 3]) ===
              1;
      } else {
        // 索引为不能整除3的牌，每张牌都与前1张相等
        flag2 =
          index === 0
            ? true
            : ranks.indexOf(cards[index]) - ranks.indexOf(cards[index - 1]) ===
              0;
      }
      return flag1 && flag2;
    });

    if (result) {
      judgement.type = cards.length / 3 + '级连三张';
      judgement.result = true;
    }
  }

  // 针对：4-8相连环炸弹（333344445555...AAAA、...、333333334444444455555555...AAAAAAAA）
  if (cards.length >= 12) {
    // 先判断出是几相？
    const levelArr = [4, 5, 6, 7, 8].filter((item) => {
      return cards.length % item === 0;
    });
    let whichLevel: any = null;
    result = levelArr.some((level) => {
      const result = cards.every((item, index) => {
        // 不能出现：2、joker
        const flag1 = !['2', 'joker'].includes(item);
        let flag2;
        if (index % level === 0) {
          // 索引为0或整除level的牌，每张牌都比前第level张大1
          flag2 =
            index === 0
              ? true
              : ranks.indexOf(cards[index]) -
                  ranks.indexOf(cards[index - level]) ===
                1;
        } else {
          // 索引为不能整除level的牌，每张牌都与前1张相等
          flag2 =
            index === 0
              ? true
              : ranks.indexOf(cards[index]) -
                  ranks.indexOf(cards[index - 1]) ===
                0;
        }
        return flag1 && flag2;
      });

      if (result) {
        whichLevel = level;
      }

      return result;
    });

    if (result) {
      judgement.type = `${whichLevel}相${cards.length / whichLevel}连环炸弹`;
      judgement.result = true;
    }
  }

  // 针对：三王炸弹、天王炸弹
  if (cards.length === 3 || cards.length === 4) {
    result = cards.every((item) => {
      return item === 'joker' || item === 'JOKER';
    });
    if (result) {
      judgement.type = cards.length === 3 ? '三王炸弹' : '天王炸弹';
      judgement.result = true;
    }
  }

  console.log(999, judgement);
  return judgement;
}

// 比较大小
function comparison({ cards, type }, previousCards) {
  if (previousCards.cards.length) {
    if (type === previousCards.type) {
      // 同牌型
      if (ranks.indexOf(cards[0]) > ranks.indexOf(previousCards.cards[0])) {
        return { result: true };
      }
    } else {
      // 不同牌型
      // 我方出了炸弹
      if (type.includes('炸弹')) {
        // 对方出的不是炸弹
        if (!previousCards.type.includes('炸弹')) {
          return { result: true };
        } else {
          // 对方出的也是炸弹，比较炸弹大小（同相级的炸弹比较，在同牌型中已处理）；
          const star1 = bombStarMap[type];
          const star2 = bombStarMap[previousCards.type];
          const length1 = cards.length;
          const length2 = previousCards.cards.length;
          let result = {};
          // 星级相同的情况
          if (star1 === star2) {
            if (length1 === 3) {
              // 我方是三王炸弹
              result = {
                result: false,
                tips: '压不过！！！',
              };
            } else if (cards.includes('joker') && length1 === 4) {
              // 我方是天王炸弹
              result = true;
            } else if (length2 === 3) {
              // 对方是三王炸弹
              result = true;
            } else if (previousCards.cards.includes('joker') && length2 === 4) {
              // 对方是天王炸弹
              result = {
                result: false,
                tips: '压不过！！！',
              };
            } else if (length1 === length2) {
              result = {
                result:
                  ranks.indexOf(cards.at(-1)) -
                    ranks.indexOf(previousCards.cards.at(-1)) >
                  0,
                tips: '压不过！！！',
              };
            } else {
              result = {
                result: length1 - length2 < 0,
                tips: '压不过！！！',
              };
            }
          } else {
            result = {
              result: star1 - star2 > 0,
              tips: '压不过！！！',
            };
          }

          return result;
        }
      } else {
        // console.log('打法不符合游戏规则！！！');
        return {
          result: false,
          tips: `${type} 不能压 ${previousCards.type}`,
        };
      }
    }
  } else {
    return { result: true };
  }
}

export default function analyse(myCards, previousCards) {
  // 先排序（从小到大）
  myCards = sort(myCards);
  previousCards.cards = sort(previousCards.cards);

  let verifyResult: any = {}; // 是否符合牌型规则
  let comparisonResult: any = false; // 牌型的威力大小

  // ---------------------------------------------------牌型规则分析（考虑大王的替换牌）
  // 大王的数量
  const jokerNum = myCards.filter((item) => {
    return item === 'JOKER';
  }).length;
  if (!jokerNum) {
    // 【不存在大王】时，进行牌型校验
    verifyResult = verifyRules(myCards);
  } else {
    // 【存在大王】时，遍历所有大王可替换的牌（从大到小替换，尽可能让牌型的威力最大化），并分别进行牌型校验
    const ranksCopy = ranks.slice().reverse();

    let replaceCard1 = null; // 替换掉第 1 张大王的牌
    let replaceCard2 = null; // 替换掉第 2 张大王的牌

    replaceCard1 = ranksCopy.find((card1) => {
      const indexOfJoker1 = myCards.indexOf('JOKER');
      myCards.splice(indexOfJoker1, 1, card1); // 替换掉第 1 张大王

      console.log(77, myCards);
      if (jokerNum === 1) {
        // 只有 1 张大王
        verifyResult = verifyRules(myCards); // 牌型校验
      } else if (jokerNum === 2) {
        // 有 2 张大王
        replaceCard2 = ranksCopy.find((card2) => {
          const indexOfJoker2 = myCards.indexOf('JOKER');
          myCards.splice(indexOfJoker2, 1, card2); // 替换掉第 2 张大王
          console.log(88, myCards);
          verifyResult = verifyRules(myCards); // 牌型校验
          // 第二张JOKER的本次替换，没通过规则校验，则替换回去
          if (!verifyResult?.result) {
            myCards.splice(indexOfJoker2, 1, 'JOKER');
          }
          return verifyResult?.result;
        });
      }

      // 第一种JOKER的本次替换，没通过规则校验，则替换回去
      if (!verifyResult?.result) {
        myCards.splice(indexOfJoker1, 1, 'JOKER');
      }
      return verifyResult?.result;
    });
    console.log(56, myCards, verifyResult);
  }

  // ---------------------------------------------------牌型威力分析
  if (verifyResult.result) {
    comparisonResult = comparison(
      { cards: myCards, type: verifyResult.type },
      previousCards
    );
    if (comparisonResult.result) {
      return { type: verifyResult.type, result: true };
    } else {
      return {
        type: verifyResult.type,
        ...comparisonResult,
      };
    }
  } else {
    return { type: null, result: false, tips: '不符合任何牌型规则！！！' };
  }
}

// 自动出牌
export function autoMove(myCards, previousCards) {
  // 先排序（从小到大）
  myCards = sort(myCards);

  // todo-ljq，如果都不匹配，则用JOKER遍历替换所有可能的牌；
  const obj = getAllPossibilityCardSets(myCards);

  // todo-ljq 大小比较
  comparison()
}

// 分析出所有牌型的组合（不考虑大王的替换）
export function getAllPossibilityCardSets(cards) {
  // 先排序（从小到大）
  cards = sort(cards);

  const cardsObj = {};
  // 我方拥有每种牌的数量
  const numOfCard = getNumOfCard(cards);

  // 针对【每张牌相同，但相数不同】的牌型：'单牌', '对子', '三张', '相炸弹'
  for (let i = 1; i <= 10; i++) {
    let arr = numOfCard.filter((item) => item.num >= i);
    arr = arr.map((item) => {
      return repeatArr([item.card], i);
    });

    if (i === 1) {
      cardsObj[`单牌`] = arr;
    } else if (i === 2) {
      cardsObj[`对子`] = arr;
    } else if (i === 3) {
      cardsObj[`三张`] = arr;
    } else {
      cardsObj[`${i}相炸弹`] = arr;
    }
  }
  console.log(567, cardsObj);

  // 针对【连环牌，但相数和连环数不同】的牌型：'顺子', '连对', '连三张', '连环炸弹'
  for (let i = 1; i <= 10; i++) {
    let name;
    let min = 3;
    if (i === 1) {
      name = '单牌';
      min = 5;
    } else if (i === 2) {
      name = '对子';
    } else if (i === 3) {
      name = '三张';
    } else if (i >= 4) {
      name = `${i}相炸弹`;
    }
    const arr2 = cardsObj[name].filter((x) => x[0] !== '2'); // 除去2，因为2不能成为连环的一部分
    const indexArr = arr2.map((x) => ranks.indexOf(x[0]));
    const obj = findConsecutiveSubarrays(indexArr, min, Math.floor(27 / i)); // 27 / i，共27张牌，除以相数，得到连环数
    for (const key in obj) {
      cardsObj[`${i}相${key[0]}连环`] = obj[key].map((x) => {
        const cardArr = x.map((y) => ranks[y]);
        return sort(Array(i).fill(cardArr).flat());
      });
    }
  }
  for (const key in cardsObj) {
    if (key.includes('相') && key.includes('连环')) {
      const index1 = key.indexOf('相');
      const index2 = key.indexOf('连环');
      const level = +key.slice(0, index1); // 相数
      const serialNum = key.slice(index1 + 1, index2); // 连续数

      let name;
      if (level === 1) {
        name = `${serialNum}级顺子`;
      } else if (level === 2) {
        name = `${serialNum}级连对`;
      } else if (level === 3) {
        name = `${serialNum}级连三张`;
      } else if (level >= 3) {
        name = `${key}炸弹`;
      }
      cardsObj[name] = cardsObj[key];
      // console.log(88, name, cardsObj[name]);
      delete cardsObj[key];
    }
  }
  console.log(5678, cardsObj);

  // 针对【特殊】的牌型：'三王炸弹', '天王炸弹'
  const jokerNum = cards.filter((x) => x === 'joker').length;
  const jokerNum2 = cards.filter((x) => x === 'JOKER').length;
  cardsObj['三王炸弹'] = [];
  cardsObj['天王炸弹'] = [];
  if (jokerNum === 1 && jokerNum2 === 2) {
    cardsObj['三王炸弹'].push(['joker', 'JOKER', 'JOKER']);
  }
  if (jokerNum === 2 && jokerNum2 === 1) {
    cardsObj['三王炸弹'].push(['joker', 'joker', 'JOKER']);
  }
  if (jokerNum === 2 && jokerNum2 === 2) {
    cardsObj['三王炸弹'].push(
      ['joker', 'JOKER', 'JOKER'],
      ['joker', 'joker', 'JOKER']
    );
    cardsObj['天王炸弹'].push(['joker', 'joker', 'JOKER', 'JOKER']);
  }
  console.log(1010, cardsObj);

  return cardsObj;

  // // 如果我方没有同牌型的牌，判断是否存在威力更大的其他牌型
  // if (cards.length === 0) {
  //   // 对方不是炸弹，找出我方威力最小的炸弹
  //   if (!previousCards.type.includes('炸弹)) {

  //   } else {
  //   // 对方是炸弹，找出我方威力更大的最小炸弹

  //   }
  // }

  // const judgement = verifyRules(cards)
}

// 获得每种牌的数量
function getNumOfCard(cards) {
  const numOfCard = ranks.map((item) => {
    return {
      card: item,
      num: cards.filter((x) => x === item).length,
    };
  });
  return numOfCard;
}

// 数组元素，重复指定次数
function repeatArr(arr, repeatNum) {
  const a: any = [];
  for (let i = 0; i < repeatNum; i++) {
    a.push(arr);
  }
  return a.flat();
}

// 在指定的数组中，找出指定范围的连续数的所有排列组合。比如：指定数组为[1,2,3,4,5,6,7]，指定范围为3-5个连续数，要求return一个对象，内容为:
// {
//   '3个连续数': [[1,2,3],...,[5,6,7]],
//   '4个连续数': [[1,2,3,4],...,[4,5,6,7]],
//   '5个连续数': [[1,2,3,4,5],...,[3,4,5,6,7]],
// }
function findConsecutiveSubarrays(arr, minLen = 3, maxLen = 5) {
  const sortedArr = Array.from(new Set(arr)).sort((a, b) => a - b);
  const result = {};

  // 初始化结果对象的 key
  for (let len = minLen; len <= maxLen; len++) {
    result[`${len}个连续数`] = [];
  }

  // 查找每个长度的连续子数组
  for (let i = 0; i < sortedArr.length; i++) {
    for (let len = minLen; len <= maxLen; len++) {
      const subArr = sortedArr.slice(i, i + len);
      if (subArr.length === len && isConsecutive(subArr)) {
        result[`${len}个连续数`].push(subArr);
      }
    }
  }

  return result;
}

function isConsecutive(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1] + 1) return false;
  }
  return true;
}
