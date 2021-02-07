import { BrowserRouter, Switch, Route } from "react-router-dom";
import Thanks from "../views/Thanks";
import Home from "../views/Home";
import Planes from "../views/Plans";
import Welcome from "../views/Welcome";

// Componentes


const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = "/gracias"   component = { Thanks } />
        <Route path = "/planes"   component = { Planes } />
        <Route path = "/bienvenido"   component = { Welcome } />
        <Route path = "/home"     component = { Home } />
        <Route path = ""          component = { Home } />
      </Switch> 
    </BrowserRouter>
  )
}

export default Router;