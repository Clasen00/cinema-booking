import { useAuth } from "@/entities/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      navigate("/my-tickets");
    } catch (error: any) {
      setError(
        error.message ||
          "Неверный логин или пароль. Проверьте введенные данные и попробуйте снова",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    password,
    error,
    loading,
    setUsername,
    setPassword,
    handleSubmit,
  };
};
