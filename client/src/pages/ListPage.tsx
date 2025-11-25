import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { AdsGrid } from '@/components/ads/AdsGrid';
import { AdsPagination } from '@/components/ads/AdsPagination';
import { BulkActions } from '@/components/ads/BulkActions';
import { FiltersPanel } from '@/components/filters/FiltersPanel';
import { fetchAds } from '@/services/api/ads';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFilters } from '@/store/slices/listSelectors';
import { setLastLoadedIds } from '@/store/slices/listSlice';
import { type AdsListResponse } from '@/types/ad';

/**
 * Страница списка объявлений
 */
const ListPage = () => {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const adsQuery = useQuery<AdsListResponse>({
    queryKey: ['ads', filters] as const,
    queryFn: ({ signal }) => fetchAds(filters, signal),
    refetchInterval: 30_000,
  });

  const isLoading = adsQuery.isLoading || adsQuery.isFetching;

  useEffect(() => {
    if (!adsQuery.data) return;
    dispatch(setLastLoadedIds(adsQuery.data.ads.map((ad) => ad.id)));
  }, [adsQuery.data, dispatch]);

  const shouldShowPagination =
    Boolean(adsQuery.data?.pagination) && adsQuery.data!.pagination.totalPages > 1;

  return (
    <Stack spacing={3}>
      {/* Фильтры */}
      <FiltersPanel />

      {/* Список объявлений */}
      <AdsGrid
        ads={adsQuery.data?.ads ?? []}
        isLoading={isLoading}
        totalItems={adsQuery.data?.pagination.totalItems}
      />

      {/* Массовые действия */}
      <BulkActions />

      {/* Пагинация */}
      {shouldShowPagination && (
        <AdsPagination pagination={adsQuery.data!.pagination} isLoading={isLoading} />
      )}
    </Stack>
  );
};

export default ListPage;
