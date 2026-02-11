import React from "react";
import { RegisterForm } from "@/features/auth";
import styles from "./RegisterPage.module.scss";

const RegisterPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Регистрация</h1>

      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
