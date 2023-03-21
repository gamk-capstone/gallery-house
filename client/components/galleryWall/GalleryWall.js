import React, { useState } from "react";
import { useSelector } from "react-redux";
import AWS from "aws-sdk";
import { useDispatch } from "react-redux";
import { createUserArtAsync } from "../userArt/UserArtSlice";
const accessKey = process.env.ACCESS_KEY_ID;
const secretKey = process.env.SECRET_ACCESS_KEY;
import FiveImageGalleryWall from "./FiveImgGalleryWall";
import SixImageGalleryWall from "./SixImgGalleryWall";
import SevenImageGalleryWall from "./SevenImgGalleryWall";
import EightImageGalleryWall from "./EightImgGalleryWall";
import Sofa from "./Sofa";
import MyArt from "../myArt/myArt";

const GalleryWall = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const { id } = useSelector((state) => state.auth.me);
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
        userId: id
      })
    );
  };

  const fileSelectedHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const [selectedNumPhotos, setSelectedNumPhotos] = useState("5");
  const getNumberForLayout = () => {
    switch (selectedNumPhotos) {
      case "5":
        return <FiveImageGalleryWall userArtUrl={imageUrl}/>;
        break;
      case "6":
        return <SixImageGalleryWall userArtUrl={imageUrl}/>;
        break;
      case "7":
        return <SevenImageGalleryWall userArtUrl={imageUrl}/>;
        break;
      case "8":
        return <EightImageGalleryWall userArtUrl={imageUrl}/>;
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
      <MyArt />
      <div>
        <input type="file" accept="image/*" onChange={fileSelectedHandler} />
        {file && (
          <div style={{ marginTop: "10px" }}>
            <button onClick={uploadToS3}>Upload</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryWall;
