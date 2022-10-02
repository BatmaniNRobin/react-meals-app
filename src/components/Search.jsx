import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";


const Search = () => {
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext()
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setSearchTerm(text);
    }
  }

  const handleRandomMeal = () => {
    setSearchTerm("");
    setText("");
    fetchRandomMeal();
  }

// ! todo why is search null
  return (
    <header className='search-container'>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='your favorite meal' className='form-input' onChange={handleChange} value={text}/>
        <button type="submit" className="btn">search</button>
        <button type="button" className="btn btn-hipster" onClick={handleRandomMeal}>suprise me !</button>
      </form>
    </header>
  )
}

export default Search;