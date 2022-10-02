import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';

const AppContext = React.createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=a";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const AppProvider = ({children}) => {

  // useEffect(() => {

  // BUG *not actually a bug*
  // this uses the native fetch api within react
  // await waits for the promise to resolve before being done with function
  // .then will continue everything after and once promise resolved it would come back

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://randomuser.me/api");
  //       const data = response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();

    // const response = fetch("https://randomuser.me/api")
    // .then(data => {
    //   return data.json()
    // });
    // console.log(response);

  // }, []);

  // BUG: *not actually a bug*
  // uses axios instead of fetch

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());


  const fetchMeals = async (url) => {
    setLoading(true);

    try {
      const {data} = await axios(url);
      if (data.meals){
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    }catch (error) {
      console.log(error.response);
    }

    setLoading(false);
  }

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  }

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;

    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }

    setSelectedMeal(meal);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }
  
  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, [])

  useEffect(() => {
    if(!searchTerm) return
      fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm])
  
  const addToFavorites = (idMeal) => {
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return
    const updatedFavorites = [...favorites, meal]
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }
  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }

  return (
    <AppContext.Provider
      value={{ loading, meals, setSearchTerm, fetchRandomMeal,
              showModal, selectMeal, selectedMeal, closeModal, 
              favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </AppContext.Provider>
  )
}

export {AppContext, AppProvider}

export const useGlobalContext = () => {
  return useContext(AppContext)
}