import * as yup from "yup";

// Схема валидации для логина
export const loginSchema = yup.object({
  username: yup
    .string()
    .required("Имя пользователя обязательно")
    .min(8, "Имя пользователя должно содержать минимум 8 символов"),
  password: yup.string().required("Пароль обязателен"),
});

// Схема валидации для регистрации
export const registerSchema = yup.object({
  username: yup
    .string()
    .required("Имя пользователя обязательно")
    .min(8, "Имя пользователя должно содержать минимум 8 символов"),
  password: yup
    .string()
    .required("Пароль обязателен")
    .min(8, "Пароль должен содержать минимум 8 символов")
    .matches(/[A-Z]/, "Пароль должен содержать минимум 1 заглавную букву")
    .matches(/[0-9]/, "Пароль должен содержать минимум 1 цифру"),
  passwordConfirmation: yup
    .string()
    .required("Подтверждение пароля обязательно")
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
});

// Типы для форм
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;

// Утилита для валидации
export const validateForm = async <T>(
  schema: yup.Schema<T>,
  data: unknown,
): Promise<{ isValid: boolean; errors: Record<string, string>; data?: T }> => {
  try {
    const validData = await schema.validate(data, { abortEarly: false });
    return {
      isValid: true,
      errors: {},
      data: validData,
    };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return {
        isValid: false,
        errors,
      };
    }
    return {
      isValid: false,
      errors: { general: "Ошибка валидации" },
    };
  }
};

// Синхронная валидация (для использования в onChange)
export const validateFieldSync = (
  schema: yup.Schema,
  fieldName: string,
  value: unknown,
): string | null => {
  try {
    schema.validateSyncAt(fieldName, { [fieldName]: value });
    return null;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return error.message;
    }
    return "Ошибка валидации";
  }
};
