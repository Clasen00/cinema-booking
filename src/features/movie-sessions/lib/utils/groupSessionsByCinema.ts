import type { MovieSession } from "@/entities/cinema";

export const groupSessionsByCinema = (
  sessions: MovieSession[],
): Record<string, MovieSession[]> => {
  const grouped: Record<string, MovieSession[]> = {};

  sessions.forEach((session) => {
    const cinemaId = session.cinemaId;
    if (!grouped[cinemaId]) {
      grouped[cinemaId] = [];
    }
    grouped[cinemaId].push(session);
  });

  return grouped;
};
