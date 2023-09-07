import { useRef, useState } from "react";
import { Link } from "wouter";

import Button from "../components/Button";
import ShortenedLink from "../components/ShortenedLink";
import useCreateLink from "../hooks/useCreateLink";
import useSetDocumentTitle from "../hooks/useSetDocumentTitle";
import { DAY, formatTTL, HOUR, MINUTE } from "../utils/date-format";
import toastPromise, { ToastID } from "../utils/toast-promise";

import linkIcon from "../assets/Link.svg";

function createTimeRange(length: number, time: number) {
  return Array.from({ length }, (_, i) => time * (i + 1));
}

const RANGE_SECONDS = [
  MINUTE,
  ...createTimeRange(5, MINUTE * 10),
  ...createTimeRange(23, HOUR),
  ...createTimeRange(7, DAY),
];

const RANGE_VALUES = RANGE_SECONDS.map((s) => {
  return {
    text: formatTTL(s),
    seconds: s,
  };
});

const TEN_MINUTES_RANGE_INDEX = 1;

export default function IndexPage() {
  useSetDocumentTitle("Encurtar links");

  const toastId = useRef<ToastID>(null);
  const [link, setLink] = useState("");
  const [linkTTL, setLinkTTL] = useState(TEN_MINUTES_RANGE_INDEX);
  const [showShortenedLink, setShowShortenedLink] = useState(false);

  const createLinkCallbacks = {
    onLoading: () => {
      toastId.current = toastPromise.loading("Encurtando link...");
    },
    onSuccess: () => {
      setShowShortenedLink(true);

      if (!toastId.current) return;
      toastPromise.success("Link encurtado com sucesso!", toastId.current);
      toastId.current = null;
    },
    onError: () => {
      if (toastId.current) return;

      toastPromise.error(
        "Aconteceu algum problema! Tente mais tarde!",
        toastId.current,
      );

      toastId.current = null;
    },
  };

  const [createShortenedLink, { loading, data: shortenedLink }] =
    useCreateLink(createLinkCallbacks);

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
          className="grid w-full grid-cols-[auto,max-content] grid-rows-[auto,repeat(2,max-content)] gap-x-4 gap-y-2"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={async (e) => {
            e.preventDefault();
            await createShortenedLink(link, RANGE_VALUES[linkTTL].seconds);
          }}
        >
          <label className="sr-only" htmlFor="link-input">
            URL a ser encurtada:
          </label>
          <input
            placeholder="Insira um link para encurtar..."
            type="text"
            className="grow rounded-lg border-2 border-zinc-300 bg-zinc-50 px-6 py-3 text-zinc-400 placeholder-zinc-400 invalid:border-orange-500"
            value={link}
            id="link-input"
            disabled={loading}
            onChange={(e) => setLink(e.target.value.trim())}
          />
          <Button title="Encurtar link" disabled={link === "" || loading}>
            <img src={linkIcon} alt="Ícone de corrente" />
          </Button>
          <label htmlFor="link-ttl" className="text-sm text-zinc-600">
            Duração:{" "}
            <span aria-live="polite" aria-atomic="true">
              {RANGE_VALUES[linkTTL].text}
            </span>
          </label>
          <input
            id="link-ttl"
            className="col-span-2 accent-amber-500"
            type="range"
            min={0}
            max={RANGE_VALUES.length - 1}
            value={linkTTL}
            onChange={(e) => setLinkTTL(e.target.valueAsNumber)}
            disabled={loading}
          />
        </form>
      )}
      <Link href="/links">
        <a className="text-xs">Visualizar os últimos links encurtados</a>
      </Link>
    </div>
  );
}
