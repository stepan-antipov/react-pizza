import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement } from './redux/slices/counterSlice';

import './scss/app.scss';
import Header from './components/Header';

import Home from './pages/Home';
import Cart from './pages/Cart';
import EmptyCart from './pages/EmptyCart';
import NotFound from './pages/NotFound';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  // const count = useSelector((state) => state.counter.count)
  // const dispatch = useDispatch();

  return (
    <div className="wrapper">

      <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <Header  />
      <div className="content">

        <Routes>
          <Route path='/' element={<Home searchValue={searchValue}/>} errorElement={<NotFound/>}/>
          <Route path='cart' element={<Cart/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;

