import React, { useState } from "react";
import { useSelector } from "react-redux";
import AWS from "aws-sdk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//Environment vairables
const accessKey = process.env.ACCESS_KEY_ID;
const secretKey = process.env.SECRET_ACCESS_KEY;

//Imported Components
import FiveImgGalleryWall from "./FiveImgGalleryWall";
import SixImgGalleryWall from "./SixImgGalleryWall";
import SevenImgGalleryWall from "./SevenImgGalleryWall";
import EightImgGalleryWall from "./EightImgGalleryWall";
import MyArt from "../myArt/MyArt";
import SavedEtsyArt from "../savedEtsyArt/SavedEtsyArt";
import SaveWallForm from "../saveWallForm/index";

//Imported Files
import { createUserArtAsync } from "../userArt/allUsersArtSlice";
import { fetchEtsyImages } from "./galleryWallSlice";
import { saveWallAsync } from "../savedWalls/savedWallsSlice";
import EtsyArt from "../etsyArt/EtsyArt";

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
      id: i.id
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
  //#region User Art Feature
  //--------------------------------------------------

  const s3 = new AWS.S3();
  const [file, setFile] = useState([]);

  // const myArtStateRef = useRef();

  AWS.config.update({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region: "us-east-2",
    signatureVersion: "v4",
  });

  const uploadToS3 = async () => {
    if (!file) {
      return;
    }
    const params = {
      Bucket: "gamkgalleryhouse",
      Key: `${Date.now()}.${file.name}`,
      Body: file,
    };
    const { Location } = await s3.upload(params).promise();
    console.log("uploading to s3", Location);
    console.log(file)

    dispatch(
      createUserArtAsync({
        name: file.name,
        s3Url: Location,
        userId: id,
      })
    );
  };

  const fileSelectedHandler = (event) => {
    setFile(event.target.files[0]);
  };

  //#endregion User Art Feature

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
        return <img src="/sofa-beige-rounded.png" className="max-w-[900px]" />;
        break;
      case "sofaTealVelvet":
        return <img src="/sofa-teal-velvet.png" className="max-w-[900px]" />;
      case "blackLeather":
        return <img src="/black-leather.png" className="max-w-[900px]" />;
      case "blueVelvet":
        return <img src="/blue-velvet.png" className="max-w-[900px]" />;
      case "blushVelvet":
        return <img src="/blush-velvet.png" className="max-w-[900px]" />;
      case "ovalTable":
        return <img src="/oval-table.png" className="max-w-[900px]" />;
      case "rectangleTable":
        return (
          <img src="/dining-table-rectangle.png" className="max-w-[900px]" />
        );
    }
  };
  //#endregion Sofa 

  return (
    <div className="flex flex-row gap-40">
      <div id="toolbarContainer" className="flex items-center">
        <div
          id="toolbar"
          className="flex flex-col bg-slate-300 p-4 max-w-[5rem] gap-4"
        >
          <div
            id="numberFramesSelection"
            className="flex flex-col justify-center gap-2"
          >
            <i className="material-icons text-2xl">filter_5</i>
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
          <hr></hr>
          <div
            id="furnitureSelection"
            className="flex flex-col justify-center gap-2"
          >
            <i className="material-icons">chair</i>
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
          <hr></hr>
          <div id="photoUpload">
            <i className="material-icons">add_a_photo</i>
          </div>
        </div>
      </div>
      <div
        id="frameAndFurnitureContainer"
        className="flex flex-col justify-center"
      >
        {getNumberForLayout()}
        {getSofaForLayout()}
        <div id="userArtStuff">
          {/** Generate art button */}
          <button onClick={(e) => fillFrames(e)}>Generate Art</button>
          {/** Save wall form */}
          <SaveWallForm
            wallName={wallName}
            setWallName={setWallName}
            handleSaveWall={handleSaveWall}
          ></SaveWallForm>
          <MyArt setImageUrl={setImageUrl} setCompColor={setCompColor} />
          <EtsyArt etsyImages={etsyImages} setImageUrl={setImageUrl}/>
          <SavedEtsyArt setImageUrl={setImageUrl}/>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={fileSelectedHandler}
            />
            {file && (
              <div style={{ marginTop: "10px" }}>
                <button onClick={uploadToS3}>Upload</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryWall;
