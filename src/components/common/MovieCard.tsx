import React from 'react';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  id: string;
  title: string;
  posterUrl: string;
  description?: string;
  duration?: number;
  genre?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  posterUrl,
  description,
  duration,
  genre,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-64 overflow-hidden">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

        {description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex justify-between text-sm text-gray-500 mb-4">
          {duration && <span>{duration} мин</span>}
          {genre && <span>{genre}</span>}
        </div>

        <Link
          to={`/movie/${id}`}
          className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Просмотреть сеансы
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
