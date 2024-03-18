//#region Импорты

import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

// import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components'  // Импорт всего через один файл

import { filterSelector } from '../redux/filter/selectors';
import { pizzaSelector } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';
import { fetchPizzas } from '../redux/pizza/asyncActions';

//#endregion

const Home: React.FC = () => {
  //#region Переменные
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(pizzaSelector);
  const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector);

  //#endregion

  //#region Методы

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, [dispatch]);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const categoryBy = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        categoryBy,
        search,
        currentPage: String(currentPage),
      }),
    );
  };
  //#endregion

  //#region useEffect

  // Если изменили параметры и был первый рендер то запрашиваем пиццы
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     };

  //     const querySting = qs.stringify(params, { skipNulls: true });

  //     navigate(`?${querySting}`);
  //   }

  //   if (!isSearch.current) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }

  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, searchValue, currentPage]); //QS

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = SortList.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(setFilters({
  //       searchValue: params.search,
  //       categoryId: Number(params.categoryBy),
  //       currentPage: Number(params.currentPage),
  //       sort: sort || SortList[0],
  //     }));
  //     isSearch.current = true;
  //   }
  // }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]); // Получение данных с backend

  //#endregion

  //#region pizzas and skeletons

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  //#endregion

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
