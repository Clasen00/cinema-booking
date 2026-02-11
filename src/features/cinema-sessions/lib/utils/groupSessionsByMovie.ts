import type { MovieSession } from "@/types";

export const groupSessionsByMovie = (
  sessions: MovieSession[],
): Record<string, MovieSession[]> => {
  const grouped: Record<string, MovieSession[]> = {};

  sessions.forEach((session) => {
    const movieId = session.movieId;
    if (!grouped[movieId]) {
      grouped[movieId] = [];
    }
    grouped[movieId].push(session);
  });

  return grouped;
};
