import React from "react";
import { useCollapse } from "react-collapsed";
import MyArt from "../myArt/MyArt";

const Collapse = () => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        {isExpanded ? "Collapse" : "Expand"}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">
          <MyArt setImageUrl={setImageUrl} setCompColor={setCompColor} />
        </div>
      </div>
    </div>
  );
};

export default Collapse;
