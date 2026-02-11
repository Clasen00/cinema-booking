import React, { useState } from "react";
import styles from "./Image.module.scss";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  fallbackSrc = "/images/default-poster.jpg",
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {isLoading && <div className={styles.loading} />}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`${styles.image} ${isLoading ? styles.hidden : ""}`}
      />
    </div>
  );
};
