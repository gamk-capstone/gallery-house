import React from "react";

import Navbar from "../components/navbar/Navbar";
// import NavbarHomepage from "../components/navbar/NavbarHomepage";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
