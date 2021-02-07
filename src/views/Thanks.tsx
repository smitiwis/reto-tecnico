import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Presentacion from "../components/Presentacion";


const Thanks = () => {

  return (
    <Fragment>
      <Presentacion titulo={false}/>
      <div className="view-thanks">
        <div className="text">
          <h1 className="text__title text__title--general text__title--gris"> ¡Gracias por
            <span className="text__title--negrita text__title--azul"> confiar en nosotros!</span>
          </h1>
        </div>
        <div className="text">
          <h2 className="text__subTitle text__subTitle--gris-claro">
            Queremos conocer mejor la salud de los asegurados. Un asesor <b className="font-bold">se pondrá en contacto</b> con tigo
          en las siguientes <b className="font-bold">48 horas.</b>
          </h2>
        </div>
        <div className="button">
          <NavLink className="button__normal button__normal--azul" to="">
            IR A SALUD
          </NavLink>
        </div>
      </div>
    </Fragment>
  )

}

export default Thanks;