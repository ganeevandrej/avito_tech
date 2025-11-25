import { memo } from 'react';

import { type Advertisement } from '@/types/ad';

import { ContentContainer, StyledCard } from './AdCard.styles';
import { AdCardContent } from './AdCardContent';
import { AdCardHeader } from './AdCardHeader';
import { AdCardImage } from './AdCardImage';

interface IProps {
  index: number;
  ad: Advertisement;
  onOpen: () => void;
  selected?: boolean;
  onSelect?: (id: number, selected: boolean) => void;
}

/**
 * Компонент карточки объявления
 */
export const AdCard = memo(({ ad, onOpen, selected = false, onSelect }: IProps) => {
  const handleSelectClick = () => {
    if (onSelect) {
      onSelect(ad.id, !selected);
    }
  };

  return (
    <StyledCard elevation={3} selected={selected}>
      <AdCardImage src={ad.images?.[0]} alt={ad.title} />

      <ContentContainer>
        <AdCardHeader title={ad.title} status={ad.status} priority={ad.priority} />

        <AdCardContent
          price={ad.price}
          category={ad.category}
          createdAt={ad.createdAt}
          selected={selected}
          showSelect={Boolean(onSelect)}
          onSelect={handleSelectClick}
          onOpen={onOpen}
        />
      </ContentContainer>
    </StyledCard>
  );
});

