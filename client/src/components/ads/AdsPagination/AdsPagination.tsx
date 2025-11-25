import { Box, Pagination } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectPage } from '@/store/slices/listSelectors';
import { setPage } from '@/store/slices/listSlice';
import { type Pagination as PaginationInfo } from '@/types/ad';

interface IProps {
  pagination: PaginationInfo;
  isLoading: boolean;
}
/**
 * Компонент пагинации объявлений
 */
export const AdsPagination = ({ pagination, isLoading }: IProps) => {
  const currentPage = useAppSelector(selectPage);
  const dispatch = useAppDispatch();

  const handlePageChange = (_: unknown, page: number) => {
    dispatch(setPage(page));
  };

  return (
    <Box display="flex" justifyContent="center">
      <Pagination
        color="primary"
        count={pagination.totalPages}
        page={currentPage}
        onChange={handlePageChange}
        disabled={isLoading}
      />
    </Box>
  );
};

