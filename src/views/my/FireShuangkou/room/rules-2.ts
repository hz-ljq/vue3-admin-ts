export function validatePlay(cards) {
  // 牌值映射
  const cardValueMap = {
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
    2: 15,
    joker: 16, // 小王，普通牌
    JOKER: 17, // 大王，万能牌
  };

  // 统计牌数
  const counts = {};
  let wildCount = 0;
  for (const c of cards) {
    const v = cardValueMap[c];
    if (v === 17) wildCount++;
    else counts[v] = (counts[v] || 0) + 1;
  }

  const total = cards.length;
  const vals = Object.keys(counts)
    .map(Number)
    .sort((a, b) => a - b);
  const valCountMap = {};
  for (let i = 3; i <= 15; i++) valCountMap[i] = counts[i] || 0;

  // 三王炸弹（3个王，不含其他牌）
  if (total === 3 && wildCount + (counts[16] || 0) === 3)
    return 'three-king-bomb';

  // 天王炸弹（2个大王 + 2个小王）
  if (total === 4 && wildCount === 2 && counts[16] === 2) return 'heaven-bomb';

  // 炸弹（4张及以上相同牌，可用大王补）
  for (let val = 3; val <= 15; val++) {
    const c = counts[val] || 0;
    if (c + wildCount >= 4 && c + wildCount === total) return 'bomb';
  }

  // 连环炸弹（X相Y连环炸弹，Y组连续点数，每组X张，X>=4，Y>=3）
  for (let x = 4; x <= 8; x++) {
    // X相
    for (let start = 3; start <= 15 - 3; start++) {
      // 最多支持到A
      let valid = true;
      let totalNeeded = 0;
      for (let y = 0; y < 6; y++) {
        // 最多6连
        const v = start + y;
        if (v > 14) break; // 不包含2及以上
        const have = counts[v] || 0;
        if (have >= x) {
          totalNeeded += x;
        } else if (have + wildCount >= x) {
          totalNeeded += x;
        } else {
          if (y >= 3) break; // 允许中断后前面的算
          valid = false;
          break;
        }
        if (totalNeeded === total) {
          return 'chain-bomb';
        }
      }
    }
  }

  // 单张
  if (total === 1) return 'single';

  // 对子（允许用1个大王补）
  if (total === 2) {
    if (vals.length === 1 && counts[vals[0]] === 2) return 'pair';
    if (vals.length === 1 && counts[vals[0]] === 1 && wildCount === 1)
      return 'pair';
  }

  // 三张（允许用大王补）
  if (total === 3) {
    if (vals.length === 1 && counts[vals[0]] === 3) return 'triple';
    if (vals.length === 1 && counts[vals[0]] + wildCount === 3) return 'triple';
  }

  // 顺子：5张及以上连续单张，不能含2、小王、大王，允许大王补
  for (let start = 3; start <= 10; start++) {
    let len = 0,
      wild = wildCount;
    for (let i = start; i <= 14; i++) {
      const c = valCountMap[i];
      if (c >= 1) len++;
      else if (wild > 0) {
        wild--;
        len++;
      } else break;
      if (len >= 5 && len === total) return 'straight';
    }
  }

  // 连对：3组及以上连续对子，不能含2、小王、大王，允许大王补
  for (let start = 3; start <= 12; start++) {
    let len = 0,
      wild = wildCount;
    for (let i = start; i <= 14; i++) {
      const c = valCountMap[i];
      if (c >= 2) len++;
      else if (c === 1 && wild >= 1) {
        wild--;
        len++;
      } else if (c === 0 && wild >= 2) {
        wild -= 2;
        len++;
      } else break;
      if (len >= 3 && len * 2 === total) return 'double-seq';
    }
  }

  // 连三张：3组及以上连续三张，允许大王补
  for (let start = 3; start <= 12; start++) {
    let len = 0,
      wild = wildCount;
    for (let i = start; i <= 14; i++) {
      const c = valCountMap[i];
      if (c >= 3) len++;
      else if (c > 0 && c < 3 && wild >= 3 - c) {
        wild -= 3 - c;
        len++;
      } else if (c === 0 && wild >= 3) {
        wild -= 3;
        len++;
      } else break;
      if (len >= 3 && len * 3 === total) return 'triple-seq';
    }
  }

  return false; // 不是合法牌型
}

