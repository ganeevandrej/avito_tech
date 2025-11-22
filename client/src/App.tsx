import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { ListPage } from './pages/ListPage';
import { ItemPage } from './pages/ItemPage';
import { StatsPage } from './pages/StatsPage';

export const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<ListPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </MainLayout>
  );
};
