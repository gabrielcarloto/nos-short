// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function safeCall<T extends (...args: any[]) => void>(
  fn?: T,
  ...args: Parameters<T>
) {
  if (fn) fn(...args);
}
