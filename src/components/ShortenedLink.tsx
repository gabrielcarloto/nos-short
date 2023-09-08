import { useRef, useState } from "react";
import { toast } from "react-toastify";

import toastDefaults from "../utils/toast-defaults";
import Button from "./Button";
import { CheckIcon } from "./Icons";

import clipboardIcon from "../assets/Clipboard.svg";

export default function ShortenedLink({
  link,
  className,
  disabled = false,
}: {
  link: string;
  disabled?: boolean;
  className?: string;
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const anchorRef = useRef<HTMLAnchorElement | null>(null);

  return (
    <div className={"flex w-full gap-4 " + className}>
      <a
        href={link}
        className="grow rounded-lg border-2 border-zinc-300 bg-zinc-50 px-6 py-3 text-zinc-400 invalid:border-orange-500 aria-disabled:pointer-events-none"
        aria-disabled={disabled}
        ref={anchorRef}
        onClick={(e) => {
          if (anchorRef.current && anchorRef.current.ariaDisabled === "true")
            e.preventDefault();
        }}
      >
        {link}
      </a>
      <Button
        title="Copiar link encurtado"
        disabled={disabled}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(link);
            setCopiedLink(true);
            toast<string>("Foi copiado na sua área de transferência", {
              ...toastDefaults,
              type: "success",
            });

            setTimeout(() => setCopiedLink(false), 5000);
          } catch (_) {
            toast<string>("Aconteceu algum problema! Tente mais tarde!", {
              ...toastDefaults,
              type: "error",
            });
          }
        }}
      >
        {copiedLink ? (
          <CheckIcon aria-hidden />
        ) : (
          <img src={clipboardIcon} aria-hidden />
        )}
      </Button>
    </div>
  );
}
