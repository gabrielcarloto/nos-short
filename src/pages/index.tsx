import { useState } from "react";

import Button from "../components/Button";
import ShortenedLink from "../components/ShortenedLink";
import useCreateLink from "../hooks/useCreateLink";

import linkIcon from "../assets/Link.svg";

export default function IndexPage() {
  const [link, setLink] = useState("");
  const [showShortenedLink, setShowShortenedLink] = useState(false);
  const [createShortenedLink, { loading, data: shortenedLink }] = useCreateLink(
    {
      onSuccess: () => setShowShortenedLink(true),
    },
  );

  return (
    <>
      {" "}
      {showShortenedLink ? (
        <>
          <ShortenedLink link={shortenedLink.link_url} />
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
            className="grow rounded-lg border-2 border-zinc-300 bg-zinc-50 px-6 py-3 text-zinc-400 placeholder-zinc-400 invalid:border-orange-500"
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
    </>
  );
}
