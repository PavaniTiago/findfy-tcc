'use client'

import { Star } from 'lucide-react';
import React, { useState } from 'react';

interface StarRatingProps {
  totalStars: number;
  initialRating: number;
  onRatingChange: (newRating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({ totalStars, initialRating, onRatingChange  }) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleStarHover = (hoveredRating: number) => {
    setHoverRating(hoveredRating);
  };

  const handleStarClick = (clickedRating: number) => {
    setRating(clickedRating);
    onRatingChange(clickedRating);
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoverRating || rating);

        return (
          <span
            key={index}
            onMouseEnter={() => handleStarHover(starValue)}
            onMouseLeave={() => handleStarHover(0)}
            onClick={() => handleStarClick(starValue)}
          >
            <Star size={35} className={`text-2xl text-white cursor-pointer ${
              isFilled ? 'fill-white' : 'fill-none'
            }`}/>
          </span>
        );
      })}
    </div>
  );
};