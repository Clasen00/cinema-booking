import sessionApi from "./sessionsApi";
import apiClient from "@/shared/api/apiClient";
import type { MovieSessionDetails, BookingResponse } from "../model/types";
import type { Seat } from "@/types";

jest.mock("@/shared/api/apiClient");

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("sessionApi", () => {
  const mockSession: MovieSessionDetails = {
    id: 1,
    movieId: 123,
    cinemaId: 456,
    startTime: "2025-03-20T19:00:00Z",
    seats: { rows: 5, seatsPerRow: 8 },
    bookedSeats: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getSessionById", () => {
    it("returns session data on success", async () => {
      mockApiClient.get.mockResolvedValueOnce({
        data: mockSession,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });

      const data = await sessionApi.getSessionById("1");

      expect(mockApiClient.get).toHaveBeenCalledWith("/movieSessions/1");
      expect(data).toEqual(mockSession);
    });

    it("throws error on failure", async () => {
      const error = new Error("Not found");
      mockApiClient.get.mockRejectedValueOnce(error);

      await expect(sessionApi.getSessionById("1")).rejects.toThrow("Not found");
      expect(mockApiClient.get).toHaveBeenCalledWith("/movieSessions/1");
    });
  });

  describe("bookSeats", () => {
    const mockSeats: Seat[] = [
      { rowNumber: 1, seatNumber: 5 },
      { rowNumber: 1, seatNumber: 6 },
    ];

    const mockBookingResponse: BookingResponse = {
      bookingId: "booking-123",
      sessionId: "1",
      seats: mockSeats,
      totalPrice: 500,
      bookedAt: "2025-03-20T19:00:00Z",
    };

    it("returns booking response on success", async () => {
      mockApiClient.post.mockResolvedValueOnce({
        data: mockBookingResponse,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });

      const data = await sessionApi.bookSeats("1", mockSeats);

      expect(mockApiClient.post).toHaveBeenCalledWith(
        "/movieSessions/1/bookings",
        { seats: mockSeats },
      );
      expect(data).toEqual(mockBookingResponse);
    });

    it("throws error on failure", async () => {
      const error = new Error("Seats already booked");
      mockApiClient.post.mockRejectedValueOnce(error);

      await expect(sessionApi.bookSeats("1", mockSeats)).rejects.toThrow(
        "Seats already booked",
      );
      expect(mockApiClient.post).toHaveBeenCalledWith(
        "/movieSessions/1/bookings",
        { seats: mockSeats },
      );
    });
  });
});
