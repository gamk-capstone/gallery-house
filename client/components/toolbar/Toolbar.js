import React from "react";

/**
 * Toolbar component
 */
const Toolbar = () => {
  return (
    <div className="flex flex-col items-center bg-red-300 w-8 p-4 gap-6">
      <div>
        <a>
          <i className="material-icons">filter_5</i>
        </a>
      </div>
      <div>
        <a>
          <i className="material-icons">chair</i>
        </a>
      </div>
      <div>
        <a>
          <i className="material-icons">add_a_photo</i>
        </a>
      </div>
      <div>
        <a>
          <i className="material-icons">photo_library</i>
        </a>
      </div>
    </div>
  );
};

export default Toolbar;
