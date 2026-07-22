import React from 'react';

/**
 * Prevents infinite onError loops and fallback flickering.
 * Sets data-has-error flag to avoid multiple error triggers.
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc = 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600'
) {
  const target = e.currentTarget;
  if (target.dataset.hasError === 'true') {
    return;
  }
  target.dataset.hasError = 'true';
  target.src = fallbackSrc;
}
