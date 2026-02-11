// Мок для MSW (Mock Service Worker)
const setupServer = () => ({
  listen: jest.fn(),
  close: jest.fn(),
  resetHandlers: jest.fn(),
  use: jest.fn(),
});

const rest = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
};

const http = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
};

const HttpResponse = {
  json: jest.fn((data) => ({
    status: 200,
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(data),
  })),
  text: jest.fn((data) => ({
    status: 200,
    headers: new Headers({ 'Content-Type': 'text/plain' }),
    body: data,
  })),
};

module.exports = {
  setupServer,
  rest,
  http,
  HttpResponse,
};
