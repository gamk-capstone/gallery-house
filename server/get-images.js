const getColors = require("get-image-colors");
const path = require('path')
/**
 * `getMainColors` takes an imageUrl and returns the hsl values of the image's four main colors.
 * @param {*} imageUrl 
 * @returns an array of arrays containing the hsl values of the given image's fourt main colors
 */
const getMainColors = async (imageUrl, imagePath) => {
  const options = {
    count: 4,
    type: "image/jpg",
  };

  const colors = await getColors(path.join(__dirname.slice(0, __dirname.length - 6), imagePath), options);

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