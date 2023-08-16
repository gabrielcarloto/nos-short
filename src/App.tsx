import logoSvg from './assets/Logo.svg';

export default function App() {
  return (
    <div className="w-[min(474px,100%)] py-4 min-h-screen grid grid-rows-[max-content_auto_max-content] m-auto text-zinc-800">
      <div className="flex flex-col gap-5">
        <header className="pb-[10px] w-full flex justify-center">
          <img src={logoSvg} alt="Logo nós.short" className="w-32" />
        </header>
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <h1 className="font-serif text-4xl font-bold text-zinc-950">
            nós.short
          </h1>
          <p className="text-zinc-950">O melhor encurtador de endereços</p>
        </div>
      </div>
      <main className="flex flex-col items-center gap-2 mt-[108px] md:mt-40">
        <form className="flex w-full gap-4">
          <input
            placeholder="Insira um link para encurtar..."
            type="url"
            className="w-full py-3 px-6 border-2 rounded-lg border-zinc-300 bg-zinc-50"
          />
          <button className="p-2 bg-amber-800 rounded-lg">ICON</button>
        </form>
        <a href="#" className="text-xs">
          Visualizar os últimos links encurtados
        </a>
      </main>
      <footer className="flex flex-col items-center justify-center text-xs self-end mt-4">
        <p className="w-[10.5rem] md:w-auto text-center">
          Todos os direitos reservados @ Nosso Olhar Solidário 2023
        </p>
      </footer>
    </div>
  );
}
