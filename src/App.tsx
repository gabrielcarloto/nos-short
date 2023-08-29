import { Route } from "wouter";

import IndexPage from "./pages";

import logoSvg from "./assets/Logo.svg";

export default function App() {
  return (
    <div className="m-auto grid min-h-screen w-[min(474px,100%)] grid-rows-[0.5fr_1fr_max-content] py-4 text-zinc-800">
      <div className="flex flex-col justify-between">
        <header className="flex w-full justify-center md:h-[216px] lg:h-[182px]">
          <img src={logoSvg} alt="Logo nós.short" className="w-32" />
        </header>
        <div className="flex flex-col items-center justify-center gap-y-2">
          <h1 className="font-serif text-4xl font-bold text-zinc-950">
            nós.short
          </h1>
          <p className="text-zinc-950">O melhor encurtador de endereços</p>
        </div>
      </div>
      <main className="mt-[108px] flex flex-col items-center gap-2 md:mt-40">
        <Route path="/">
          <IndexPage />
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
