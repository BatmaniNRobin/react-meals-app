import './App.css';

import Search from './components/Search';
import Meals from './components/Meals';
import Favorite from './components/Favorite';
import Modal from './components/Modal';

import { useState, useEffect } from 'react';
import { useGlobalContext } from './context';

export default function App() {
  const {showModal, favorites} = useGlobalContext();
  return (
    <main>
      {/*<Search/>*/}
      <Search />
      {/*<Favorite/>*/}
      <Favorite />
      {/*<Meals/>*/}
      <Meals />
      {/* <Modal/> */}
      {showModal && <Modal /> }
    </main>
  );
}
