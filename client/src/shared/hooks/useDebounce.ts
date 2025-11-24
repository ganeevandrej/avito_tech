import { useEffect, useState } from 'react';

/**
 * Хук для debounce значения
 *
 * Используется для задержки обновления значения (например, для поиска)
 * чтобы не делать запросы на каждое изменение
 *
 * @param value - значение для debounce
 * @param delay - задержка в миллисекундах (по умолчанию 500)
 * @returns debounced значение
 */
export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
};



