import { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

export function CheckIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 30 30"
      {...props}
    >
      <path
        fill="currentColor"
        d="M28.54 8.562L11.93 24.56c-.145.14-.316.25-.506.326a1.61 1.61 0 01-1.7-.326L2.457 17.56a1.5 1.5 0 01-.338-.487 1.454 1.454 0 01.338-1.637c.145-.14.317-.25.506-.326a1.612 1.612 0 011.7.326l6.165 5.937L26.337 6.44A1.59 1.59 0 0127.44 6c.414 0 .81.158 1.103.44.293.282.457.664.457 1.062 0 .399-.164.78-.457 1.063l-.002-.003z"
      ></path>
    </svg>
  );
}

// lucide share-2
export function ShareIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 30 30"
      {...props}
    >
      <path
        fill="currentColor"
        d="M26 5h-4.5V3.5A3.5 3.5 0 0018 0h-6a3.5 3.5 0 00-3.5 3.5V5H4a1.5 1.5 0 000 3h.5v17A2.5 2.5 0 007 27.5h16a2.5 2.5 0 002.5-2.5V8h.5a1.5 1.5 0 000-3zM11.5 3.5A.5.5 0 0112 3h6a.5.5 0 01.5.5V5h-7V3.5zm11 21h-15V8h15v16.5zm-9-12.5v8a1.5 1.5 0 11-3 0v-8a1.5 1.5 0 113 0zm6 0v8a1.5 1.5 0 11-3 0v-8a1.5 1.5 0 113 0z"
      ></path>
    </svg>
  );
}
