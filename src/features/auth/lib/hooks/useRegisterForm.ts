import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "@/entities/user/lib/hooks/useAuth";
import {
  registerSchema,
  type RegisterFormData,
} from "../validation/registerSchema";

export const useRegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik<RegisterFormData>({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setErrors }) => {
      setLoading(true);
      setServerError(null);

      try {
        await register(
          values.username,
          values.password,
          values.passwordConfirmation,
        );
        navigate("/my-tickets");
      } catch (err: any) {
        if (err.errors) {
          // Преобразуем ошибки сервера в формат Formik
          const formikErrors: Record<string, string> = {};
          Object.keys(err.errors).forEach((key) => {
            formikErrors[key] = Array.isArray(err.errors[key])
              ? err.errors[key].join(", ")
              : err.errors[key];
          });
          setErrors(formikErrors);
        } else {
          setServerError(
            err.message ||
              "Ошибка регистрации. Пожалуйста, попробуйте еще раз.",
          );
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const getFieldError = (fieldName: keyof RegisterFormData) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return formik.errors[fieldName] as string;
    }
    return undefined;
  };

  const getFieldProps = (fieldName: keyof RegisterFormData) => ({
    name: fieldName,
    value: formik.values[fieldName],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    error: getFieldError(fieldName),
  });

  return {
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    loading,
    serverError,
    handleSubmit: formik.handleSubmit,
    getFieldProps,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
  };
};
