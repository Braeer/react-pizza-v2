import React, { Suspense } from 'react';
import Loadable from 'react-loadable';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
// import Cart from './pages/Cart';
// import NoteFound from './pages/NotFound';
// import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Загрузка...</div>,
});
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NoteFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/react-pizza-v2/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="/react-pizza-v2/cart/"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/react-pizza-v2/pizza/:id"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NoteFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
