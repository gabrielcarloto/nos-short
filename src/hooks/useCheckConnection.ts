import { useEffect, useState } from "react";

export default function useCheckConnection() {
  const [online, setOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    function onlineListener() {
      setOnline(true);
    }

    function offlineListener() {
      setOnline(false);
    }

    document.addEventListener("online", onlineListener);
    document.addEventListener("offline", offlineListener);

    return () => {
      document.removeEventListener("online", onlineListener);
      document.removeEventListener("offline", offlineListener);
    };
  }, []);

  return online;
}
