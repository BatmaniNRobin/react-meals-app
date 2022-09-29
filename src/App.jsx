import './App.css';

import Search from './components/Search';
import Meals from './components/Meals';
import Favorite from './components/Favorite';
import Modal from './components/Modal';

import { useState, useEffect } from 'react';

export default function App() {
  return (
    <main>
      {/*<Search/>*/}
      <Search/>
      {/*<Favorite/>*/}
      <Favorite/>
      {/*<Meals/>*/}
      <Meals/>
      {/*<Modal/>*/}
      <Modal/>
    </main>
  )
}
