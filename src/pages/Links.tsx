import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";

import ShortenedLink from "../components/ShortenedLink";
import useSavedLinks from "../hooks/useSavedLinks";
import useSetDocumentTitle from "../hooks/useSetDocumentTitle";

export default function LinksPage() {
  useSetDocumentTitle("Links salvos");

  const [links, setSavedLinks] = useSavedLinks();

  const updateLinksExpires = useCallback(() => {
    const now = Date.now();
    const linksExpires: Record<string, string> = {};

    const filteredLinks = links.filter((link) => {
      const secondsToExpire = (link.expires - now) / 1000;

      if (secondsToExpire > 0) {
        linksExpires[link.key] = formatExpires(secondsToExpire);

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
    const intervalId = setInterval(() => {
      const linksExpires = updateLinksExpires();
      setExpires(linksExpires);

      return () => {
        clearInterval(intervalId);
      };
    }, 1000);
  }, [updateLinksExpires]);

  return (
    <div className="mt-14 flex flex-col items-center gap-2">
      {links.map((l) => {
        return (
          <article className="grid w-full gap-2" key={l.key}>
            <div className="text-xs text-zinc-300">
              <p>
                Link original: <a href={l.url}>{l.url}</a>
              </p>
              <p>Expira em: {expires[l.key]}</p>
            </div>
            <ShortenedLink link={l.link_url} />
          </article>
        );
      })}
      <Link href="/">
        <a className="mt-16 text-xs">Voltar para encurtar mais links</a>
      </Link>
    </div>
  );
}

function formatExpires(secondsDiff: number) {
  const minute = 60,
    hour = minute * 60,
    day = hour * 24;

  if (secondsDiff < minute) return Math.round(secondsDiff) + " segundos";
  if (secondsDiff < hour) return Math.round(secondsDiff / minute) + " minutos";

  if (secondsDiff < day)
    return `${Math.round(secondsDiff / hour)} horas e ${Math.round(
      (secondsDiff % hour) / minute,
    )} minutos`;

  const days = Math.round(secondsDiff / day);

  return days + " dia" + (days > 1 ? "s" : "");
}
