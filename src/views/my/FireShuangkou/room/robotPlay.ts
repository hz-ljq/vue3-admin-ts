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

function sortCards(cards) {
  return cards.slice().sort((a, b) => cardValueMap[a] - cardValueMap[b]);
}

function countCards(cards) {
  const counts = {};
  for (const c of cards) counts[c] = (counts[c] || 0) + 1;
  return counts;
}

function tryBuildWithWild(cards, groupSize, minLen) {
  const res = [];
  const counts = countCards(cards);
  const wildCount = counts['JOKER'] || 0;
  const baseCards = Object.keys(counts).filter(
    (c) => c !== 'JOKER' && c !== 'joker' && c !== '2'
  );
  const values = baseCards.map((c) => cardValueMap[c]).sort((a, b) => a - b);

  for (let i = 0; i <= values.length - minLen; i++) {
    for (let len = minLen; len <= values.length - i; len++) {
      const seq = values.slice(i, i + len);
      let remaining = { ...counts };
      let wildLeft = wildCount;
      const group = [];
      let valid = true;
      for (const v of seq) {
        const card = Object.keys(cardValueMap).find(
          (k) => cardValueMap[k] === v
        );
        const real = Math.min(groupSize, remaining[card] || 0);
        const needWild = groupSize - real;
        if (real + wildLeft < groupSize) {
          valid = false;
          break;
        }
        for (let j = 0; j < real; j++) {
          group.push(card);
        }
        for (let j = 0; j < needWild; j++) {
          group.push('JOKER');
        }
        remaining[card] = (remaining[card] || 0) - real;
        wildLeft -= needWild;
      }
      if (valid) res.push(group);
    }
  }
  return res;
}

function tryBuildBombs(cards) {
  const counts = countCards(cards);
  const wildCount = counts['JOKER'] || 0;
  const bombs = [];
  for (let v = 3; v <= 15; v++) {
    const card = Object.keys(cardValueMap).find((k) => cardValueMap[k] === v);
    const baseCount = counts[card] || 0;
    for (let len = 4; len <= 8; len++) {
      if (baseCount + wildCount >= len) {
        const group = Array(baseCount)
          .fill(card)
          .concat(Array(len - baseCount).fill('JOKER'));
        bombs.push(group);
      }
    }
  }
  return bombs;
}

function genBasicTypes(cards) {
  const counts = countCards(cards);
  const singles = [],
    pairs = [],
    triples = [];
  for (const c in counts) {
    if (counts[c] >= 3) triples.push([c, c, c]);
    if (counts[c] >= 2) pairs.push([c, c]);
    if (counts[c] >= 1) singles.push([c]);
  }
  return { singles, pairs, triples };
}

// 新增 classifyPlay 函数
function classifyPlay(cards, validatePlay) {
  if (!validatePlay(cards)) return 'invalid';

  const len = cards.length;
  const counts = {};
  for (const c of cards) counts[c] = (counts[c] || 0) + 1;
  const uniqueCounts = Object.values(counts).sort((a, b) => b - a);

  if (len === 1) return 'single';
  if (len === 2 && uniqueCounts[0] === 2) return 'pair';
  if (len === 3 && uniqueCounts[0] === 3) return 'triple';

  if (uniqueCounts[0] >= 4) return 'bomb';

  // 特殊炸弹（示意，需结合具体规则）
  if (len === 3 && counts['JOKER'] === 1 && counts['joker'] === 1)
    return 'bomb';
  if (len === 4 && counts['JOKER'] >= 1 && counts['joker'] >= 1) return 'bomb';

  if (len >= 5) return 'sequence';

  return 'other';
}

function genAllCandidates(cards, validatePlay) {
  const sorted = sortCards(cards);
  const basic = genBasicTypes(sorted);
  const sequences = [
    ...tryBuildWithWild(sorted, 1, 5),
    ...tryBuildWithWild(sorted, 2, 3),
    ...tryBuildWithWild(sorted, 3, 3),
  ];
  const bombs = tryBuildBombs(sorted);
  const raw = [
    ...basic.singles,
    ...basic.pairs,
    ...basic.triples,
    ...bombs,
    ...sequences,
  ];

  const unique = new Set();
  const result = [];
  for (const play of raw) {
    const sortedKey = play.slice().sort().join(',');
    if (!unique.has(sortedKey)) {
      const temp = [...cards];
      let ok = true;
      for (const p of play) {
        const idx = temp.indexOf(p);
        if (idx === -1) {
          ok = false;
          break;
        }
        temp.splice(idx, 1);
      }
      if (ok && validatePlay(play)) {
        result.push(play);
        unique.add(sortedKey);
      }
    }
  }
  return result;
}

function robotPlay(
  handCards,
  lastPlay,
  validatePlay,
  comparePlay,
  gameStage = 'early'
) {
  const candidates = genAllCandidates(handCards, validatePlay);
  if (candidates.length === 0) return [];

  if (!lastPlay || lastPlay.length === 0) {
    const handCounts = countCards(handCards);

    function isSafePlay(play) {
      const temp = { ...handCounts };
      for (const card of play) temp[card]--;
      for (const c in temp) {
        if (handCounts[c] >= 2 && temp[c] === 1) return false; // 拆对
        if (handCounts[c] >= 3 && temp[c] === 2) return false; // 拆三张
      }
      return true;
    }

    const nonBombs = candidates.filter(
      (c) => !(c.length >= 4 && new Set(c).size === 1)
    );
    const safeNonBombs = nonBombs.filter(isSafePlay);
    const choices =
      safeNonBombs.length > 0
        ? safeNonBombs
        : nonBombs.length > 0
        ? nonBombs
        : candidates;

    function weight(candidate) {
      const len = candidate.length;
      const unique = new Set(candidate);
      const filtered = candidate.filter((c) => c !== 'JOKER');
      const minVal =
        filtered.length > 0
          ? Math.min(...filtered.map((c) => cardValueMap[c]))
          : 0;

      if (minVal >= 15) return 0.3;

      if (len >= 5) return 1.5;
      if (len === 2) return 1.2;
      if (len === 3 && unique.size === 1) return 0.5;

      return 1.0;
    }

    let total = 0;
    for (const c of choices) total += weight(c);
    let r = Math.random() * total;
    for (const c of choices) {
      r -= weight(c);
      if (r <= 0) return c;
    }
    return choices[0];
  }

  const playable = candidates.filter((c) => comparePlay(lastPlay, c));
  if (playable.length === 0) return [];

  playable.sort((a, b) => {
    const typeA = classifyPlay(a, validatePlay);
    const typeB = classifyPlay(b, validatePlay);
    if (typeA !== typeB) return typeA.localeCompare(typeB);
    const maxA = Math.max(
      ...a.filter((c) => c !== 'JOKER').map((c) => cardValueMap[c])
    );
    const maxB = Math.max(
      ...b.filter((c) => c !== 'JOKER').map((c) => cardValueMap[c])
    );
    if (maxA !== maxB) return maxA - maxB;
    return a.length - b.length;
  });

  return playable[0];
}

export { robotPlay, genAllCandidates, classifyPlay };
