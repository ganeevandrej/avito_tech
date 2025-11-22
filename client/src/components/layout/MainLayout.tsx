import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <header>
        <div>
          <h1>Система модерации объявлений</h1>
          <nav>
            <Link to="/list">Список объявлений</Link>
            <Link to="/stats">Статистика</Link>
          </nav>
        </div>
      </header>
      <main>
        <div>{children}</div>
      </main>
    </div>
  );
};
