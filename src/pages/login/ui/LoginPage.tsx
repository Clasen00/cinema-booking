import { LoginForm } from "@/features/auth";
import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div>
      <h1>Вход</h1>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
