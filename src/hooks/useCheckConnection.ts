import { useEffect, useState } from "react";

import safeCall from "../utils/safeCall";

interface Config {
  onOnline?: () => void;
  onOffline?: () => void;
}

export default function useCheckConnection(config: Config = {}) {
  const [online, setOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    function onlineListener() {
      setOnline(true);
      safeCall(config.onOnline);
    }

    function offlineListener() {
      setOnline(false);
      safeCall(config.onOffline);
    }

    window.addEventListener("online", onlineListener);
    window.addEventListener("offline", offlineListener);

    return () => {
      window.removeEventListener("online", onlineListener);
      window.removeEventListener("offline", offlineListener);
    };
  }, [config.onOffline, config.onOnline]);

  return online;
}
