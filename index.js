function calculateDiceScore(dice) {
    if (!Array.isArray(dice) || dice.length !== 5) {
        throw new Error('Incorrect number of dice');
    }

    if (dice.some(die => !Number.isInteger(die))) {
        throw new Error('Non-integer values present');
    }

    const sortedDice = dice.slice().sort((a, b) => a - b);

    const diceCounts = sortedDice.reduce((counts, die) => {
        if (die < 1 || die > 6) {
            throw new Error('Invalid dice values');
        }
        counts[die] = (counts[die] || 0) + 1;
        return counts;
    }, {});

    const counts = Object.values(diceCounts);

    // Check for YAMS
    if (counts.includes(5)) return 50;

    // Check for Grande Suite
    if (JSON.stringify(sortedDice) === JSON.stringify([1, 2, 3, 4, 5]) ||
        JSON.stringify(sortedDice) === JSON.stringify([2, 3, 4, 5, 6])) {
        return 40;
    }

    // Check for Carré
    if (counts.includes(4)) return 35;

    // Check for Full

    if (counts.includes(3) && counts.includes(2)) return 30;

    // Check for Brelan
    if (counts.includes(3)) return 28;

    // If no combination, return Chance (sum of all dice)
    return sortedDice.reduce((sum, die) => sum + die, 0);
}

module.exports = calculateDiceScore;
