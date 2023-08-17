import type { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="flex items-center gap-2 rounded-lg bg-amber-500 p-2 font-bold text-zinc-50 transition-colors hover:bg-amber-300 focus:bg-amber-800 disabled:bg-zinc-800 [&_img]:h-[30px] [&_img]:w-[30px] [&_svg]:h-[30px] [&_svg]:w-[30px]"
    >
      {children}
    </button>
  );
}
