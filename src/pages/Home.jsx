import React from 'react'
import Skeleton from '../components/PizzaBlock/Skeleton';

import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';

function Home() {

  const {searchValue} = React.useContext(SearchContext);

  const [pizzas, setPizzas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating'
  });
  const [orderType, setOrderType] = React.useState(true);



  React.useEffect(() => {
  async function fetchData()  {

    try {
      const response = await fetch(`https://63dfc566a76cfd41058884aa.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? 
      `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=${orderType ? 'asc' : 'desc'}`);

      /*${searchValue ? '&search=' + searchValue : ''} мокапи не позволяюет совместить сортировку и поиск
      page=${currentPage}&limit=4*/

      const data = await  response.json();
      setPizzas(data);
      setLoading(false);
      
    } catch (error) {
        console.log(error);
    }}
  
  fetchData();
  // window.scrollTo(0, 0);
  setLoading(true);
  }, [categoryId, sortType, orderType, currentPage]);


  return (
      <>
      <div className="container">
          <div className="content__top">
            <Categories categoryId={categoryId} onClickCategory={(i) => setCategoryId(i)}/> 
            <Sort sortType={sortType} onClickSort={(obj) => setSortType(obj)} orderType={orderType} onClickArrow={(str) => setOrderType(str)}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
              {loading ? [...new Array(8)].map((_, i) => <Skeleton key={i}/>)

              : pizzas.filter((elem) => elem.title.toLowerCase().includes(searchValue.toLowerCase()))

              .map((pizza) => {return <PizzaBlock key={pizza.imageUrl} {...pizza}/>
              })}
          </div>
          <Pagination onPageChange={(number) => setCurrentPage(number)} />
        </div>
      </>
  )
}

export default Home
