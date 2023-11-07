function calculateDiceScore(diceRolls) {
    if (!Array.isArray(diceRolls) || diceRolls.length !== 5) {
        throw new Error('Dice rolls should be an array of 5 integers.');
    }

    if (diceRolls.some(die => !Number.isInteger(die))) {
        throw new Error('Dice rolls must contain only integer values.');
    }

    const sortedDiceRolls = diceRolls.slice().sort((firstDie, secondDie) => firstDie - secondDie);

    const diceValueCounts = sortedDiceRolls.reduce((valueCounts, dieValue) => {
        if (dieValue < 1 || dieValue > 6) {
            throw new Error('Die values must be between 1 and 6.');
        }
        valueCounts[dieValue] = (valueCounts[dieValue] || 0) + 1;
        return valueCounts;
    }, {});


    const countOccurrences = Object.values(diceValueCounts);

    // Check for YAMS (five of a kind)
    if (countOccurrences.includes(5)) return 50;

    // Check for Grande Suite (large straight)
    if (JSON.stringify(sortedDiceRolls) === JSON.stringify([1, 2, 3, 4, 5]) ||
        JSON.stringify(sortedDiceRolls) === JSON.stringify([2, 3, 4, 5, 6])) {
        return 40;
    }

    // Check for Carré (four of a kind)
    if (countOccurrences.includes(4)) return 35;

    // Check for Full (full house)
    if (countOccurrences.includes(3) && countOccurrences.includes(2)) return 30;

    // Check for Brelan (three of a kind)
    if (countOccurrences.includes(3)) return 28;

    // If no combination, return Chance (sum of all dice)
    return sortedDiceRolls.reduce((total, currentDieValue) => total + currentDieValue, 0);
}

module.exports = calculateDiceScore;
