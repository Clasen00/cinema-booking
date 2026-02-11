export interface Cinema {
  id: number;
  name: string;
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
}

export interface MovieSession {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
}
