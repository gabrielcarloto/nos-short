import { toast, ToastContainer } from "react-toastify";
import { Link, Route, Switch } from "wouter";

import useCheckConnection from "./hooks/useCheckConnection";
import IndexPage from "./pages";
import LinksPage from "./pages/Links";
import toastDefaults from "./utils/toast-defaults";

import "react-toastify/dist/ReactToastify.min.css";

export default function App() {
  useCheckConnection({
    onOffline: () => {
      toast("Você está offline! Não será possível criar ou remover links.", {
        ...toastDefaults,
        type: "warning",
      });
    },
  });

  return (
    <>
      <div className="m-auto grid min-h-screen w-[min(474px,100%)] grid-rows-[minmax(max-content,35vh)_auto_max-content] py-4 text-zinc-800">
        <div className="flex flex-col justify-between">
          <header className="flex w-full justify-center md:h-[216px] lg:h-[182px]">
            <Link href="/">
              <a title="Voltar à página inicial">
                <img
                  src="/logo.svg"
                  alt="Logo nós.short"
                  className="aspect-square w-32"
                />
              </a>
            </Link>
          </header>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <h1 className="font-serif text-4xl font-bold text-zinc-950">
              nós.short
            </h1>
            <p className="text-zinc-950">O melhor encurtador de endereços</p>
          </div>
        </div>
        <main className="w-full">
          <Switch>
            <Route path="/">
              <IndexPage />
            </Route>
            <Route path="/links">
              <LinksPage />
            </Route>
            <Route>
              <div className="flex h-1/2 flex-col items-center justify-center gap-2">
                <h2 className="font-serif text-3xl font-bold">404</h2>
                <p className="text-lg">Não encontrado</p>
              </div>
            </Route>
          </Switch>
        </main>
        <footer className="mt-4 flex flex-col items-center justify-center self-end text-xs">
          <p className="w-[10.5rem] text-center md:w-auto">
            Todos os direitos reservados @ Nosso Olhar Solidário 2023
          </p>
        </footer>
      </div>
      <ToastContainer />
    </>
  );
}
