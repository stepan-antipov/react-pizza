import React from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';
import axios from 'axios';
import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';

import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
// import Pagination from '../components/Pagination';

import { SearchContext } from '../App';

function Home() {
  const navigate = useNavigate();
  const { categoryId, sort, orderType } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  // const [currentPage, setCurrentPage] = React.useState(1);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      try {
        axios
          .get(
            `https://63dfc566a76cfd41058884aa.mockapi.io/items?&${
              categoryId > 0 ? `category=${categoryId}` : ''
            }&sortBy=${sort.sortProperty}&order=${orderType ? 'asc' : 'desc'}`,
          )
          .then((response) => {
            setPizzas(response.data);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    setLoading(true);

    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
    });

    navigate(`?${queryString}`);
  }, [categoryId, sort, orderType, navigate]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} onClickCategory={(id) => onClickCategory(id)} />
          <Sort /*sortType={sortType} onClickSort={(obj) => setSortType(obj)} orderType={orderType} onClickArrow={(str) => setOrderType(str)} */
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {loading
            ? [...new Array(8)].map((_, i) => <Skeleton key={i} />)
            : pizzas
                .filter((elem) => elem.title.toLowerCase().includes(searchValue.toLowerCase()))

                .map((pizza) => {
                  return <PizzaBlock key={pizza.imageUrl} {...pizza} />;
                })}
        </div>
        {/* <Pagination onPageChange={(number) => setCurrentPage(number)} /> */}
      </div>
    </>
  );
}

export default Home;
