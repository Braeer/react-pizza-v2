import { RootState } from '../store';

export const filterSelector = (state: RootState) => state.filter;
export const filterSortSelector = (state: RootState) => state.filter.sort;
