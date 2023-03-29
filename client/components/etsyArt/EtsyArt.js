import React from "react";

const EtsyArt = ({ etsyImages, setImageUrl }) => {

  const RenderArt = () => {
    if (!etsyImages) {
      return <h2>You haven't generated any art yet.</h2>;
    }
    return (
      <div>
        {etsyImages?.map((art) => {
          return <img src={art.imageUrl} className="w-40 h-60 p-3 object-cover drop-shadow-md shrink" key={art.id} onClick={() => {
            setImageUrl(art.imageUrl);
          }}/>;
        })}
      </div>
    );
  };
  return (
    <div className="etsyArt-container">
      <h1>Generated Etsy Art</h1>
      <RenderArt />
    </div>
  );
};

export default EtsyArt;