import { renderHook, act, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useSessionBooking } from "./useSessionBooking";
import { useAuth } from "@/entities/user";
import { sessionApi } from "@/entities/session";
import type { MovieSessionDetails } from "@/entities/session";

jest.mock("@/entities/user");
jest.mock("@/entities/session", () => ({
  sessionApi: {
    getSessionById: jest.fn(),
    bookSeats: jest.fn(),
  },
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockSessionApi = sessionApi as jest.Mocked<typeof sessionApi>;

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("useSessionBooking integration", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
  );

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
    mockUseAuth.mockReturnValue({
      user: {
        id: "test@example.com",
        username: "Test User",
      },
      token: "test-token",
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
      isAuthenticated: true,
      isLoading: false,
    });
    mockNavigate.mockClear();
  });

  it("должен загрузить данные сеанса при монтировании", async () => {
    mockSessionApi.getSessionById.mockResolvedValue(mockSession);

    const { result } = renderHook(() => useSessionBooking("1"), { wrapper });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockSessionApi.getSessionById).toHaveBeenCalledWith("1");
    expect(result.current.session).toEqual(mockSession);
    expect(result.current.error).toBeNull();
  });

  it("должен обрабатывать выбор свободного места и игнорировать занятое", async () => {
    const sessionWithBookedSeats: MovieSessionDetails = {
      ...mockSession,
      bookedSeats: [{ rowNumber: 3, seatNumber: 5 }],
    };

    mockSessionApi.getSessionById.mockResolvedValue(sessionWithBookedSeats);

    const { result } = renderHook(() => useSessionBooking("1"), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Выбираем свободное место
    act(() => {
      result.current.handleSeatClick(3, 4);
    });

    expect(result.current.selectedSeats).toEqual([
      { rowNumber: 3, seatNumber: 4 },
    ]);

    // Пытаемся выбрать занятое место
    act(() => {
      result.current.handleSeatClick(3, 5);
    });

    // Список не должен измениться
    expect(result.current.selectedSeats).toEqual([
      { rowNumber: 3, seatNumber: 4 },
    ]);
  });

  it("должен обрабатывать ошибку при загрузке сеанса", async () => {
    const error = new Error("Session not found");
    mockSessionApi.getSessionById.mockRejectedValue(error);

    const { result } = renderHook(() => useSessionBooking("1"), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.session).toBeNull();
    expect(result.current.error).toBe(
      "Не удалось загрузить информацию о сеансе. Попробуйте позже.",
    );
  });

  it("должен перенаправлять на /login если пользователь не аутентифицирован", async () => {
    mockUseAuth.mockReturnValue({
      user: null,
      token: null,
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
      isAuthenticated: false,
      isLoading: false,
    });

    mockSessionApi.getSessionById.mockResolvedValue(mockSession);

    const { result } = renderHook(() => useSessionBooking("1"), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.handleSeatClick(1, 1);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("должен выполнять бронирование и перенаправлять на /my-tickets при успехе", async () => {
    mockSessionApi.getSessionById.mockResolvedValue(mockSession);
    mockSessionApi.bookSeats.mockResolvedValue({
      bookingId: "abc123",
      sessionId: "1",
      seats: [
        { rowNumber: 2, seatNumber: 3 },
        { rowNumber: 2, seatNumber: 4 },
      ],
      totalPrice: 700,
      bookedAt: "2025-03-20T18:00:00Z",
    });

    const { result } = renderHook(() => useSessionBooking("1"), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Выбираем места
    act(() => {
      result.current.handleSeatClick(2, 3);
      result.current.handleSeatClick(2, 4);
    });

    expect(result.current.selectedSeats).toHaveLength(2);

    // Выполняем бронирование
    await act(async () => {
      result.current.handleBooking();
    });

    await waitFor(() => {
      expect(result.current.booking).toBe(false);
    });

    expect(mockSessionApi.bookSeats).toHaveBeenCalledWith("1", [
      { rowNumber: 2, seatNumber: 3 },
      { rowNumber: 2, seatNumber: 4 },
    ]);
    expect(mockNavigate).toHaveBeenCalledWith("/my-tickets");
  });

  it("должен показывать ошибку при неудачном бронировании", async () => {
    mockSessionApi.getSessionById.mockResolvedValue(mockSession);
    const bookingError = {
      response: {
        data: {
          message: "Места уже забронированы",
        },
      },
    };
    mockSessionApi.bookSeats.mockRejectedValue(bookingError);

    const { result } = renderHook(() => useSessionBooking("1"), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Выбираем место
    act(() => {
      result.current.handleSeatClick(1, 1);
    });

    // Пытаемся забронировать
    await act(async () => {
      result.current.handleBooking();
    });

    await waitFor(() => {
      expect(result.current.booking).toBe(false);
    });

    expect(result.current.error).toBe("Места уже забронированы");
    expect(mockNavigate).not.toHaveBeenCalledWith("/my-tickets");
  });

  it("не должен выполнять бронирование без выбранных мест", async () => {
    mockSessionApi.getSessionById.mockResolvedValue(mockSession);
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const { result } = renderHook(() => useSessionBooking("1"), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Пытаемся забронировать без выбора мест
    act(() => {
      result.current.handleBooking();
    });

    expect(alertSpy).toHaveBeenCalledWith(
      "Пожалуйста, выберите хотя бы одно место",
    );
    expect(mockSessionApi.bookSeats).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });

  it("должен позволять очистить выбор мест", async () => {
    mockSessionApi.getSessionById.mockResolvedValue(mockSession);

    const { result } = renderHook(() => useSessionBooking("1"), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Выбираем места
    act(() => {
      result.current.handleSeatClick(1, 1);
      result.current.handleSeatClick(1, 2);
    });

    expect(result.current.selectedSeats).toHaveLength(2);

    // Очищаем выбор
    act(() => {
      result.current.clearSelection();
    });

    expect(result.current.selectedSeats).toHaveLength(0);
  });

  it("должен позволять перезагрузить данные сеанса", async () => {
    mockSessionApi.getSessionById.mockResolvedValue(mockSession);

    const { result } = renderHook(() => useSessionBooking("1"), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockSessionApi.getSessionById).toHaveBeenCalledTimes(1);

    // Перезагружаем данные
    await act(async () => {
      await result.current.refetch();
    });

    expect(mockSessionApi.getSessionById).toHaveBeenCalledTimes(2);
  });

  it("не должен загружать данные если sessionId не передан", () => {
    const { result } = renderHook(() => useSessionBooking(undefined), {
      wrapper,
    });

    expect(result.current.loading).toBe(true);
    expect(mockSessionApi.getSessionById).not.toHaveBeenCalled();
  });
});
