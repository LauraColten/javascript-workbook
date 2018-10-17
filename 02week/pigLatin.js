'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const VOWELS = ['a', 'e', 'i', 'o', 'u']

/*Function planning
bool function isVowel
  if vowel array.split
  then array.push 'y' 'a' 'y' to the end
bool function isConsonant
  if consonant array.split
  then array.pop[index0] consonant(s)
  next array.push 'consonant(s)' 'a' 'y' to the end
*/

/*function isValid(str) {
  const arr = [answer];
  document.write(arr);
  const letters = arr.split('');
  vowels = ['a', 'e', 'i', 'o', 'u']
  consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
  for (index = 0; index < arr.length; index++) {
    if (letters === !vowels || letters === !consonants) {
      console.log('Please enter a valid word.');
      return getPrompt();
    }
  }

}*/



// function isVowel(arr) {
//   vowels = ['a', 'e', 'i', 'o', 'u']
//   for (index = 0; index < arr.length; index++) {
//     if (vowels.indexOf(arr[index]) === 0) {
//       if (vowels.indexOf(arr[index]) === 1)) {
//     return arr.push('yay');
//     } else {
      
//     }
//   }
// }


function pigLatin(word) {
  word = word.toLowerCase().trim();
  const breakPoint = firstVowel(word); 
  const firstPart = word.slice(0, breakPoint); 
  const secondPart = word.slice(breakPoint);
  if (breakPoint === 0) {
    return word + 'yay';
  }
  return secondPart + firstPart + 'ay';
}

function firstVowel(word) {
  let vowelIndex = -1;
  for (let index = 0; index < VOWELS.length; index++) {
    if ((word.indexOf(VOWELS[index]) !== -1 && word.indexOf(VOWELS[index]) < vowelIndex) || vowelIndex === -1) {
      vowelIndex = word.indexOf(VOWELS[index]);
    }
  }
  return vowelIndex;    
}

function getPrompt() {
  rl.question('word ', (answer) => {
    console.log(pigLatin(answer));
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
