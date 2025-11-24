import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

interface IState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Компонент для обработки ошибок в React-приложении
 */
export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  /**
   * Обновление состояния при возникновении ошибки
   */
  static getDerivedStateFromError(error: Error): IState {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Логирование ошибки при её возникновении
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  /**
   * Перезагрузка страницы
   */
  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorContent>
            <Typography variant="h4" gutterBottom color="error">
              Что-то пошло не так
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Произошла непредвиденная ошибка. Попробуйте обновить страницу или вернуться назад.
            </Typography>
            {import.meta.env.DEV && this.state.error && (
              <ErrorDetails>
                <Typography variant="caption" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                  {this.state.error.toString()}
                  {this.state.error.stack && `\n\n${this.state.error.stack}`}
                </Typography>
              </ErrorDetails>
            )}
            <Button variant="contained" onClick={this.handleReload}>
              Обновить страницу
            </Button>
          </ErrorContent>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

const ErrorContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 24,
});

const ErrorContent = styled(Box)({
  maxWidth: 600,
  textAlign: 'center',
});

const ErrorDetails = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.error.light,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.error.contrastText,
  textAlign: 'left',
}));
