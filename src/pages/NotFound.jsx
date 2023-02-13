import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
      <h2>
        Ничего не найдено <span className='icon'>😕</span>
      </h2>
      <p>К сожалению, такой страницы нет в нашем интернет магазине.</p>
      <Link to="/" className="button button--black">
        <span>На главную</span>
      </Link>
    </div>
  );
}

export default NotFound;
