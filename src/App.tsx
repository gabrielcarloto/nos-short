import { Route } from "wouter";

import IndexPage from "./pages";
import LinksPage from "./pages/Links";

export default function App() {
  return (
    <div className="m-auto grid min-h-screen w-[min(474px,100%)] grid-rows-[35vh_auto_max-content] py-4 text-zinc-800">
      <div className="flex flex-col justify-between">
        <header className="flex w-full justify-center md:h-[216px] lg:h-[182px]">
          <img
            src="/logo.svg"
            alt="Logo nós.short"
            className="aspect-square w-32"
          />
        </header>
        <div className="flex flex-col items-center justify-center gap-y-2">
          <h1 className="font-serif text-4xl font-bold text-zinc-950">
            nós.short
          </h1>
          <p className="text-zinc-950">O melhor encurtador de endereços</p>
        </div>
      </div>
      <main className="w-full">
        <Route path="/">
          <IndexPage />
        </Route>
        <Route path="/links">
          <LinksPage />
        </Route>
      </main>
      <footer className="mt-4 flex flex-col items-center justify-center self-end text-xs">
        <p className="w-[10.5rem] text-center md:w-auto">
          Todos os direitos reservados @ Nosso Olhar Solidário 2023
        </p>
      </footer>
    </div>
  );
}
