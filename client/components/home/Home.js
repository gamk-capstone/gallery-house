import React, { useState } from "react";
import AWS from "aws-sdk";
import { useDispatch } from "react-redux";
import { createUserArtAsync } from "../userArt/UserArtSlice";

const Home = () => {
  const s3 = new AWS.S3();
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState([]);

  AWS.config.update({
    accessKeyId: "AKIA2TK54RLQLTXKGZ7Y",
    secretAccessKey: "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",
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
        s3Url: Location
      })
    );
  };

  const fileSelectedHandler = (event) => {
    setFile(event.target.files[0]);
  };

  return (
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
  );
};

export default Home;
