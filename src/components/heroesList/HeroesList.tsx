'use client';

import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector, useAppStore, useHttp } from '@/hooks';
import {
  heroesFetched,
  heroesFetching,
  heroesFetchingError,
} from './heroesListSlice';

import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

type RootState = {
  heroes: string[];
  heroesLoadingStatus: 'idle' | 'loading' | 'error';
  filters: string[];
};

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const store = useAppStore();
  const dispatch = useAppDispatch();
  const { request } = useHttp();
  const heroesList = useAppSelector((state) => state.heroesList);

  useEffect(() => {
    store.dispatch(heroesFetching());
    request('http://localhost:3004/heroes', 'GET')
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  if (heroesList.heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesList.heroesLoadingStatus === 'error') {
    return <h5 className='text-center mt-5'>Ошибка загрузки</h5>;
  }

  const renderHeroesList = (
    arr: { [x: string]: undefined; id: undefined }[]
  ) => {
    if (arr.length === 0) {
      return <h5 className='text-center mt-5'>Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return <HeroesListItem key={id} {...props} />;
    });
  };

  const elements = renderHeroesList(heroesList.heroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
