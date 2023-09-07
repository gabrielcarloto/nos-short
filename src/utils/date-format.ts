export const MINUTE = 60,
  HOUR = MINUTE * 60,
  DAY = HOUR * 24;

function pluralize(num: number, str: string) {
  return num !== 1 ? str + "s" : str;
}

function filterZero(str: string) {
  return str[0] === "0" ? "" : str;
}

function join(a: string, b: string) {
  return a + (b.length > 0 ? " e " : "") + b;
}

function formatTimeString(num: number, str: string) {
  return filterZero(Math.floor(num) + " " + pluralize(num, str));
}

export function formatTTL(seconds: number) {
  if (seconds < MINUTE) return formatTimeString(seconds, "segundo");
  if (seconds < HOUR) return formatTimeString(seconds / MINUTE, "minuto");

  if (seconds < DAY)
    return join(
      formatTimeString(seconds / HOUR, "hora"),
      formatTimeString((seconds % HOUR) / MINUTE, "minuto"),
    );

  if (seconds === DAY * 7) return "1 semana";

  return formatTimeString(seconds / DAY, "dia");
}
