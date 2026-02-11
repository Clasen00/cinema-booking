import * as yup from "yup";

// Базовая схема для пользователя
export const userSchema = yup.object({
  username: yup
    .string()
    .required("Имя пользователя обязательно")
    .max(50, "Имя пользователя не должно превышать 50 символов")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Имя пользователя может содержать только буквы, цифры и нижнее подчеркивание",
    ),

  password: yup
    .string()
    .required("Пароль обязателен")
    .min(8, "Пароль должен содержать минимум 8 символов")
    .max(100, "Пароль не должен превышать 100 символов")
    .matches(/[A-Z]/, "Пароль должен содержать минимум 1 заглавную букву")
    .matches(/[0-9]/, "Пароль должен содержать минимум 1 цифру"),
});

// Схема для регистрации
export const registerSchema = userSchema.shape({
  // passwordConfirmation будет добавлен в фиче auth
});

// Схема для логина
export const loginSchema = userSchema.pick(["username", "password"]);

export type UserFormData = yup.InferType<typeof userSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type LoginFormData = yup.InferType<typeof loginSchema>;
