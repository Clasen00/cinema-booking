import "@testing-library/jest-dom";
import "whatwg-fetch";
import { server } from "./mocks/server";

// Мок для matchMedia (необходим для некоторых компонентов)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: () => ({
    matches: false,
    media: "",
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Мок для window.confirm
window.confirm = () => true;

// Сброс всех моков перед каждым тестом
beforeEach(() => {
  // Очистка localStorage и sessionStorage
  localStorage.clear();
  sessionStorage.clear();
});

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterEach(() => server.resetHandlers());
afterAll(() => server.close());
