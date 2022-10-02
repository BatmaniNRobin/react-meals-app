import { useGlobalContext } from "../context";
import { useState, useEffect } from "react";

const Modal = () => {
  
  const {selectedMeal, closeModal} = useGlobalContext();

  const {strMealThumb: image, strMeal: title, strInstructions: text, strSource: source} = selectedMeal;


  
  return (
    <aside className="modal-overlay">
      <div className="modal-container">
        <img src={image} alt={title} className="img modal-img"/>
        <div>
          <h4>{title}</h4>
          <p>Cooking Instructions</p>
          <p> {text} </p>
          <p href={source} target="_blank">Original source</p>
          <button className="btn btn-hipster close-btn" onClick={closeModal}>close</button>
        </div>
      </div>
    </aside>
    )
}

export default Modal;
