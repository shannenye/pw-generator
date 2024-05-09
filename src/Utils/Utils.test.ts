import {
  getRandomNum,
  shuffle,
  getSelectedOptions,
  getRequiredCriteria,
  passwordGenerator
} from './Utils';
import { PasswordOptions, PasswordType } from '../App';

describe('getRandomNum', () => {
  it('should return a random number less than the input number', () => {
    const num = 10;
    const result = getRandomNum(num);

    expect(result).toBeLessThan(num);
  });

  it('should return a random number greater than or equal to 0', () => {
    const num = 8;
    const result = getRandomNum(num);

    expect(result).toBeGreaterThanOrEqual(0);
  });
});

describe('getSelectedOptions', () => {
  it('Should return an object containing the options the user has selected', () => {
    const arr = [PasswordType.random, PasswordOptions.numbers];
    const data = getSelectedOptions(arr);
    const expected = {
      memorable: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '1234567890'
    };

    expect(data).toEqual(expected);
  });
});

describe('getRequiredCriteria', () => {
  it('Should get one character from each group of options so that the text can meet the minimum requirements', () => {
    const selected = {
      memorable: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '1234567890'
    };
    const data = getRequiredCriteria(selected);

    expect(data).toHaveLength(2);
  });
});

describe('shuffle', () => {
  it('Should return an array of elements in a shuffled order with the specified length', () => {
    const originalArr = ['a', '@', '>', '['];
    const data = shuffle(originalArr);

    expect(data).toHaveLength(4);
    expect(data).not.toEqual(originalArr);
  });
});

describe('passwordGenerator', () => {
  it('Should generate a random password according to the given criteria', () => {
    const len = 8;
    const data = passwordGenerator(len, ['random', 'number', 'symbols']);

    expect(data).toHaveLength(len);
  });
});
