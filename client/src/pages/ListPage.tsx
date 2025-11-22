import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { AdsGrid } from '@/components/ads/AdsGrid';
import { fetchAds } from '@/services/api/ads';
import { useAppDispatch } from '@/store/hooks';
import { setLastLoadedIds } from '@/store/slices/listSlice';
import { type AdsListResponse } from '@/types/ad';

/**
 * Страница списка объявлений
 */
export const ListPage = () => {
  const dispatch = useAppDispatch();

  const adsQuery = useQuery<AdsListResponse>({
    queryKey: ['ads', 'list'] as const,
    queryFn: ({ signal }) => fetchAds(signal),
    staleTime: 30_000,
    refetchInterval: 30_000,
  });

  const isLoading = adsQuery.isLoading || adsQuery.isFetching;

  useEffect(() => {
    if (!adsQuery.data) return;
    dispatch(setLastLoadedIds(adsQuery.data.ads.map((ad) => ad.id)));
  }, [adsQuery.data, dispatch]);

  return (
    <Stack spacing={3}>
      <AdsGrid
        ads={adsQuery.data?.ads ?? []}
        isLoading={isLoading}
        totalItems={adsQuery.data?.pagination.totalItems}
      />
    </Stack>
  );
};
