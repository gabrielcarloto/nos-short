import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "wouter";

import Button from "../components/Button";
import ShortenedLink from "../components/ShortenedLink";
import useCreateLink from "../hooks/useCreateLink";
import useSetDocumentTitle from "../hooks/useSetDocumentTitle";
import toastDefaults from "../utils/toast-defaults";

import linkIcon from "../assets/Link.svg";

export default function IndexPage() {
  useSetDocumentTitle("Encurtar links");

  const toastId = useRef<ReturnType<typeof toast> | null>(null);
  const [link, setLink] = useState("");
  const [showShortenedLink, setShowShortenedLink] = useState(false);
  const [createShortenedLink, { loading, data: shortenedLink }] = useCreateLink(
    {
      onLoading: () => {
        toastId.current = toast<string>("Encurtando link...", {
          ...toastDefaults,
          isLoading: true,
        });
      },
      onSuccess: () => {
        setShowShortenedLink(true);

        if (toastId.current) {
          toast.update(toastId.current, {
            render: "Link encurtado com sucesso!",
            type: "success",
            autoClose: 5000,
            isLoading: false,
          });

          toastId.current = null;
        }
      },
      onError: () => {
        if (toastId.current) {
          toast.update(toastId.current, {
            render: "Aconteceu algum problema! Tente mais tarde!",
            type: "error",
            autoClose: 5000,
            isLoading: false,
          });

          toastId.current = null;
        }
      },
    },
  );

  return (
    <div className="mt-[108px] flex flex-col items-center gap-2 md:mt-40">
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
            className="grow rounded-lg border-2 border-zinc-300 bg-zinc-50 px-6 py-3 text-zinc-400 placeholder-zinc-400 invalid:border-orange-500"
            value={link}
            disabled={loading}
            onChange={(e) => setLink(e.target.value.trim())}
          />
          <Button title="Encurtar link" disabled={link === "" || loading}>
            <img src={linkIcon} alt="Ícone de corrente" />
          </Button>
        </form>
      )}
      <Link href="/links">
        <a className="text-xs">Visualizar os últimos links encurtados</a>
      </Link>
    </div>
  );
}
