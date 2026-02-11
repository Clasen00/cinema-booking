import { http, HttpResponse } from "msw";

export const handlers = [
  // Пример перехвата GET-запроса
  http.get("/sessions/:id", ({ params }) => {
    const { id } = params;
    // Возвращаем заглушку, если id совпадает
    if (id === "1") {
      return HttpResponse.json({
        id: 1,
        movieId: 123,
        cinemaId: 456,
        startTime: "2025-03-20T19:00:00Z",
        hall: "Зал 1",
        price: 350,
        seats: { rows: 5, seatsPerRow: 8 },
        bookedSeats: [],
      });
    }
    return new HttpResponse(null, { status: 404 });
  }),

  http.post("/sessions/:id/book", () => {
    return HttpResponse.json({ bookingId: "12345" }, { status: 201 });
  }),
];
