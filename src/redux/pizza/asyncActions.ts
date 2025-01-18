import { createAsyncThunk } from '@reduxjs/toolkit';
import { PizzaItem, SearchPizzaParams } from './types';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { categoryBy, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://65c7f46ae7c384aada6f1f5d.mockapi.io/item?page=${currentPage}&limit=8&${categoryBy}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);
