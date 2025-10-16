import { useState, useCallback } from "react";

interface Image {
  id: string;
  url: string;
  created_at: string;
}

export default function useHistory(userId?: string) {
  const [history, setHistory] = useState<Image[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const fetchHistory = useCallback(async () => {
    if (!userId) return;
    setLoadingHistory(true);
    try {
      const res = await fetch(`/api/images/getMyImages?userId=${userId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch history");
      setHistory(data.files);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  }, [userId]);

  return { history, fetchHistory, loadingHistory };
}
