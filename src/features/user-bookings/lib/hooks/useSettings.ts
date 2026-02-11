import { useState, useEffect, useCallback } from "react";
import apiClient from "@/shared/api/apiClient";
import type { Settings } from "@/entities/settings/model/types";

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<{ data: Settings }>("/settings");
      setSettings(response.data.data);
      setError(null);
    } catch (err) {
      setError("Не удалось загрузить настройки системы.");
      console.error("Error fetching settings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    loading,
    error,
    refetch: fetchSettings,
  };
};
