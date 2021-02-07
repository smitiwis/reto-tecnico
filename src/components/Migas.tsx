import { NavLink } from "react-router-dom";

const Migas = (props: { activeStep: number, backRoute: string }) => {
  return (
    <span className="miga">
      <NavLink className="miga__link" to={props.backRoute}>
        <span className="miga__icon icon icon-izquierda-2"></span>
        <span className="miga__first"> PASO {props.activeStep}&nbsp;</span>
      </NavLink>
      <span className="miga__second"> DE 3 </span>
    </span>
  )
}

export default Migas;