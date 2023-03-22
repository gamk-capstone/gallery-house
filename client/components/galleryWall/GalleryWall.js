import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import AWS from "aws-sdk";
import { useDispatch } from "react-redux";
import { createUserArtAsync } from "../userArt/allUsersArtSlice";
const accessKey = process.env.ACCESS_KEY_ID;
const secretKey = process.env.SECRET_ACCESS_KEY;
import FiveImgGalleryWall from "./FiveImgGalleryWall";
import SixImgGalleryWall from "./SixImgGalleryWall";
import SevenImgGalleryWall from "./SevenImgGalleryWall";
import EightImgGalleryWall from "./EightImgGalleryWall";
import MyArt from "../myArt/MyArt";

const GalleryWall = () => {
  const { id } = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const s3 = new AWS.S3();
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState([]);
  const myArtStateRef = useRef();

  AWS.config.update({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region: "us-east-1",
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

  const getMyArtState = () => {
    const myArtState = myArtStateRef.current.getImgUrl();
    setImageUrl(myArtState);
  };

  // local state to keep track of the number of frames to render according to user selction
  const [selectedNumPhotos, setSelectedNumPhotos] = useState("5");
  /**
   * `getNumberForLayout` switches the number of frames rendered based on a user's input.
   * @returns the correct component based on a user's input
   */
  const getNumberForLayout = () => {
    switch (selectedNumPhotos) {
      case "5":
        return <FiveImgGalleryWall userArtUrl={imageUrl} />;
        break;
      case "6":
        return <SixImgGalleryWall userArtUrl={imageUrl} />;
        break;
      case "7":
        return <SevenImgGalleryWall userArtUrl={imageUrl} />;
        break;
      case "8":
        return <EightImgGalleryWall userArtUrl={imageUrl} />;
    }
  };

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
    }
  };
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
              onChange={(e) => setSelectedNumPhotos(e.target.value)}
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
                Mid Century Modern Velevet Sofa
              </option>
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
          <MyArt ref={myArtStateRef} />
          <button onClick={() => getMyArtState()}>Select Frame</button>
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
            {imageUrl && (
              <div style={{ marginTop: "10px" }}>
                <img src={imageUrl} alt="uploaded" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryWall;
