import { formatDateTime, formatDate, formatTime } from "./date";

describe("formatDateTime utils", () => {
  const testDate = "2025-03-15T18:30:00Z";

  it("formatDateTime returns object with date and time", () => {
    const result = formatDateTime(testDate);
    expect(result).toHaveProperty("date");
    expect(result).toHaveProperty("time");
    expect(result.date).toMatch(/\d{2}\.\d{2}\.\d{4}/);
    expect(result.time).toMatch(/\d{2}:\d{2}/);
  });

  it("formatDate returns only date", () => {
    const result = formatDate(testDate);
    expect(result).toMatch(/\d{2}\.\d{2}\.\d{4}/);
  });

  it("formatTime returns only time", () => {
    const result = formatTime(testDate);
    expect(result).toMatch(/\d{2}:\d{2}/);
  });
});
