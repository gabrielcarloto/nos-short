import Button from "./Button";

import clipboardIcon from "../assets/Clipboard.svg";

export default function ShortenedLink({ link }: { link: string }) {
  return (
    <div className="flex w-full gap-4">
      <a
        href={link}
        className="grow rounded-lg border-2 border-zinc-300 bg-zinc-50 px-6 py-3 text-zinc-400 invalid:border-orange-500"
      >
        {link}
      </a>
      <Button
        title="Copiar link encurtado"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => {
          await navigator.clipboard.writeText(link);
        }}
      >
        <img src={clipboardIcon} />
      </Button>
    </div>
  );
}
