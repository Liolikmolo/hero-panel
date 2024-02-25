import { createSlice } from '@reduxjs/toolkit';

export const heroesListSlice = createSlice({
  name: 'heroesList',
  initialState: {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
  },
  reducers: {
    heroesFetching: (state) => {
      state.heroesLoadingStatus = 'loading';
    },
    heroesFetched: (state, action) => {
      (state.heroes = action.payload), (state.heroesLoadingStatus = 'idle');
    },
    heroesFetchingError: (state) => {
      state.heroesLoadingStatus = 'error';
    },
  },
});

export const { heroesFetching, heroesFetched, heroesFetchingError } =
  heroesListSlice.actions;

export default heroesListSlice.reducer;
