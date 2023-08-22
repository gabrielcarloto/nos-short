import Button from "./components/Button";

import logoSvg from "./assets/Logo.svg";
import clipboardIcon from "./assets/Clipboard.svg";
import { useEffect, useState } from "react";

interface ShortenedURL {
  url: string;
  key: string;
  ttl: number;
  link_url: string;
}

type APICreateResponse =
  | ShortenedURL
  | {
      error: {
        message: string;
        type: string;
      };
    };

type SavedLink = Omit<ShortenedURL, "ttl"> & {
  expires: Date;
};

function useSavedLinks() {
  const KEY = "savedLinks";
  const [links, setLinks] = useState<SavedLink[]>(() => {
    const item = localStorage.getItem(KEY);
    return item ? JSON.parse(item) : [];
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(links));
  }, [links]);

  return [links, setLinks] as const;
}

export default function App() {
  const [_savedLinks, setSavedLinks] = useSavedLinks();
  const [link, setLink] = useState("");
  const [_error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function createShortenedLink() {
    const API_URL = "https://url.api.stdlib.com/temporary@0.3.0/create/";
    setLoading(true);
    setError(false);

    const params = new URLSearchParams({
      url: link,
    });

    const fetchURL = API_URL + "?" + params.toString();

    try {
      const res = await fetch(fetchURL);

      const data: APICreateResponse = await res.json();

      if ("error" in data) throw new Error("API Error: " + data.error.message);

      setSavedLinks((l) => [
        ...l,
        {
          url: data.url,
          link_url: data.link_url,
          key: data.key,
          expires: new Date(Date.now() + data.ttl * 1000),
        },
      ]);
      // NOTE: é suposto redirecionar para a página de links encurtados ou ficar na mesma, apenas substituindo o input?
    } catch (e) {
      setError(true);
      if (e instanceof Error) console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="m-auto grid min-h-screen w-[min(474px,100%)] grid-rows-[0.5fr_1fr_max-content] py-4 text-zinc-800">
      <div className="flex flex-col justify-between">
        <header className="flex w-full justify-center md:h-[216px] lg:h-[182px]">
          <img src={logoSvg} alt="Logo nós.short" className="w-32" />
        </header>
        <div className="flex flex-col items-center justify-center gap-y-2">
          <h1 className="font-serif text-4xl font-bold text-zinc-950">
            nós.short
          </h1>
          <p className="text-zinc-950">O melhor encurtador de endereços</p>
        </div>
      </div>
      <main className="mt-[108px] flex flex-col items-center gap-2 md:mt-40">
        <form
          className="flex w-full gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            await createShortenedLink();
          }}
        >
          <input
            placeholder="Insira um link para encurtar..."
            type="text"
            className="grow rounded-lg border-2 border-zinc-300 bg-zinc-50 px-6 py-3 invalid:border-orange-500"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button disabled={link === "" || loading}>
            <img src={clipboardIcon} />
          </Button>
        </form>
        <a href="#" className="text-xs">
          Visualizar os últimos links encurtados
        </a>
      </main>
      <footer className="mt-4 flex flex-col items-center justify-center self-end text-xs">
        <p className="w-[10.5rem] text-center md:w-auto">
          Todos os direitos reservados @ Nosso Olhar Solidário 2023
        </p>
      </footer>
    </div>
  );
}
