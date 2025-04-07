import ThemeProvider from "./theme-provider";
import logoLight from "./img/mogaklogo_light.png";
import HeaderNavigation from "./header-navigation";
import Link from "next/link";

export default function Header() {
  return (
    <div className="relative flex items-center justify-between px-8 py-4">
      <Link href={`/`} className="flex items-center gap-5 cursor-pointer">
        <img className="w-20 h-auto" src={logoLight.src} />
        <span>모여서 각자!</span>
      </Link>

      <div className="absolute left-2/3 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <HeaderNavigation />
      </div>

      <ThemeProvider />
    </div>
  );
}
