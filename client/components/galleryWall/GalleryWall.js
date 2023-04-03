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
  const [savedPurchaseUrl, setSavedPurchaseUrl] = useState(null);
  const [filledFrames, setFilledFrames] = useState(0);
  const [saved, setSaved] = useState(false);
  // local state to keep track of the furniture image to render according to user selection
  const [selectedSofa, setSelectedSofa] = useState("sofaBeigeRounded");

  //--------------------------------------------------
  //#region Save Wall Feature
  //--------------------------------------------------

  const [wallName, setWallName] = useState("Give your wall a name");

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
      savedWallImages.push(selectedSofa);
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
            setImageUrl={setImageUrl}
            savedPurchaseUrl={savedPurchaseUrl}
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
            setImageUrl={setImageUrl}
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
            setImageUrl={setImageUrl}
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
            setImageUrl={setImageUrl}
          />
        );
    }
  };

  //--------------------------------------------------
  //#region Sofa
  //--------------------------------------------------

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

  return (
    <div className={styles.parentDiv}>
      {/* save wall */}
      <div className={styles.saveWallForm}>
        <SaveWallForm
          wallName={wallName}
          setWallName={setWallName}
          handleSaveWall={handleSaveWall}
        ></SaveWallForm>
      </div>
      <div className={styles.sofaFramesContainer}>
        {/* frames */}
        {getNumberForLayout()}
        {/* sofa */}
        {getSofaForLayout()}
      </div>

      {/* toolbar - num frame, furn, generate art */}
      <div className={styles.toolbarContainer}>
        <div className={styles.toolbarFrames}>
        <span className="material-symbols-outlined">
filter_5
</span>
          <label htmlFor="numberOfFrames"></label>
          <select
            name="numberOfFrames"
            onChange={(e) => {
              setSelectedNumPhotos(e.target.value);
              setFilledFrames(0);
            }}
            className={styles.selectNumFrames}
          >
            <option value={5}>-</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>
        </div>
        <div className={styles.toolbarSofa}>
        <span className="material-symbols-outlined">
chair
</span>
          <label htmlFor="furnitureSelection"></label>
          <select
            name="furnitureSelection"
            onChange={(e) => setSelectedSofa(e.target.value)}
            className={styles.selectSofa}
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
        {/** Generate art button */}
        <button onClick={(e) => fillFrames(e)} className={styles.generateBtn}>
          ✧.* Generate Art
        </button>
      </div>

      {/* my art */}
      <div className={styles.userArtContainer}>
        <MyArt setImageUrl={setImageUrl} setCompColor={setCompColor} />
      </div>

      {/* saved art */}
      <div className={styles.savedEtsyArtContainer}>
        <SavedEtsyArt setImageUrl={setImageUrl} setSavedPurchaseUrl={setSavedPurchaseUrl}/>
      </div>
    </div>
  );
};

export default GalleryWall;
