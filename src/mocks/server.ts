import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Создаём и экспортируем сервер для моков
export const server = setupServer(...handlers);
