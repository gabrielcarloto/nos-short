import { Listbox } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "wouter";

import Button from "../components/Button";
import { CheckIcon } from "../components/Icons";
import ShortenedLink from "../components/ShortenedLink";
import useCheckConnection from "../hooks/useCheckConnection";
import useCreateLink from "../hooks/useCreateLink";
import useSetDocumentTitle from "../hooks/useSetDocumentTitle";
import { DAY, HOUR, MINUTE } from "../utils/date-format";
import toastDefaults from "../utils/toast-defaults";
import toastPromise, { ToastID } from "../utils/toast-promise";

import linkIcon from "../assets/Link.svg";

const LINK_TIME_UNITS = [
  { unit: "minutos", min: 1, max: 59, value: MINUTE },
  { unit: "horas", min: 1, max: 23, value: HOUR },
  { unit: "dias", min: 1, max: 7, value: DAY },
] as const;

const DEFAULT_LINK_TIME_UNIT = LINK_TIME_UNITS[0];

export default function IndexPage() {
  useSetDocumentTitle("Encurtar links");

  const isUserOnline = useCheckConnection();
  const toastId = useRef<ToastID>(null);
  const [link, setLink] = useState("");
  const [linkTimeUnit, setLinkTimeUnit] = useState<
    (typeof LINK_TIME_UNITS)[number]
  >(DEFAULT_LINK_TIME_UNIT);

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
    <div className="mt-[108px] flex flex-col items-center gap-2 md:mt-40 landscape:mt-20 landscape:2xl:mt-[108px]">
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
          className="grid w-full grid-cols-[auto,46px] grid-rows-2 gap-x-4 gap-y-2"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const duration = formData.get("duration");

            if (!duration) {
              return toast("Preencha a duração corretamente", {
                ...toastDefaults,
                type: "error",
              });
            }

            await createShortenedLink(
              link,
              (duration as unknown as number) * linkTimeUnit.value,
            );
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
          <Button
            type="submit"
            disabled={link === "" || loading || !isUserOnline}
          >
            <img src={linkIcon} aria-hidden />
            <span className="sr-only">Encurtar link</span>
          </Button>
          <fieldset className="col-span-2 flex items-center gap-2">
            <legend className="sr-only">Duração do link</legend>
            <label htmlFor="number-input" className="text-sm text-zinc-600">
              Duração:
            </label>
            <input
              id="number-input"
              name="duration"
              type="number"
              min={linkTimeUnit.min}
              max={linkTimeUnit.max}
              defaultValue={10}
              className="w-1/2 grow rounded-lg border-2 border-zinc-300 bg-zinc-50 px-2 py-1 text-center text-zinc-400 placeholder-zinc-400 invalid:border-orange-500"
            />
            <Listbox
              disabled={loading}
              value={linkTimeUnit}
              onChange={setLinkTimeUnit}
              defaultValue={LINK_TIME_UNITS[0]}
            >
              <Listbox.Label className="sr-only">Duração:</Listbox.Label>
              <div className="relative w-1/2 grow">
                <Listbox.Button
                  id="listbox"
                  className="w-full rounded-lg border-2 border-zinc-300 bg-zinc-50 px-6 py-1 text-zinc-400 placeholder-zinc-400 invalid:border-orange-500"
                >
                  {linkTimeUnit.unit}
                </Listbox.Button>
                <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-y-scroll rounded-lg border-2 border-zinc-300 bg-zinc-50 px-2 py-2 text-zinc-600 scrollbar scrollbar-track-zinc-50 scrollbar-thumb-zinc-400 scrollbar-track-rounded-full scrollbar-thumb-rounded-xl scrollbar-w-1">
                  {LINK_TIME_UNITS.map((timeUnit, i) => (
                    <>
                      <Listbox.Option
                        key={timeUnit.value}
                        as={Fragment}
                        value={timeUnit}
                      >
                        {({ selected }) => (
                          <li className="flex cursor-pointer items-center justify-center gap-2 rounded-lg p-1 transition-colors hover:bg-zinc-100 hover:text-zinc-600">
                            {timeUnit.unit}{" "}
                            {selected ? (
                              <CheckIcon width="15" height="15" />
                            ) : null}
                          </li>
                        )}
                      </Listbox.Option>
                      {i < LINK_TIME_UNITS.length - 1 ? (
                        <hr className="my-1" />
                      ) : null}
                    </>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </fieldset>
        </form>
      )}
      <Link href="/links">
        <a className="text-xs">Visualizar os últimos links encurtados</a>
      </Link>
    </div>
  );
}
