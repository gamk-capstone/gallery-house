import React, { useState } from "react";
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
import Sofa from "./Sofa";

const GalleryWall = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch();
  const s3 = new AWS.S3();
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState([]);

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
    setImageUrl(Location);
    console.log("uploading to s3", Location);

    //dispatch thunk to create new UserArt object in our local db
    dispatch(
      createUserArtAsync({
        name: file.name,
        s3Url: Location,
      })
    );
  };

  const fileSelectedHandler = (event) => {
    setFile(event.target.files[0]);
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
        return <FiveImgGalleryWall />;
        break;
      case "6":
        return <SixImgGalleryWall />;
        break;
      case "7":
        return <SevenImgGalleryWall />;
        break;
      case "8":
        return <EightImgGalleryWall />;
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
    <div className="flex flex-row">
      <div id="toolbarContainer" className="flex flex-col">
        <div id="numberFramesSelection">
          <label htmlFor="numberOfFrames">
            Choose the number of photos for your gallery wall:
          </label>
          <select
            name="numberOfFrames"
            onChange={(e) => setSelectedNumPhotos(e.target.value)}
          >
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>
        </div>
        <div id="furnitureSelection">
          <label htmlFor="furnitureSelection">Choose your furniture:</label>
          <select
            name="furnitureSelection"
            onChange={(e) => setSelectedSofa(e.target.value)}
          >
            <option value="sofaBeigeRounded">Sofa Beige Rounded</option>
            <option value="sofaTealVelvet">
              Mid Century Modern Velevet Sofa
            </option>
          </select>
          {/* <label htmlFor="sofaBeigeRounded">Sofa Beige Rounded</label>
          <input
            type="radio"
            onChange={() => setSelectedSofa("sofaBeigeRounded")}
            checked={selectedSofa === "sofaBeigeRounded"}
          />
          <label htmlFor="sofaTealVelvet">
            Mid Century Modern Velevet Sofa
          </label>
          <input
            type="radio"
            onChange={() => setSelectedSofa("sofaTealVelvet")}
            checked={selectedSofa === "sofaTealVelvet"}
          /> */}
        </div>
      </div>

      <div
        id="framesAndFurnitureContainer"
        className="flex flex-col items-center gap-8"
      >
        {getNumberForLayout()}
        {getSofaForLayout()}
        <div></div>
        <div>
          <input type="file" accept="image/*" onChange={fileSelectedHandler} />
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
  );
};

export default GalleryWall;
