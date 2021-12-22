export const coder = (text_for_coding, isDecoding = false) => {
  let result = "";

// console.log(text_for_coding.split(''), `text_for_coding.split('')`);
let coding_text = text_for_coding.split('')

// for (let index = 0; index < 10; index++) {
//   if (!text_for_coding.split('').includes(index) && index%2 === 0) {
//     coding_text = coding_text + index
//   }else if (!text_for_coding.split('').includes(index) && index%2 !== 0) {
//     coding_text = index + coding_text
//   }
// }



const alphabetEng = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];


if (isDecoding === true) {
  let deCoded = []
  coding_text.splice(0, 6); 
  coding_text.length = 4; 

  coding_text.forEach(item => {
    // console.log(alphabetEng.indexOf(item), 'alphabetEng.indexOf(item)');

    deCoded.push(alphabetEng.indexOf(item));
  });
  // console.log(deCoded, 'deCoded');
  
  coding_text = deCoded.map(item => (item - 6) / 2)
} else {
  coding_text = coding_text.map(item => alphabetEng[(item * 2) + 6 ])
  for (let index = 0; index < 10; index++) {
    // console.log(Math.floor(Math.random() * 26), index , `random ${index} ${alphabetEng.length}`);    
    if (index >= 4) {
      coding_text.unshift(alphabetEng[Math.floor(Math.random() * 26)])
      // console.log(coding_text, 'coding_text');
    }else{
      coding_text.push(alphabetEng[Math.floor(Math.random() * 26)])
      // console.log(coding_text, 'coding_text');
    }
  }
}

// console.log(coding_text, 'coding_text');





// console.log(coding_text, 'coding_text');

  // let save_latter = "";
  for (let index = 0; index < coding_text.length; index++) {
    // console.log(save_latter, "save_latter");

    if (index !== coding_text.length - 2) {
    }
    if (Number.isInteger(index / 2) && index !== coding_text.length - 1) {
      // console.log(1);
      result += coding_text[index + 1];
    } else if (!Number.isInteger(index / 2)) {
      // console.log(2);
      result += coding_text[index - 1];
    } else {
      result += coding_text[index];
    }
    // console.log(result, "result");
  }


console.log(result, 'result');
  return result
};
