export const calculateRemainingTime = (
  bookedAt: string,
  paymentTimeSeconds: number,
): number | null => {
  if (!paymentTimeSeconds) return null;

  const bookedTime = new Date(bookedAt).getTime();
  const currentTime = new Date().getTime();
  const timePassed = Math.floor((currentTime - bookedTime) / 1000);

  return Math.max(0, paymentTimeSeconds - timePassed);
};

export const formatRemainingTime = (seconds: number): string => {
  if (seconds <= 0) return "Время истекло";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes > 0) {
    return `${minutes} мин ${remainingSeconds} сек`;
  }

  return `${remainingSeconds} сек`;
};
