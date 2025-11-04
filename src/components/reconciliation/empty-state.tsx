'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type EmptyStateProps = {
  image: string;
  title: string;
  description: string;
};

export function EmptyState({ image, title, description }: EmptyStateProps) {
  const emptyStateImage = PlaceHolderImages.find(
    (img) => img.id === image
  );

  return (
    <div className="w-full flex flex-col items-center justify-center text-center">
      {emptyStateImage && (
        <Image
          src={emptyStateImage.imageUrl}
          alt={emptyStateImage.description}
          width={180}
          height={120}
          data-ai-hint={emptyStateImage.imageHint}
          className="max-w-[120px] max-h-[120px] object-contain"
        />
      )}
      <h3 className="mt-6 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-muted-foreground max-w-sm">
        {description}
      </p>
    </div>
  );
}