// // 例子测试
// console.log(validatePlay(['JOKER', 'JOKER', 'joker', 'joker'])); // heaven-bomb
// console.log(validatePlay(['JOKER', 'JOKER', 'JOKER'])); // three-king-bomb
// console.log(validatePlay(['7', '7', '7', '7', 'JOKER'])); // bomb
// console.log(validatePlay(['5', '5', '6', '6', '7', '7', '8', 'JOKER'])); // double-seq
// console.log(validatePlay(['3', '4', '5', '6', '7'])); // straight
// console.log(validatePlay(['3', '3', '3', '4', '4', '4', '5', '5', 'JOKER'])); // triple-seq
// console.log(
//   validatePlay(['3', '3', '3', '3', '4', '4', '4', '4', '5', '5', '5', 'JOKER'])
// ); // chain-bomb

// 火拼双扣牌型比较函数 + 连环炸弹结构比较修复 + 星级严格比对
export function comparePlay(play1, play2) {
  if (!play1.length) {
    return validatePlay(play2)
  }

  const typeRank = {
    single: 1,
    pair: 2,
    triple: 3,
    straight: 4,
    'double-seq': 5,
    'triple-seq': 6,
    bomb: 7,
    'three-king-bomb': 8, // 实际为6星
    'chain-bomb': 9, // 星级 = X + Y
    'heaven-bomb': 10, // 实际为7星中最大
  };

  const cardValueMap = {
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
    '2': 15,
    joker: 16,
    JOKER: 17,
  };

  function getMaxCardValue(cards) {
    return Math.max(...cards.map((c) => cardValueMap[c]));
  }

  function explainChainBomb(cards) {
    const counts = {};
    let wildCount = 0;
    for (const c of cards) {
      const v = cardValueMap[c];
      if (v === 17) wildCount++;
      else if (v <= 14) counts[v] = (counts[v] || 0) + 1;
    }

    const result = [];
    let maxRank = 0;

    for (let x = 4; x <= 8; x++) {
      for (let start = 3; start <= 14; start++) {
        let wild = wildCount;
        let y = 0;
        let group = [];
        let i = start;
        while (i <= 14) {
          const need = x;
          const have = counts[i] || 0;
          if (have >= need) {
            group.push({ val: i, real: have, wild: 0 });
            y++;
          } else if (have + wild >= need) {
            group.push({ val: i, real: have, wild: need - have });
            wild -= need - have;
            y++;
          } else {
            break;
          }
          if (y >= 3) {
            const rank = x + y;
            if (rank > maxRank) {
              result.length = 0;
              result.push({ rank, X: x, Y: y, group });
              maxRank = rank;
            }
          }
          i++;
        }
      }
    }
    return result.length ? result[0] : null;
  }

  function getStarLevel(type, cards) {
    if (type === 'three-king-bomb') return 6;
    if (type === 'heaven-bomb') return 7.1; // 特例大于普通 7 星
    if (type === 'chain-bomb') {
      const info = explainChainBomb(cards);
      return info ? info.rank : 0;
    }
    if (type === 'bomb') {
      const counts = {};
      for (const c of cards) {
        const v = cardValueMap[c];
        if (v < 17) counts[v] = (counts[v] || 0) + 1;
      }
      return Math.max(...Object.values(counts)); // X相炸弹 → 星级 = X
    }
    return 0;
  }

  const type1 = validatePlay(play1);
  const type2 = validatePlay(play2);

  if (!type1 || !type2) return false;

  if (type1 === type2) {
    if (play1.length !== play2.length) return false;
    const star1 = getStarLevel(type1, play1);
    const star2 = getStarLevel(type2, play2);
    if (star1 !== star2) return star2 > star1;

    if (type1 === 'chain-bomb') {
      const g1 = explainChainBomb(play1);
      const g2 = explainChainBomb(play2);
      const max1 = g1.group[g1.group.length - 1].val;
      const max2 = g2.group[g2.group.length - 1].val;
      return max2 > max1;
    }

    const max1 = getMaxCardValue(play1);
    const max2 = getMaxCardValue(play2);
    return max2 > max1;
  }

  const star1 = getStarLevel(type1, play1);
  const star2 = getStarLevel(type2, play2);

  // 🔒 只有更高星级的炸弹才能压制低星炸弹或其他
  if (star2 >= 4 && star2 > star1) return true;
  if (star2 >= 4 && star1 >= 4) {
    if (star2 !== star1) return star2 > star1;
    if (play2.length !== play1.length) return play2.length < play1.length;
    const max1 =
      type1 === 'chain-bomb'
        ? explainChainBomb(play1).group.slice(-1)[0].val
        : getMaxCardValue(play1);
    const max2 =
      type2 === 'chain-bomb'
        ? explainChainBomb(play2).group.slice(-1)[0].val
        : getMaxCardValue(play2);
    return max2 > max1;
  }

  return false;
}
