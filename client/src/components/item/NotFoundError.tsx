import { Home as HomeIcon } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

/**
 * Компонент для отображения ошибки 404 (объявление не найдено)
 */
export const NotFoundError = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <ErrorCode>404</ErrorCode>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Объявление не найдено
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4} textAlign="center">
          Запрашиваемое объявление не существует или было удалено
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/list')}
          >
            Вернуться к списку
          </Button>
        </Stack>
      </Content>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  minHeight: '60vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
}));

const Content = styled(Box)({
  textAlign: 'center',
  maxWidth: 500,
});

const ErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: '8rem',
  fontWeight: 700,
  lineHeight: 1,
  color: theme.palette.text.disabled,
  marginBottom: theme.spacing(2),
}));
