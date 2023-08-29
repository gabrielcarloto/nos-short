import { useEffect } from "react";

export default function useSetDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title + " - nós.short";
  }, [title]);
}
