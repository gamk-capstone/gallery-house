import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//Imported Components
import FiveImgGalleryWall from "../galleryWall/FiveImgGalleryWall";
import SixImgGalleryWall from "../galleryWall/SixImgGalleryWall";
import SevenImgGalleryWall from "../galleryWall/SevenImgGalleryWall";
import EightImgGalleryWall from "../galleryWall/EightImgGalleryWall";

//Imported Files
import {
  fetchSingleWallAsync,
  selectSavedWall,
} from "../savedWall/savedWallSlice";

const SavedWall = () => {
  const { id } = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const wall = useSelector(selectSavedWall);
  console.log("ID____", id);
  const { wallId } = useParams();
  console.log("WALLID____", wallId);
  const [saved, setSaved] = useState(true);
  const [savedUrls, setSavedUrls] = useState([]);

  useEffect(() => {
    const fillFramesWithSavedImgs = async () => {
      await dispatch(
        fetchSingleWallAsync({ userId: id, wallId: wallId })
      );
    };
    fillFramesWithSavedImgs();
  }, [dispatch]);

  useEffect(()=> {
    // const getSavedUrls = ()=> {
      setSaved(true);
      setSavedUrls(images);
    // }
    // getSavedUrls();
  }, [wall]);

//   useEffect(()=> {
//   const updateImageData = () => {
//     const myRe = /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gm
//     let imageArr = savedUrls.map((i) => i.match(myRe));
//     return imageArr;
//   }
//   updateImageData();
// }, []);

    

  console.log("WALL_________", wall);
  // console.log(wall.updatedAt.slice(5, 7)+wall.updatedAt.slice(8, 10)+wall.updatedAt.slice(0, 4))

  //--------------------------------------------------
  //#region Layout
  //--------------------------------------------------

  const {images} = wall
  const [numberOfImages, setNumberOfImages] = useState(5);

  useEffect(() => {
    if (images) {
      if (images.length - 1 === 6) {
        setNumberOfImages(5);
      } else if (images && images.length - 1 === 7) {
        setNumberOfImages(6);
      } else if (images && images.length - 1 === 8) {
        setNumberOfImages(7);
      } else {
        setNumberOfImages(8);
      }
    }
  }, []);

  console.log("IMAGES", images);
  console.log("NUMBER OF IMAGES", numberOfImages);
  console.log("savedUrls", savedUrls);

  /**
   * `getNumberForLayout` configures the correct layout based on the number of images in this saved wall.
   */

  const getNumberForLayout = () => {
    if (numberOfImages === 5) {
      return <FiveImgGalleryWall saved={saved} savedUrls={savedUrls} />;
    } else if (numberOfImages === 6) {
      return <SixImgGalleryWall saved={saved} savedUrls={savedUrls} />;
    } else if (numberOfImages === 7) {
      return <SevenImgGalleryWall saved={saved} savedUrls={savedUrls} />;
    } else if (numberOfImages === 8) {
      return <EightImgGalleryWall saved={saved} savedUrls={savedUrls} />;
    } else {
      return <div>Oops, there was a problem saving your wall.</div>;
    }
  };

  //#endregion Layout

  return (
    <div className="">
      {getNumberForLayout()}
      {wall ? (
        <div>
          {wall.name ? (
            <h2>Name: {wall.name}</h2>
          ) : (
            <div>This wall doesn't have a name</div>
          )}
          <p>Created on: {wall.createdAt}</p>
        </div>
      ) : (
        <div>Oops, this wall doesn't exist!</div>
      )}
    </div>
  );
};

export default SavedWall;
