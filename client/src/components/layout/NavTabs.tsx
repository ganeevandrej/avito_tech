import { Button,Stack } from '@mui/material';
import { type ReactNode } from 'react';

interface NavItem {
  to: string;
  label: string;
  icon?: ReactNode;
}

interface IProps {
  items: readonly NavItem[];
  pathname: string;
  onNavigate: (path: string) => void;
}

/**
 * Компонент навигационных вкладок
 */
export const NavTabs = ({ items, pathname, onNavigate }: IProps) => (
  <Stack direction="row" spacing={1}>
    {items.map((item) => {
      const active = pathname === item.to || pathname.startsWith(`${item.to}/`);

      return (
        <Button
          key={item.to}
          color={active ? 'primary' : 'inherit'}
          startIcon={item.icon}
          onClick={() => onNavigate(item.to)}
        >
          {item.label}
        </Button>
      );
    })}
  </Stack>
);
