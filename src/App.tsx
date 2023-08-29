import { useState } from "react";

import Button from "./components/Button";
import ShortenedLink from "./components/ShortenedLink";
import useCreateLink from "./hooks/useCreateLink";

import linkIcon from "./assets/Link.svg";
import logoSvg from "./assets/Logo.svg";

export default function App() {
  const [link, setLink] = useState("");
  const [showShortenedLink, setShowShortenedLink] = useState(false);
  const [createShortenedLink, { loading, data: shortenedLink }] = useCreateLink(
    {
      onSuccess: () => setShowShortenedLink(true),
    },
  );

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
        {showShortenedLink ? (
          <>
            <ShortenedLink link={shortenedLink!.link_url} />
            <button
              onClick={() => {
                setShowShortenedLink(false);
                setLink("");
              }}
              className="text-xs"
            >
              Voltar para encurtar mais links
            </button>
          </>
        ) : (
          <form
            className="flex w-full gap-4"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={async (e) => {
              e.preventDefault();
              await createShortenedLink(link);
            }}
          >
            <input
              placeholder="Insira um link para encurtar..."
              type="text"
              className="grow rounded-lg border-2 border-zinc-300 bg-zinc-50 px-6 py-3 invalid:border-orange-500"
              value={link}
              disabled={loading}
              onChange={(e) => setLink(e.target.value)}
            />
            <Button title="Encurtar link" disabled={link === "" || loading}>
              <img src={linkIcon} />
            </Button>
          </form>
        )}
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
