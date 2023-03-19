// import React, { useState } from 'react';
// import getImageColors from 'get-image-colors';

// const ColorPaletteSelector = () => {
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [colors, setColors] = useState([]);

//     const fileSelectedHandler = (event) => {
//       setSelectedFile(event.target.files[0])
//     };

//     const fileUploadHandler = () => {
//       const fd = new FormData();
//       fd.append('image', selectedFile, selectedFile.name)
//     };
//     // Update the state with the colors
//     //setColors(imageColors.map(color => color.hsl()));

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={fileSelectedHandler()} />
//       <button onClick={fileUploadHandler}>Upload</button>
//       {/* {colors.map((color, index) => (
//         <div key={index} style={{ backgroundColor: color }}>
//           {color}
//         </div>
//       ))} */}
//     </div>
//   );
// };

// export default ColorPaletteSelector;