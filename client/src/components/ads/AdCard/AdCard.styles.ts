import { Box, Card, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCard = styled(Card)<{ selected?: boolean }>(({ theme, selected }) => ({
  borderRadius: 12,
  display: 'flex',
  flexDirection: 'column',
  border: selected ? `2px solid ${theme.palette.primary.main}` : '1px solid',
  borderColor: selected ? theme.palette.primary.main : theme.palette.divider,
  transition: 'border-color 0.2s',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  width: '100%',
  height: 180,
  [theme.breakpoints.up('sm')]: {
    width: 180,
    height: 'auto',
    minHeight: 160,
  },
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: theme.spacing(2),
  gap: theme.spacing(1.5),
  minWidth: 0,
}));

export const HeaderRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

export const ChipsRow = styled(Stack)({
  flexDirection: 'row',
  gap: 8,
});

export const BottomRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  flex: 1,
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export const DetailsColumn = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  flex: 1,
}));

export const ActionsColumn = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  alignItems: 'flex-end',
  justifyContent: 'end',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'flex-end',
  },
}));

export const ButtonsRow = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'end',
  gap: 16,
});

