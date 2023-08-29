import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";

import ShortenedLink from "../components/ShortenedLink";
import useSavedLinks from "../hooks/useSavedLinks";

export default function LinksPage() {
  const [links, setSavedLinks] = useSavedLinks();

  const updateLinksExpires = useCallback(() => {
    const now = Date.now();
    const linksExpires: Record<string, number> = {};

    const filteredLinks = links.filter((link) => {
      const secondsToExpire = (new Date(link.expires).valueOf() - now) / 1000;

      if (secondsToExpire > 0) {
        linksExpires[link.key] = Math.floor(secondsToExpire);
        return true;
      }

      return false;
    });

    if (filteredLinks.length !== links.length) setSavedLinks(filteredLinks);

    return linksExpires;
  }, [links, setSavedLinks]);

  const [expires, setExpires] =
    useState<Record<string, number>>(updateLinksExpires);

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
              <p>Link original: {l.url}</p>
              <p>Expira em: {expires[l.key]} segundos</p>
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
