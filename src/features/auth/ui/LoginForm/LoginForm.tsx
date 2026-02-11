import React from "react";
import { useLoginForm } from "../../lib/hooks/useLoginForm";
import styles from "./LoginForm.module.scss";
import { Button, Input } from "@/shared/ui";

export const LoginForm: React.FC = () => {
  const {
    username,
    password,
    error,
    loading,
    setUsername,
    setPassword,
    handleSubmit,
  } = useLoginForm();

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Логин:
          </label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            placeholder="Введите ваш логин"
            autoComplete="username"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Пароль:
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            placeholder="Введите ваш пароль"
            autoComplete="current-password"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? <span className={styles.loadingDots}></span> : "Войти"}
        </Button>

        {error && <div className={styles.errorMessage}>{error}</div>}
      </form>

      <div className={styles.additionalLinks}>
        <a href="/forgot-password" className={styles.link}>
          Забыли пароль?
        </a>
        <a href="/register" className={styles.link}>
          Нет аккаунта? Зарегистрироваться
        </a>
      </div>
    </>
  );
};
