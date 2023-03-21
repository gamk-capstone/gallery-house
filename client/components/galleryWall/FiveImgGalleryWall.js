import React, {useState} from "react";

const FiveImageGalleryWall = (userArtUrl) => {
  const [userArt1, setUserArt1] = useState(false);
  const [userArt2, setUserArt2] = useState(false);
  const [userArt3, setUserArt3] = useState(false);
  const [userArt4, setUserArt4] = useState(false);
  const [userArt5, setUserArt5] = useState(false);
  const url = userArtUrl.userArtUrl;

  return (
    <div className="FiveImageWallParentDiv">
      <div className="FiveImageWallTop">
        <img src={`${userArt1 ? url : "/white.jpeg"}`} className="landscapeRectangle" onClick={() => {
          setUserArt1(!userArt1)
        }}/>
        <img src={`${userArt2 ? url : "/white.jpeg"}`} className="square" onClick={() => {
          setUserArt2(!userArt2)
        }}/>
      </div>
      <div className="FiveImageWallBottom">
        <img src={`${userArt3 ? url : "/white.jpeg"}`} className="landscapeRectangle" onClick={() => {
          setUserArt3(!userArt3)
        }}/>
        <img src={`${userArt4 ? url : "/white.jpeg"}`} className="portraitRectangle" onClick={() => {
          setUserArt4(!userArt4)
        }}/>
        <img src={`${userArt5 ? url : "/white.jpeg"}`} className="landscapeRectangle" onClick={() => {
          setUserArt5(!userArt5)
        }}/>
      </div>
    </div>
  );
};
export default FiveImageGalleryWall;
