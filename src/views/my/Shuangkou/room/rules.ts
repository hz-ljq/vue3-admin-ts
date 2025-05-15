const ranks: any = [
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
  'JOKER',
];

// 扑克牌排序（从小到大）
function sort(arr: any[]) {
  return arr.sort((a, b) => {
    return ranks.indexOf(a) - ranks.indexOf(b);
  });
}

// 基本规则
function rule1(cards) {
  // 先排序
  cards = sort(cards);
  let result = false;
  // ------------------------------------------符合的规则，如下：、
  // （无论几张牌）每张牌都相同
  result = cards.every((item) => {
    return item === cards[0];
  });
  console.log(22, result);
  // 5-12张牌的顺子
  if (cards.length >= 5 && cards.length <= 12) {
    result = cards.every((item, index) => {
      // 不能出现2和JOKER
      const flag1 = !['2', 'JOKER'].includes(item);
      // 每张牌都比前一张大1的单位
      const flag2 =
        index === 0
          ? true
          : ranks.indexOf(cards[index]) - ranks.indexOf(cards[index - 1]) === 1;
      return flag1 && flag2;
    });
  }
  //

  return result;
}

// 比较大小
function comparison(myCards, previousCards ) {
  // todo-ljq 首先，判断是否符合基本规则
  const flag1 = rule1(myCards)
  return flag1;
}

export default function matchRules(myCards, previousCards = []) {
  return comparison(myCards, previousCards);
}
