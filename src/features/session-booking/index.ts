// Экспорт компонентов
export { SeatMap } from "./ui/SeatMap/SeatMap";
export { BookingSummary } from "./ui/BookingSummary/BookingSummary";
export { SessionInfo } from "./ui/SessionInfo/SessionInfo";
export { SeatLegend } from "./ui/SeatLegend/SeatLegend";
export { ScreenDisplay } from "./ui/ScreenDisplay/ScreenDisplay";

// Экспорт хуков
export { useSessionBooking } from "./lib/hooks/useSessionBooking";
export { useSeatSelection } from "./lib/hooks/useSeatSelection";

// Экспорт утилит
export {
  isSeatBooked,
  getSeatStatus,
  generateSeatMap,
} from "./lib/utils/seatUtils";
