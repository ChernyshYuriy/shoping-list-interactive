const alphabetEng = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const alphabetWestEU = [
  "а",
  "б",
  "в",
  "г",
  "ґ",
  "д",
  "е",
  "ё",
  "є",
  "э",
  "ж",
  "з",
  "и",
  "і",
  "ї",
  "й",
  "ы",
  "к",
  "л",
  "м",
  "н",
  "о",
  "п",
  "р",
  "с",
  "т",
  "у",
  "ф",
  "х",
  "ц",
  "ч",
  "ш",
  "щ",
  "ь",
  "ъ",
  "ю",
  "я",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
];

const allAlphabet = alphabetEng.concat(alphabetWestEU);

export const isProductHaveCorrectTitle = title => {
  console.log(title, 'title');
  const firstLater = title.trim()[0].toLowerCase()
  console.log(typeof(firstLater), firstLater, 'firstLater');
  console.log(allAlphabet.includes(firstLater), 'allAlphabet.include(firstLater)');

  return allAlphabet.includes(firstLater);
}

export const transformedList = (list) => {
  let id = 0;
  console.log(list, "copyList");
  const newList = [];
  list.forEach((item) => {
    // item.title = item.title.trim();
    newList.push({
      ...item,
      id: id++,
      title: item.title.trim(),
      searchLater: item.title[0].toLowerCase(),
    });
  });
  return newList;
};

export const getAllFirstLater = (list) => {

  //char[] alphabet =

  //   console.log(alphabetEng, alphabetWestEU);
  //   console.log(list, "list");

  //   console.log(allAlphabet, "allAlphabet");

  const alphabetSortList = [];

  allAlphabet.forEach((mainLater) => {
    const later = mainLater.toLowerCase();
    list.forEach((item) => {
      // console.log(later === item.searchLater , !alphabetSortList.includes(later), later, item);

      if (later === item.searchLater && !alphabetSortList.includes(later)) {
        alphabetSortList.push(later);
      }
    });
  });

  return alphabetSortList;
};
