import React, { Fragment } from "react";
import FormHome from "../components/FormHome";
import Presentacion from "../components/Presentacion";
const Home = () => {
  return (
    <Fragment>
      <Presentacion titulo={true}/>
      <FormHome />
    </Fragment>
  );
}

export default Home;
