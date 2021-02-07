import React, { Fragment } from "react"

const Saludo = (props: {titleGris: string, titleBlue: string, titleDescription: string}) => {
  return (
    <Fragment>
      <div className="text">
        <h1 className="text__title text__title--gris m-0"> { props.titleGris }
          <span className="text__title text__title--azul"> { props.titleBlue }</span>
        </h1>
      </div>
      <div className="text">
        <h2 className="text__subTitle text__subTitle--gris-claro">
          { props.titleDescription }
        </h2>
      </div>
    </Fragment>


  )
}

export default Saludo;