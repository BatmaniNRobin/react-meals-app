import React, {useContext} from "react";
import App from "../App";
import { AppContext } from "../context";

const Meals = () => {
  const context = useContext(AppContext);
  console.log(context);
   


  return (
    <h1>hi mani</h1>
    )
}

export default Meals;