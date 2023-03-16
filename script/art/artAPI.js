// /**
//  * This is where I keep the Images component.
//  */
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { selectImages, fetchImageAsync } from "./imagesSlice";

// const Images = () => {
//   const dispatch = useDispatch();
//   const images = useSelector(selectImages);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     dispatch(fetchImageAsync());
//     setLoading(false);
//   }, [dispatch]);

//   return loading ? (
//     <div>Loading...</div>
//   ) : (
//     <div>
//       Hello World!
//       {/* <div>{images.map((image)=> {
//         return (
//           <img src={image} alt=""></img>
//         )
//       })}</div> */}
//     </div>
//   );
// };

// export default Images;
