import React from "react";
import { useRegisterForm } from "../../lib/hooks/useRegisterForm";
import { PasswordStrength } from "../PasswordStrength/PasswordStrength";
import { Button, Input } from "@/shared/ui";
import styles from "./RegisterForm.module.scss";

export const RegisterForm: React.FC = () => {
  const {
    getFieldProps,
    values,
    loading,
    serverError,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div
        className={styles.formGroup}
        title="Придумайте имя пользователя (минимум 8 символов)"
      >
        <label htmlFor="username" className={styles.label}>
          Имя пользователя
        </label>

        <Input
          id="username"
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
          className={`${styles.input} ${getFieldProps("username")?.error ? styles.inputError : ""}`}
          placeholder="Придумайте имя пользователя (минимум 8 символов)"
        />
        {getFieldProps("username")?.error && (
          <div className={styles.error}>{getFieldProps("username")?.error}</div>
        )}
      </div>

      <div
        className={styles.formGroup}
        title="Придумайте имя пользователя (минимум 8 символов)"
      >
        <label htmlFor="password" className={styles.label}>
          Пароль
        </label>

        <Input
          id="password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
          className={`${styles.input} ${getFieldProps("password")?.error ? styles.inputError : ""}`}
          placeholder="Придумайте пароль (минимум 8 символов, заглавная буква, цифра)"
        />

        {/* Добавляем индикатор сложности пароля */}
        {values.password && <PasswordStrength password={values.password} />}

        {getFieldProps("password")?.error && (
          <div className={styles.error}>{getFieldProps("password")?.error}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="passwordConfirmation" className={styles.label}>
          Подтверждение пароля
        </label>

        <Input
          id="passwordConfirmation"
          type="password"
          name="passwordConfirmation"
          value={values.passwordConfirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
          className={`${styles.input} ${getFieldProps("passwordConfirmation")?.error ? styles.inputError : ""}`}
          placeholder="Повторите пароль"
        />

        {getFieldProps("passwordConfirmation")?.error && (
          <div className={styles.error}>
            {getFieldProps("passwordConfirmation")?.error}
          </div>
        )}
      </div>

      <Button type="submit" disabled={loading} className={styles.submitButton}>
        {loading ? (
          <span className={styles.loadingDots}>Регистрация...</span>
        ) : (
          "Зарегистрироваться"
        )}
      </Button>

      {serverError && <div className={styles.serverError}>{serverError}</div>}

      <div className={styles.loginLink}>
        Уже есть аккаунт?{" "}
        <a href="/login" className={styles.link}>
          Войти
        </a>
      </div>
    </form>
  );
};
