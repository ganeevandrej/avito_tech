import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ImageContainer } from './AdCard.styles';

interface IProps {
  src?: string;
  alt: string;
}

/**
 * Компонент изображения карточки объявления
 */
export const AdCardImage = ({ src, alt }: IProps) => (
  <ImageContainer>
    {src ? (
      <StyledImage src={src} alt={alt} />
    ) : (
      <PlaceholderImage>
        <Typography variant="body2" color="text.secondary">
          Нет фото
        </Typography>
      </PlaceholderImage>
    )}
  </ImageContainer>
);

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const PlaceholderImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.grey[200],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

