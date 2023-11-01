import { Star } from 'lucide-react';
import React from 'react';

interface StarRatingDisplayProps {
  rating: number;
  totalStars: number;
}

export const StarRatingDisplay: React.FC<StarRatingDisplayProps> = ({ rating, totalStars }) => {
  return (
    <div className="flex">
      {Array.from({ length: totalStars }, (_, index) => {
        const isFilled = index < rating;
        return (
          <span
            key={index}
          >
            <Star size={35} className={`text-2xl text-white ${
              isFilled ? 'fill-white' : 'fill-none'
            }`}/>
          </span>
        );
      })}
    </div>
  );
};
