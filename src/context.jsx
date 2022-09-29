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
    };

    setLoading(false);
  }

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  return (
    <AppContext.Provider
      value={{loading, meals}}>
      {children}
    </AppContext.Provider>
  )
}

export {AppContext, AppProvider}

export const useGlobalContext = () => {
  return useContext(AppContext)
}