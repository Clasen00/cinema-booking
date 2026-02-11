export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  paymentMethod: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}
