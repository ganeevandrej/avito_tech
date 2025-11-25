import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { approveAd, rejectAd, requestChanges } from '@/services/api/ads';
import type { DialogMode } from '@/shared/constants/moderationActions';

export type ModerationButtonActionKey = 'approve' | 'reject' | 'changes';

interface ActionState {
  handler: () => void;
  disabled: boolean;
}

export interface ModerationPayload {
  reason: string;
  comment?: string;
}

export interface UseModerationActionsOptions {
  onOpenDialog?: (mode: DialogMode) => void;
}

interface UseModerationActionsResult {
  actionStateMap: Record<ModerationButtonActionKey, ActionState>;
  handleReject: (payload: ModerationPayload) => void;
  handleRequestChanges: (payload: ModerationPayload) => void;
}

export const useModerationActions = (
  adId: number,
  options?: UseModerationActionsOptions,
): UseModerationActionsResult => {
  const queryClient = useQueryClient();
  const { onOpenDialog } = options ?? {};

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
  const handleApprove = useCallback(() => {
    approveMutation.mutate();
  }, [approveMutation]);
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

  /**
   * состояние кнопок модерации
   */
  const actionStateMap = useMemo(
    () => ({
      approve: {
        handler: handleApprove,
        disabled: approveMutation.isPending,
      },
      reject: {
        handler: () => onOpenDialog?.('reject'),
        disabled: rejectMutation.isPending,
      },
      changes: {
        handler: () => onOpenDialog?.('changes'),
        disabled: changesMutation.isPending,
      },
    }),
    [
      approveMutation.isPending,
      changesMutation.isPending,
      handleApprove,
      onOpenDialog,
      rejectMutation.isPending,
    ],
  );

  return {
    actionStateMap,
    handleReject,
    handleRequestChanges,
  };
};

