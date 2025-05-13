export function getJwtFromCookie(): string | null {
  if (typeof document === "undefined") {
    return null;
  }
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1] ?? null
  );
}
