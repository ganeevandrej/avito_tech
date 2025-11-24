import { Route,Routes } from 'react-router-dom';

import { MainLayout } from '@/components/layout/MainLayout';
import { ItemPage, ListPage, StatsPage } from '@/pages';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<ListPage />} />
        <Route path="list" element={<ListPage />} />
        <Route path="item/:id" element={<ItemPage />} />
        <Route path="stats" element={<StatsPage />} />
      </Route>
    </Routes>
  );
};
