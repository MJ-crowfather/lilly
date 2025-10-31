'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function EmptyState() {
  const emptyStateImage = PlaceHolderImages.find(
    (img) => img.id === 'empty-state-birds'
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
        />
      )}
      <h3 className="mt-6 text-lg font-semibold">No blockers right now</h3>
      <p className="mt-1 text-muted-foreground max-w-sm">
        Sit back and let things flow, we'll nudge you when it's time to step in.
      </p>
    </div>
  );
}
