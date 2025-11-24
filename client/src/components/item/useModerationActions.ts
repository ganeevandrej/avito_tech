import { useMutation, useQueryClient } from '@tanstack/react-query';

import { approveAd, rejectAd, requestChanges } from '@/services/api/ads';

export interface ModerationPayload {
  reason: string;
  comment?: string;
}

interface UseModerationActionsResult {
  handleApprove: () => void;
  handleReject: (payload: ModerationPayload) => void;
  handleRequestChanges: (payload: ModerationPayload) => void;
  isApproving: boolean;
  isRejecting: boolean;
  isRequestingChanges: boolean;
}

export const useModerationActions = (adId: number): UseModerationActionsResult => {
  const queryClient = useQueryClient();

  /**
   * сбрасывает кэш списка объявлений и детальной информации об объявлении
   */
  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['ads'] });
    queryClient.invalidateQueries({ queryKey: ['ad', adId] });
  };

  /**
   * одобрение объявления
   */
  const approveMutation = useMutation({
    mutationFn: () => approveAd(adId),
    onSuccess: invalidateQueries,
  });

  /**
   * отклонение объявления
   */
  const rejectMutation = useMutation({
    mutationFn: ({ reason, comment }: ModerationPayload) =>
      rejectAd(adId, reason, comment),
    onSuccess: invalidateQueries,
  });

  /**
   * вернуть на доработку объявление
   */
  const changesMutation = useMutation({
    mutationFn: ({ reason, comment }: ModerationPayload) =>
      requestChanges(adId, reason, comment),
    onSuccess: invalidateQueries,
  });

  /**
   * обработка одобрения объявления
   */
  const handleApprove = () => {
    approveMutation.mutate();
  };

  /**
   * обработка отклонения объявления
   */
  const handleReject = (payload: ModerationPayload) => {
    rejectMutation.mutate(payload);
  };

  /**
   * обработка вернуть на доработку объявления
   */
  const handleRequestChanges = (payload: ModerationPayload) => {
    changesMutation.mutate(payload);
  };

  return {
    handleApprove,
    handleReject,
    handleRequestChanges,
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending,
    isRequestingChanges: changesMutation.isPending,
  };
};

