import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useMemo, useState } from 'react';

interface IProps {
  images: string[];
}

/**
 * Компонент галереи изображений
 */
export const ItemGalleryCard = ({ images }: IProps) => {
  const hasImages = images.length > 0;
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleImage = useMemo(() => images[currentIndex], [currentIndex, images]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Галерея
        </Typography>
        {hasImages ? (
          <CarouselWrapper>
            <IconButton size="small" onClick={handlePrev}>
              <ArrowBackIosNewIcon fontSize="inherit" />
            </IconButton>
            <ImageWrapper>
              <GalleryImage src={visibleImage} alt={`Изображение ${currentIndex + 1}`} />
              <ImageCounter>
                {currentIndex + 1}/{images.length}
              </ImageCounter>
            </ImageWrapper>
            <IconButton size="small" onClick={handleNext}>
              <ArrowForwardIosIcon fontSize="inherit" />
            </IconButton>
          </CarouselWrapper>
        ) : (
          <EmptyState>Изображения отсутствуют</EmptyState>
        )}
      </CardContent>
    </Card>
  );
};

const CarouselWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  flex: 1,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  overflow: 'hidden',
}));

const GalleryImage = styled('img')(() => ({
  width: '100%',
  height: 300,
  objectFit: 'cover',
  display: 'block',
}));

const ImageCounter = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  bottom: theme.spacing(1),
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  fontSize: theme.typography.caption.fontSize,
}));

const EmptyState = styled(Box)(({ theme }) => ({
  height: 200,
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  border: '1px dashed',
  borderColor: theme.palette.grey[300],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

