import { registerSchema as baseSchema } from "@/shared/lib/utils/validation/validation";
import * as yup from "yup";

// Расширяем базовую схему регистрации
export const registerSchema = baseSchema.shape({
  passwordConfirmation: yup
    .string()
    .required("Подтверждение пароля обязательно")
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
});

// Тип для данных формы регистрации
export type RegisterFormData = yup.InferType<typeof registerSchema>;
