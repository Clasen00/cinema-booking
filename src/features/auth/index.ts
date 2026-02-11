// Экспорт компонентов
export { LoginForm } from "./ui/LoginForm/LoginForm";
export { RegisterForm } from "./ui/RegisterForm/RegisterForm";
export { PasswordStrength } from "./ui/PasswordStrength/PasswordStrength";

// Экспорт хуков
export { useLoginForm } from "./lib/hooks/useLoginForm";
export { useRegisterForm } from "./lib/hooks/useRegisterForm";

// Экспорт схем валидации
export { registerSchema } from "./lib/validation/registerSchema";
export type { RegisterFormData } from "./lib/validation/registerSchema";
