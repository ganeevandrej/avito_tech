import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageLoader } from '@/components/common/PageLoader';
import { MainLayout } from '@/components/layout/MainLayout';
import { ItemPage, ListPage, StatsPage } from '@/pages';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<PageLoader />}>
              <ListPage />
            </Suspense>
          }
        />
        <Route
          path="list"
          element={
            <Suspense fallback={<PageLoader />}>
              <ListPage />
            </Suspense>
          }
        />
        <Route
          path="item/:id"
          element={
            <Suspense fallback={<PageLoader />}>
              <ItemPage />
            </Suspense>
          }
        />
        <Route
          path="stats"
          element={
            <Suspense fallback={<PageLoader />}>
              <StatsPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};
