const craeateElements = (arr) => {
  const htmlElements = arr.map((el) => `<span>${el}</span>`);
  console.log(htmlElements.join(""));
};

const synonyms = ["hi", "hellow", "konnichiwa"];

craeateElements(synonyms);
