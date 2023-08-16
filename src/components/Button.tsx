import type {
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  ReactNode,
  HTMLProps,
} from 'react';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
}

function Root({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-amber-500 p-2 rounded-lg flex items-center gap-2 text-zinc-50 font-bold disabled:bg-zinc-800 hover:bg-amber-300 focus:bg-amber-800 transition-colors"
    >
      {children}
    </button>
  );
}

interface ButtonIconProps extends HTMLProps<HTMLImageElement> {}

function Icon(props: ButtonIconProps) {
  return <img {...props} className="w-[30px] h-[30px]" />;
}

export default {
  Root,
  Icon,
};
