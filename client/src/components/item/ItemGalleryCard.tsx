import { Box, Card, CardContent, ImageList, ImageListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IProps {
  images: string[];
}

export const ItemGalleryCard = ({ images }: IProps) => {
  const hasImages = images.length > 0;
  const previewImages = hasImages ? images.slice(0, 3) : [];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Галерея
        </Typography>
        {hasImages ? (
          <ImageList
            cols={previewImages.length === 1 ? 1 : previewImages.length === 2 ? 2 : 3}
            gap={8}
          >
            {previewImages.map((src, index) => (
              <ImageListItem key={src}>
                <GalleryImage src={src} alt={`Изображение ${index + 1}`} />
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <EmptyState>Изображения отсутствуют</EmptyState>
        )}
      </CardContent>
    </Card>
  );
};

const GalleryImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 120,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
}));

const EmptyState = styled(Box)(({ theme }) => ({
  height: 160,
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  border: '1px dashed',
  borderColor: theme.palette.grey[300],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));
