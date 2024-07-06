const toArray = (object) => {
  let tempArr = [];
  for (let key in object) {
    tempArr.push(object[key]);
  }
  return tempArr;
};

module.exports = { toArray };
