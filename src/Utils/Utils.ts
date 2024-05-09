import { PasswordType } from "../App";
import { Groups, GROUPS } from "./Constants";

// Generate a random number from 0 to the arg
export const getRandomNum = (num: number) => {
  return Math.floor(Math.random() * num);
}

// given an array of selected options, get the allow characters from the global Groups variable
/* arr=['memorable', 'numbers'] ===> {
  * memorable: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  * numbers: '1234567890'
  * }
*/
export const getSelectedOptions = (arr: string[]) => {
  const final: Partial<Groups> = {};

  arr.forEach(option => {
    if (option === PasswordType.random) {
      final.memorable = GROUPS.memorable;
    } else {
      final[option as keyof Groups] = GROUPS[option as keyof Groups];
    }
  });

  return final;
}

// This function makes sure the generated password has at least one value from each category
/* arg = {
  * memorable: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  * numbers: '1234567890'
  * }
  * output = ['z', '4']
*/
export const getRequiredCriteria = (selectedGroups: Groups) => {
  const final = [];

  for (let crit in selectedGroups) {
    const critGroup = selectedGroups[crit as keyof Groups];

    if (critGroup) {
      const randomNum = getRandomNum(critGroup.length);
      final.push(critGroup[randomNum]);
    }
  }

  return final;
};

export const shuffle = (arr: string[]) => {
  // Fisher–Yates (aka Knuth) Shuffle.
  const final = [...arr];
  let currentIndex = arr.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [final[currentIndex], final[randomIndex]] = [final[randomIndex], final[currentIndex]];
  }

  return final;
};

// This function generates a randpm password according to a user's selection
export const passwordGenerator = (len: number, group: string[]) => {
  const selectedGroups = getSelectedOptions(group);
  const criteria: string[] = getRequiredCriteria(selectedGroups as Groups); 
  const combined = Object.values(selectedGroups).join('');

  while(criteria.length < len) {
    const randomNum = getRandomNum(combined.length);
    criteria.push(combined[randomNum]);
  }

  return shuffle(criteria).join('');
};
