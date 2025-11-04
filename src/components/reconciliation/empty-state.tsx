'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type EmptyStateProps = {
  image: string;
  title: string;
  description: string;
  size?: 'default' | 'small';
};

export function EmptyState({ image, title, description, size = 'default' }: EmptyStateProps) {
  const emptyStateImage = PlaceHolderImages.find(
    (img) => img.id === image
  );

  const imageSize = size === 'small' ? { width: 120, height: 80 } : { width: 180, height: 120 };
  const titleClass = size === 'small' ? 'text-base font-medium' : 'text-lg font-semibold';
  const descriptionClass = size === 'small' ? 'text-sm' : '';


  return (
    <div className="w-full flex flex-col items-center justify-center text-center">
      {emptyStateImage && (
        <Image
          src={emptyStateImage.imageUrl}
          alt={emptyStateImage.description}
          width={imageSize.width}
          height={imageSize.height}
          data-ai-hint={emptyStateImage.imageHint}
          className="max-w-[120px] max-h-[120px] object-contain"
        />
      )}
      <h3 className={`mt-6 ${titleClass}`}>{title}</h3>
      <p className={`mt-1 text-muted-foreground max-w-sm ${descriptionClass}`}>
        {description}
      </p>
    </div>
  );
}
