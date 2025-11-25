import {
  Backspace as BackspaceIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Replay as ReplayIcon,
} from '@mui/icons-material';
import type { ButtonProps, IconButtonProps } from '@mui/material';
import type { ReactNode } from 'react';

type ActionColor = IconButtonProps['color'] | ButtonProps['color'];

export type ModerationActionKey = 'approve' | 'reject' | 'changes' | 'clear';

export interface ModerationActionConfig {
  key: ModerationActionKey;
  label: string;
  bulkLabel?: string;
  icon: ReactNode;
  color?: ActionColor;
  hotkey?: string;
  tooltip?: string;
}

export const MODERATION_ACTIONS: ModerationActionConfig[] = [
  {
    key: 'approve',
    label: 'Одобрить',
    bulkLabel: 'Одобрить все',
    icon: <CheckIcon />,
    color: 'success',
    hotkey: 'A',
    tooltip: 'Нажмите A для одобрения',
  },
  {
    key: 'reject',
    label: 'Отклонить',
    bulkLabel: 'Отклонить все',
    icon: <CloseIcon />,
    color: 'error',
    hotkey: 'D',
    tooltip: 'Нажмите D для отклонения',
  },
  {
    key: 'changes',
    label: 'Доработка',
    bulkLabel: 'На доработку',
    icon: <ReplayIcon />,
    color: 'warning',
    hotkey: 'S',
    tooltip: 'Нажмите S для возврата на доработку',
  },
  {
    key: 'clear',
    label: 'Снять выбор',
    icon: <BackspaceIcon />,
  },
];

export type DialogMode = Extract<ModerationActionKey, 'reject' | 'changes'> | null;

