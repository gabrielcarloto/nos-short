import type { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from 'react';

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
      className="bg-amber-500 p-2 rounded-lg flex items-center gap-2 text-zinc-50 font-bold disabled:bg-zinc-800 hover:bg-amber-300 focus:bg-amber-800 transition-colors [&_img]:w-[30px] [&_img]:h-[30px] [&_svg]:w-[30px] [&_svg]:h-[30px]"
    >
      {children}
    </button>
  );
}
