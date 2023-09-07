import { SVGProps, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "wouter";

import ShortenedLink from "../components/ShortenedLink";
import useLazyFetch, { Config } from "../hooks/useLazyFetch";
import useSavedLinks from "../hooks/useSavedLinks";
import useSetDocumentTitle from "../hooks/useSetDocumentTitle";
import { formatTTL } from "../utils/date-format";
import toastDefaults from "../utils/toast-defaults";
import toastPromise, { ToastID } from "../utils/toast-promise";

export default function LinksPage() {
  useSetDocumentTitle("Links salvos");

  const toastId = useRef<ToastID>(null);
  const { links, expires, removeLocalLink } = useUpdatedLinksTTL();

  const removeLinkCallbacks = {
    deleteLinkCallback: removeLocalLink,
    onLoading: () => {
      toastId.current = toastPromise.loading("Removendo link...");
    },
    onSuccess: () => {
      toastPromise.success("Link removido com sucesso!", toastId.current);
      toastId.current = null;
    },
    onError: () => {
      toastPromise.error(
        "Aconteceu algum problema! Tente mais tarde!",
        toastId.current,
      );

      toastId.current = null;
    },
  };

  const [removeLink, { loading: removingLink, linkBeingRemoved }] =
    useRemoveLink(removeLinkCallbacks);

  return (
    <div className="mt-14 flex flex-col items-center gap-2">
      {links.map((l) => {
        return (
          <article
            className="grid w-full grid-cols-2 grid-rows-[repeat(3,auto)] gap-y-2"
            key={l.key}
          >
            <div className="col-span-2 text-xs text-zinc-300">
              <p>
                Link original: <a href={l.url}>{l.url}</a>
              </p>
              <p>Expira em: {expires[l.key]}</p>
            </div>
            <ShortenedLink
              link={l.link_url}
              disabled={linkBeingRemoved === l.key}
              className="col-span-2"
            />
            <button
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => await removeLink(l.key)}
              disabled={removingLink}
              title="Remover link"
              className="flex w-full items-center justify-center gap-2 p-2 font-bold text-zinc-950 transition-colors duration-150 hover:text-orange-500 active:text-orange-800 disabled:text-zinc-600"
            >
              <TrashIcon />
              Remover
            </button>
            <button
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                try {
                  await navigator.share({
                    url: l.link_url,
                  });
                } catch (_) {
                  toast("Aconteceu algum problema! Tente mais tarde!", {
                    ...toastDefaults,
                    type: "error",
                  });
                }
              }}
              disabled={removingLink}
              title="Compartilhar link"
              className="flex w-full items-center justify-center gap-2 p-2 font-bold text-zinc-950 transition-colors duration-150 hover:text-orange-500 active:text-orange-800 disabled:text-zinc-600"
            >
              <ShareIcon />
              Compartilhar
            </button>
          </article>
        );
      })}
      <Link href="/">
        <a className="mt-16 text-xs">Voltar para encurtar mais links</a>
      </Link>
    </div>
  );
}

function useRemoveLink({
  deleteLinkCallback,
  ...config
}: Config<boolean> & { deleteLinkCallback?: (key: string) => void } = {}) {
  const [load, { error, loading }] = useLazyFetch<boolean>(config);
  const [linkBeingRemoved, setLinkBeingRemoved] = useState("");

  async function removeLink(key: string) {
    setLinkBeingRemoved(key);
    const res = await load("destroy/", {
      method: "POST",
      body: JSON.stringify({ key }),
    });

    if (res instanceof Error || !res) return;

    if (deleteLinkCallback) deleteLinkCallback(key);
    setLinkBeingRemoved("");
  }
  return [removeLink, { loading, error, linkBeingRemoved }] as const;
}

function useUpdatedLinksTTL() {
  const [links, setSavedLinks] = useSavedLinks();

  const updateLinksExpires = useCallback(() => {
    const now = Date.now();
    const linksExpires: Record<string, string> = {};

    const filteredLinks = links.filter((link) => {
      const secondsToExpire = (link.expires - now) / 1000;

      if (secondsToExpire > 0) {
        linksExpires[link.key] = formatTTL(secondsToExpire);

        return true;
      }

      return false;
    });

    if (filteredLinks.length !== links.length) setSavedLinks(filteredLinks);

    return linksExpires;
  }, [links, setSavedLinks]);

  const [expires, setExpires] =
    useState<Record<string, string>>(updateLinksExpires);

  useEffect(() => {
    const intervalId = setInterval(() => setExpires(updateLinksExpires), 1000);
    return () => clearInterval(intervalId);
  }, [updateLinksExpires]);

  function removeLocalLink(key: string) {
    setSavedLinks((prev) => prev.filter((link) => link.key !== key));

    setExpires((prevExpires) => {
      const newExpires = structuredClone(prevExpires) as typeof expires;
      delete newExpires[key];
      return newExpires;
    });
  }

  return { links, expires, removeLocalLink } as const;
}

function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 30 30"
      {...props}
    >
      <path
        fill="currentColor"
        d="M26 5h-4.5V3.5A3.5 3.5 0 0018 0h-6a3.5 3.5 0 00-3.5 3.5V5H4a1.5 1.5 0 000 3h.5v17A2.5 2.5 0 007 27.5h16a2.5 2.5 0 002.5-2.5V8h.5a1.5 1.5 0 000-3zM11.5 3.5A.5.5 0 0112 3h6a.5.5 0 01.5.5V5h-7V3.5zm11 21h-15V8h15v16.5zm-9-12.5v8a1.5 1.5 0 11-3 0v-8a1.5 1.5 0 113 0zm6 0v8a1.5 1.5 0 11-3 0v-8a1.5 1.5 0 113 0z"
      ></path>
    </svg>
  );
}

// lucide share-2
function ShareIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  );
}
