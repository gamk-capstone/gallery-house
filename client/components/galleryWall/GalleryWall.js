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
import Sofa from "./Sofa";

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

  const [selectedNumPhotos, setSelectedNumPhotos] = useState("5");
  const getNumberForLayout = () => {
    switch (selectedNumPhotos) {
      case "5":
        return <FiveImgGalleryWall userArtUrl={imageUrl}/>;
        break;
      case "6":
        return <SixImgGalleryWall  userArtUrl={imageUrl}/>;
        break;
      case "7":
        return <SevenImgGalleryWall  userArtUrl={imageUrl}/>;
        break;
      case "8":
        return <EightImgGalleryWall  userArtUrl={imageUrl}/>;
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {getNumberForLayout()}
      <Sofa />
      <>
        <label htmlFor="numberOfPhotos">
          Choose the number of photos for your gallery wall:
        </label>
        <select
          name="numberOfPhotos"
          id="numberOfPhotos"
          onChange={(e) => setSelectedNumPhotos(e.target.value)}
        >
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
        </select>
      </>
      <div></div>
      <MyArt ref={myArtStateRef} />
      <button onClick={() => getMyArtState()}>Select Frame</button>
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
  );
};

export default GalleryWall;
