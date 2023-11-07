const calculateDiceScore = require('.');

describe('calculateDiceScore', () => {
    it('returns 50 for a YAMS (five of a kind)', () => {
        expect(calculateDiceScore([2, 2, 2, 2, 2])).toBe(50);
    });

    it('handles non-sorted dice input for sequences', () => {
        expect(calculateDiceScore([5, 4, 3, 2, 1])).toBe(40);
    });

    it('returns 40 for a Grande Suite (sequence of five)', () => {
        expect(calculateDiceScore([1, 2, 3, 4, 5])).toBe(40);
    });

    it('returns 40 for a Grande Suite (sequence of five)', () => {
        expect(calculateDiceScore([1, 2, 3, 4, 5])).toBe(40);
    });

    it('returns the highest score if multiple combinations are possible', () => {
        expect(calculateDiceScore([2, 2, 2, 2, 3])).toBe(35);
    });

    it('returns 35 for a Carré (four of a kind)', () => {
        expect(calculateDiceScore([4, 4, 4, 4, 6])).toBe(35);
    });

    it('returns 30 for a Full (three of a kind and a pair)', () => {
        expect(calculateDiceScore([3, 3, 3, 5, 5])).toBe(30);
    });

    it('returns 28 for a Brelan (three of a kind)', () => {
        expect(calculateDiceScore([2, 2, 2, 3, 4])).toBe(28);
    });

    it('returns the sum for Chance (no combination)', () => {
        expect(calculateDiceScore([2, 3, 4, 4, 6])).toBe(19);
    });

    it('returns the sum for Chance (no combination)', () => {
        expect(calculateDiceScore([1, 1, 2, 3, 4])).toBe(11);
    });

    it('throws an error for invalid dice values', () => {
        expect(() => calculateDiceScore([0, 1, 2, 3, 4])).toThrow('Die values must be between 1 and 6.');
    });

    it('throws an error for an incorrect number of dice', () => {
        expect(() => calculateDiceScore([1, 2, 3, 4])).toThrow('Dice rolls should be an array of 5 integers.');
    });

    it('throws an error for non-integer values in the dice array', () => {
        expect(() => calculateDiceScore([1, 'two', 3, 4, 5])).toThrow('Dice rolls must contain only integer values.');
    });
});
