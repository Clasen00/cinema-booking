export interface Cinema {
  id: string;
  name: string;
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
}

export interface MovieSession {
  id: string;
  movieId: string;
  cinemaId: string;
  startTime: string;
  hall: string;
  price: number;
}
