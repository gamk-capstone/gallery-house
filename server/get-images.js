const getColors = require("get-image-colors");

const getMainColors = async (imageUrl) => {
  const options = {
    count: 4,
    type: "image/jpg",
  };

  const colors = await getColors(imageUrl, options);

  const getHslValues = (colors) => {
    // `colors` is an array of color objects
    let colorArr = [];
    colors.map((color) => {
      colorArr.push(color.hsl());
    });
    return colorArr;
  };

  const newColors = (hslArr) => {
    var orgHslNums = [];
    for (let i = 0; i < hslArr.length; i++) {
      orgHslNums.push(Number(hslArr[i]));
    }
    const h = orgHslNums[0];
    const s = orgHslNums[1];
    const l = orgHslNums[2];
    const o = orgHslNums[3];
    return [Math.floor(h), Math.floor(s * 100), Math.floor(l * 100), o];
  };

  const hslArr = getHslValues(colors);

  let newArr = [];
  hslArr.map((arr) => {
    newArr.push(newColors(arr));
  });

  return newArr;
};

module.exports = getMainColors;