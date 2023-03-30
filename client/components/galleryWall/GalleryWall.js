import React, { useState } from "react";
import { useSelector } from "react-redux";
// import AWS from "aws-sdk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../styles/GalleryWall.module.css";

//Imported Components
import FiveImgGalleryWall from "./FiveImgGalleryWall";
import SixImgGalleryWall from "./SixImgGalleryWall";
import SevenImgGalleryWall from "./SevenImgGalleryWall";
import EightImgGalleryWall from "./EightImgGalleryWall";
import MyArt from "../myArt/MyArt";
import SavedEtsyArt from "../savedEtsyArt/SavedEtsyArt";
import SaveWallForm from "../saveWallForm/index";

//Imported Files
import { fetchEtsyImages } from "./galleryWallSlice";
import { saveWallAsync } from "../savedWalls/savedWallsSlice";

/**
 * GalleryWall component
 */
const GalleryWall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Redux state
  const { id } = useSelector((state) => state.auth.me);

  //Local state that are used in multiple features
  const [imageUrl, setImageUrl] = useState(null);
  const [filledFrames, setFilledFrames] = useState(0);
  const [saved, setSaved] = useState(false);

  //--------------------------------------------------
  //#region Save Wall Feature
  //--------------------------------------------------

  const [wallName, setWallName] = useState("Untitled");

  /**
   * `handleSaveWall` is a React event handler that dispatches a thunk `saveWallAsync` to POST the current user's wall to the db
   * so they can access it later.
   * @param {*} e the user's click
   * @returns a new row in the Saved Walls Model and an updated Redux state
   */
  const handleSaveWall = (e) => {
    e.preventDefault();
    if (wallName.length < 1) {
      alert("Name is a required field.");
    }
    if (filledFrames === 0 && etsyImages.length === 0) {
      alert(`Your wall is empty. Please add images before saving.`);
      navigate(`/create`);
    } else {
      if (
        filledFrames < selectedNumPhotos &&
        etsyImages.length < selectedNumPhotos
      ) {
        console.log(filledFrames);
        console.log(selectedNumPhotos);
        alert(`Your wall isn't complete.`);
      }
      let savedWallImages = [];
      if (imageUrl && imageUrl.length > 0) {
        savedWallImages.push({ imageUrl: imageUrl, purchaseUrl: null });
      }
      if (etsyImages && etsyImages.length > 0) {
        etsyImages.map((i) =>
          savedWallImages.push({
            imageUrl: i.imageUrl,
            purchaseUrl: i.purchaseUrl,
          })
        );
      }
      console.log(savedWallImages);
      dispatch(
        saveWallAsync({ name: wallName, images: savedWallImages, userId: id })
      );
    }
    if (filledFrames === 0 && etsyImages.length === 0) {
      navigate("/create");
    } else {
      navigate("/saved");
    }
  };

  //#endregion Save Wall Feature

  //--------------------------------------------------
  //#region Generate Feature
  //--------------------------------------------------

  const [compColor, setCompColor] = useState(null);
  const [etsyImages, setEtsyImages] = useState([]);
  const [generate, setGenerate] = useState(false);

  /**
   * `fillFrames` is a React event handler that dispatches a thunk `fetchEtsyImages` and returns and array of image objects from
   * the Etsy v3 open API based on hue number.
   * @param {*} e the user's click
   * @returns {array} an array of Etsy image objects (including their productUrl) based on hue number
   */

  const fillFrames = async (e) => {
    e.preventDefault();
    const total = selectedNumPhotos;
    // - filledFrames;
    const images = await dispatch(
      fetchEtsyImages({ limit: total, hueNum: compColor ? compColor[0] : 180 })
    );

    const imgArrToSendToFrames = images.payload.rows.map((i) => ({
      imageUrl: i.imageUrl,
      purchaseUrl: i.purchaseUrl,
      id: i.id,
    }));
    setEtsyImages(imgArrToSendToFrames);
    if (!generate) {
      setGenerate(true);
    } else {
      setGenerate(false);
    }
  };

  //#endregion Generate Feature

  //--------------------------------------------------
  //#region Layout
  //--------------------------------------------------

  // local state to keep track of the number of frames to render according to user selction
  const [selectedNumPhotos, setSelectedNumPhotos] = useState("5");
  /**
   * `getNumberForLayout` switches the number of frames rendered based on a user's input.
   * @returns the correct component based on a user's input
   */
  const getNumberForLayout = () => {
    switch (selectedNumPhotos) {
      case "5":
        return (
          <FiveImgGalleryWall
            userArtUrl={imageUrl}
            filledFrames={filledFrames}
            setFilledFrames={setFilledFrames}
            etsyImages={etsyImages}
            generate={generate}
          />
        );
        break;
      case "6":
        return (
          <SixImgGalleryWall
            userArtUrl={imageUrl}
            filledFrames={filledFrames}
            setFilledFrames={setFilledFrames}
            etsyImages={etsyImages}
            generate={generate}
          />
        );
        break;
      case "7":
        return (
          <SevenImgGalleryWall
            userArtUrl={imageUrl}
            filledFrames={filledFrames}
            setFilledFrames={setFilledFrames}
            etsyImages={etsyImages}
            generate={generate}
          />
        );
        break;
      case "8":
        return (
          <EightImgGalleryWall
            userArtUrl={imageUrl}
            filledFrames={filledFrames}
            setFilledFrames={setFilledFrames}
            etsyImages={etsyImages}
            generate={generate}
          />
        );
    }
  };

  //--------------------------------------------------
  //#region Sofa
  //--------------------------------------------------

  // local state to keep track of the furniture image to render according to user selection
  const [selectedSofa, setSelectedSofa] = useState("sofaBeigeRounded");
  /**
   * `getSofaForLayout` switches the imageUrl of the sofa based on a user's input.
   * @returns HTML for the correct sofa image
   */
  const getSofaForLayout = () => {
    switch (selectedSofa) {
      case "sofaBeigeRounded":
        return (
          <img
            src="./images/sofa-beige-rounded.png"
            className={styles.sofaImage}
          />
        );
        break;
      case "sofaTealVelvet":
        return (
          <img
            src="./images/sofa-teal-velvet.png"
            className={styles.sofaImage}
          />
        );
      case "blackLeather":
        return (
          <img src="./images/black-leather.png" className={styles.sofaImage} />
        );
      case "blueVelvet":
        return (
          <img src="./images/blue-velvet.png" className={styles.sofaImage} />
        );
      case "blushVelvet":
        return (
          <img src="./images/blush-velvet.png" className={styles.sofaImage} />
        );
      case "ovalTable":
        return (
          <img src="./images/oval-table.png" className={styles.sofaImage} />
        );
      case "rectangleTable":
        return (
          <img
            src="./images/dining-table-rectangle.png"
            className={styles.sofaImage}
          />
        );
    }
  };
  //#endregion Sofa

  // return (
  return (
    <div className={styles.parentDiv}>
      <div className={styles.framesSofaToolbarContainer}>
        <div className={styles.framesSofaContainer}>
          {getNumberForLayout()}
          {getSofaForLayout()}
        </div>
        <div className={styles.toolbarSaveContainer}>
          <div className={styles.toolbarContainer}>
            <div className={styles.toolbarFrames}>
              <i className="material-symbols-rounded">filter_5</i>
              <label htmlFor="numberOfFrames"></label>
              <select
                name="numberOfFrames"
                onChange={(e) => {
                  setSelectedNumPhotos(e.target.value);
                  setFilledFrames(0);
                }}
              >
                <option value={5}>-</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
              </select>
            </div>
            <div className={styles.toolbarSofa}>
              <i className="material-symbols-rounded">chair</i>
              <label htmlFor="furnitureSelection"></label>
              <select
                name="furnitureSelection"
                onChange={(e) => setSelectedSofa(e.target.value)}
              >
                <option value="sofaBeigeRounded">-</option>
                <option value="sofaBeigeRounded">Sofa Beige Rounded</option>
                <option value="sofaTealVelvet">
                  Mid Century Modern Teal Velvet Sofa
                </option>
                <option value="blushVelvet">Blush Velvet Sofa</option>
                <option value="blackLeather">Black Leather Sofa</option>
                <option value="blueVelvet">Navy Blue Fabric Sofa</option>
                <option value="ovalTable">Oval Dining Table</option>
                <option value="rectangleTable">Rectangle Dining Table</option>
              </select>
            </div>
          </div>
          <div className={styles.saveWallForm}>
            <SaveWallForm
              wallName={wallName}
              setWallName={setWallName}
              handleSaveWall={handleSaveWall}
            ></SaveWallForm>
          </div>
        </div>
      </div>

      <div className={styles.vertLine}></div>

      <div className={styles.userArtContainer}>
        <MyArt setImageUrl={setImageUrl} setCompColor={setCompColor} />
      </div>

      <div className={styles.vertLine}></div>

      <div className={styles.generatedEtsyArtContainer}>
        <h2>Complimentary Art</h2>
        {/** Generate art button */}
        <button onClick={(e) => fillFrames(e)} className={styles.generateBtn}>
          Generate Art
        </button>
      </div>

      <div className={styles.vertLine}></div>

      <div className={styles.savedEtsyArtContainer}>
        <SavedEtsyArt setImageUrl={setImageUrl} />
      </div>
    </div>
  );
  // };
  //   <div className={styles.parentDiv}>
  //     <div className={styles.framesSofaToolbarContainer}>
  //       <div className={styles.framesSofaContainer}>
  //         {getNumberForLayout()}
  //         {getSofaForLayout()}
  //       </div>
  //       <div className={styles.toolbarSaveContainer}>
  //         <div className={styles.toolbarContainer}>
  //           <div className={styles.toolbarFrames}>
  //             <i className="material-symbols-rounded">filter_5</i>
  //             <label htmlFor="numberOfFrames"></label>
  //             <select
  //               name="numberOfFrames"
  //               onChange={(e) => {
  //                 setSelectedNumPhotos(e.target.value);
  //                 setFilledFrames(0);
  //               }}
  //             >
  //               <option value={5}>-</option>
  //               <option value={5}>5</option>
  //               <option value={6}>6</option>
  //               <option value={7}>7</option>
  //               <option value={8}>8</option>
  //             </select>
  //           </div>
  //           <div className={styles.toolbarSofa}>
  //             <i className="material-symbols-rounded">chair</i>
  //             <label htmlFor="furnitureSelection"></label>
  //             <select
  //               name="furnitureSelection"
  //               onChange={(e) => setSelectedSofa(e.target.value)}
  //             >
  //               <option value="sofaBeigeRounded">-</option>
  //               <option value="sofaBeigeRounded">Sofa Beige Rounded</option>
  //               <option value="sofaTealVelvet">
  //                 Mid Century Modern Teal Velvet Sofa
  //               </option>
  //               <option value="blushVelvet">Blush Velvet Sofa</option>
  //               <option value="blackLeather">Black Leather Sofa</option>
  //               <option value="blueVelvet">Navy Blue Fabric Sofa</option>
  //               <option value="ovalTable">Oval Dining Table</option>
  //               <option value="rectangleTable">Rectangle Dining Table</option>
  //             </select>
  //           </div>
  //         </div>
  //         <div className={styles.saveWallForm}>
  //           <SaveWallForm
  //             wallName={wallName}
  //             setWallName={setWallName}
  //             handleSaveWall={handleSaveWall}
  //           ></SaveWallForm>
  //         </div>
  //       </div>
  //     </div>
  //     <div
  //       id="frameAndFurnitureContainer"
  //       className="flex flex-col justify-center"
  //     >
  //       {getNumberForLayout()}
  //       {getSofaForLayout()}
  //       <div id="userArtStuff">
  //         {/** Generate art button */}
  //         <button onClick={(e) => fillFrames(e)}>Generate Art</button>
  //         <SaveWallForm
  //           wallName={wallName}
  //           setWallName={setWallName}
  //           handleSaveWall={handleSaveWall}
  //         ></SaveWallForm>
  //         <MyArt setImageUrl={setImageUrl} setCompColor={setCompColor} />
  //         <EtsyArt etsyImages={etsyImages} setImageUrl={setImageUrl} />
  //         <SavedEtsyArt setImageUrl={setImageUrl} />
  //       </div>
  //     </div>
  //     <div className={styles.vertLine}></div>
  //     <div className={styles.generatedEtsyArtContainer}>
  //       <h2>Complimentary Art</h2>
  //       {/** Generate art button */}
  //       <button onClick={(e) => fillFrames(e)} className={styles.generateBtn}>
  //         Generate Art
  //       </button>
  //     </div>
  //     <div className={styles.vertLine}></div>
  //     <div className={styles.savedEtsyArtContainer}>
  //       <SavedEtsyArt setImageUrl={setImageUrl} />
  //     </div>
  //   </div>
  // );
};

export default GalleryWall;
