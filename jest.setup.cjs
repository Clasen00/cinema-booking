// Полифиллы для TextEncoder/TextDecoder (необходимы для MSW в Node.js окружении)
const { TextEncoder, TextDecoder } = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Полифилл для ReadableStream если нужен
if (typeof global.ReadableStream === "undefined") {
  global.ReadableStream = class ReadableStream {};
}

// Полифилл для TransformStream если нужен
if (typeof global.TransformStream === "undefined") {
  global.TransformStream = class TransformStream {};
}

// Полифилл для Request/Response если нужен
if (typeof global.Request === "undefined") {
  global.Request = class Request {};
}

if (typeof global.Response === "undefined") {
  global.Response = class Response {};
}
