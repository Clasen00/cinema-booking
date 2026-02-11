import React from "react";
import styles from "./PasswordStrength.module.scss";

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password,
}) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    digit: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const strength = Object.values(checks).filter(Boolean).length;

  const getStrengthText = () => {
    switch (strength) {
      case 0:
        return { text: "Ненадёжный", className: styles.none };
      case 1:
        return { text: "Слабый", className: styles.weak };
      case 2:
        return { text: "Средний", className: styles.medium };
      case 3:
        return { text: "Надёжный", className: styles.strong };
      case 4:
        return { text: "Очень надёжный", className: styles.veryStrong };
      default:
        return { text: "Ненадёжный", className: styles.none };
    }
  };

  const strengthInfo = getStrengthText();

  return (
    <div className={styles.container}>
      <div className={styles.strengthText}>
        <span className={styles.strengthLabel}>Сложность пароля:</span>

        <span className={`${styles.strengthValue} ${strengthInfo.className}`}>
          {strengthInfo.text}
        </span>
      </div>

      <div className={styles.strengthMeter}>
        <div
          className={`${styles.strengthBar} ${strengthInfo.className}`}
          style={{ width: `${(strength / 4) * 100}%` }}
        />
      </div>

      <ul className={styles.rulesList}>
        <li className={checks.length ? styles.valid : styles.invalid}>
          Минимум 8 символов
        </li>

        <li className={checks.uppercase ? styles.valid : styles.invalid}>
          Заглавная буква
        </li>

        <li className={checks.digit ? styles.valid : styles.invalid}>Цифра</li>

        <li className={checks.special ? styles.valid : styles.invalid}>
          Специальный символ
        </li>
      </ul>
    </div>
  );
};
