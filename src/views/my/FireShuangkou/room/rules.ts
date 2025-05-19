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
  '1相炸弹': 1,
  '2相炸弹': 2,
  '3相炸弹': 3,
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
  // 先排序
  cards = sort(cards);

  const judgement: any = {
    type: null, // 牌型
    result: false, // 是否符合全部规则
  };
  // ■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□■□ 符合的规则，如下：、
  // 针对：单牌、对子、三条、炸弹
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
        ? '三条'
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
        // 比上一手的牌大
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
  // 先排序
  myCards = sort(myCards);

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
function autoMove(myCards, previousCards) {
  // 先排序
  myCards = sort(myCards);

  // todo-ljq 得到所有同牌型的组合
  // todo-ljq 得到所有炸弹的组合
  // fixme-ljq 别忘了JOKER能当万能牌😆；（先用基本匹配的方式，如果都不匹配，再用JOKER遍历替换所有可能的牌来进行基本匹配）

  // ljq，先match()，如果都不匹配，则用JOKER遍历替换所有可能的牌，并分别进行match()；
  match(myCards, previousCards);

  // // 大王的数量
  // const jokerNum = myCards.filter((item) => {
  //   return item === 'JOKER';
  // }).length;
  // if (!jokerNum) {
  //   // 【不存在大王】时，进行牌型校验
  //   verifyResult = verifyRules(myCards);
  // } else {
  //   // 【存在大王】时，遍历所有大王可替换的牌（从大到小替换，尽可能让牌型的威力最大化），并分别进行牌型校验
  //   const ranksCopy = ranks.slice().reverse();

  //   let replaceCard1 = null; // 替换掉第 1 张大王的牌
  //   let replaceCard2 = null; // 替换掉第 2 张大王的牌

  //   replaceCard1 = ranksCopy.find((card1) => {
  //     const indexOfJoker1 = myCards.indexOf('JOKER');
  //     myCards.splice(indexOfJoker1, 1, card1); // 替换掉第 1 张大王

  //     console.log(77, myCards);
  //     if (jokerNum === 1) {
  //       // 只有 1 张大王
  //       verifyResult = verifyRules(myCards); // 牌型校验
  //     } else if (jokerNum === 2) {
  //       // 有 2 张大王
  //       replaceCard2 = ranksCopy.find((card2) => {
  //         const indexOfJoker2 = myCards.indexOf('JOKER');
  //         myCards.splice(indexOfJoker2, 1, card2); // 替换掉第 2 张大王
  //         console.log(88, myCards);
  //         verifyResult = verifyRules(myCards); // 牌型校验
  //         // 第二张JOKER的本次替换，没通过规则校验，则替换回去
  //         if (!verifyResult?.result) {
  //           myCards.splice(indexOfJoker2, 1, 'JOKER');
  //         }
  //         return verifyResult?.result;
  //       });
  //     }

  //     // 第一种JOKER的本次替换，没通过规则校验，则替换回去
  //     if (!verifyResult?.result) {
  //       myCards.splice(indexOfJoker1, 1, 'JOKER');
  //     }
  //     return verifyResult?.result;
  //   });
  //   // console.log(56, myCards, verifyResult);
  // }
}

function match(myCards, previousCards) {
  let cards: any = [];

  if (previousCards.type.includes('单牌')) {
    const item = myCards.find((card) => {
      return ranks.indexOf(card) > ranks.indexOf(previousCards.cards[0]);
    });
    if (item) {
      cards = [item];
    }
  } else if (previousCards.type.includes('对子')) {
    const item = myCards.find((card, index) => {
      return (
        ranks.indexOf(card) > ranks.indexOf(previousCards.cards[0]) &&
        card === myCards[index + 1]
      );
    });
    if (item) {
      cards = [item, item];
    }
  } else if (previousCards.type.includes('三条')) {
  } else if (previousCards.type.includes('相炸弹')) {
  } else if (previousCards.type.includes('顺子')) {
  } else if (previousCards.type.includes('连对')) {
  } else if (previousCards.type.includes('连三张')) {
  } else if (previousCards.type.includes('连环炸弹')) {
  } else if (previousCards.type.includes('三王炸弹')) {
  } else if (previousCards.type.includes('天王炸弹')) {
  }
}
