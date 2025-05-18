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

// 扑克牌排序（从小到大）
function sort(arr: any[]) {
  return arr.slice().sort((a, b) => {
    return ranks.indexOf(a) - ranks.indexOf(b);
  });
}

// 基本规则
function verifyRules(cards) {
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
        : cards.length === 4
        ? '4仙炸弹'
        : cards.length === 5
        ? '5仙炸弹'
        : cards.length === 6
        ? '6仙炸弹'
        : cards.length === 7
        ? '7仙炸弹'
        : cards.length === 8
        ? '8仙炸弹'
        : cards.length === 9
        ? '9仙炸弹'
        : cards.length === 10
        ? '10仙炸弹'
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

  // 针对：4-8仙蝴蝶炸弹（333344445555...AAAA、...、333333334444444455555555...AAAAAAAA）
  if (cards.length >= 12) {
    // 先判断出是几仙？
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
      judgement.type = `${cards.length / whichLevel}级${whichLevel}仙蝴蝶炸弹`;
      judgement.result = true;
    }
  }

  // 针对：三王炸弹、四王炸弹
  if (cards.length === 3 || cards.length === 4) {
    result = cards.every((item) => {
      return item === 'joker' || item === 'JOKER';
    });
    if (result) {
      judgement.type = cards.length === 3 ? '三王炸弹' : '四王炸弹';
      judgement.result = true;
    }
  }

  console.log(999, judgement);
  return judgement;
}

// 比较大小
function comparison({ cards, type }, previousCards) {
  if (type === previousCards.type) {
    // 同牌型
    if (ranks.indexOf(cards[0]) > ranks.indexOf(previousCards.cards[0])) {
      // 比上一手的牌大
      return true;
    }
  } else {
    // 不同牌型
    // 我方出了炸弹
    if (type.includes('炸弹')) {
      // 对方出的不是炸弹
      if (!previousCards.type.includes('炸弹')) {
        return true;
      } else {
      // todo-ljq 对方出的也是炸弹，比较不同仙级炸弹或不同类别炸弹之间的大小（同仙级的炸弹比较，在同牌型中已处理）；

      }
    } else {
      console.log('不符合规则，请出符合规则的牌');
      return false;
    }
  }

  return false;
}

export default function analyse(myCards, previousCards) {
  // 先排序
  myCards = sort(myCards);

  let verifyResult: any = {}; // 是否符合牌型规则
  let comparisonResult = false; // 牌型的威力大小

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

      if (jokerNum === 1) {
        // 只有 1 张大王
        verifyResult = verifyRules(myCards); // 牌型校验
        return verifyResult?.result;
      } else if (jokerNum === 2) {
        // 有 2 张大王
        replaceCard2 = ranksCopy.find((card2) => {
          const indexOfJoker2 = myCards.indexOf('JOKER');
          myCards.splice(indexOfJoker2, 1, card2); // 替换掉第 2 张大王
          verifyResult = verifyRules(myCards); // 牌型校验
          return verifyResult?.result;
        });
        return replaceCard2;
      }
    });
    console.log(56, myCards, verifyResult);
  }

  // ---------------------------------------------------牌型威力分析
  if (verifyResult.result) {
    comparisonResult = comparison(
      { cards: myCards, type: verifyResult.type },
      previousCards
    );
    if (comparisonResult) {
      return { type: verifyResult.type, result: true };
    } else {
      // console.log('压不过');
      return { type: verifyResult.type, result: false, tips: '压不过' };
    }
  } else {
    // console.log('不符合牌型规则');
    return { type: null, result: false, tips: '不符合牌型规则' };
  }
}
