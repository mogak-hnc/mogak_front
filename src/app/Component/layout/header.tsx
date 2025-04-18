import Link from "next/link";
import ThemeProvider from "../theme-provider";
import logoLight from "../img/mogaklogo_light.png";
import HeaderNavigation from "./header-navigation";

export default function Header() {
  return (
    <header className="w-full border-b border-borders dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between">
        <div className="flex flex-col items-center gap-1 lg:flex-row lg:gap-3">
          <Link href="/" className="flex items-center gap-2">
            <img src={logoLight.src} alt="logo" className="w-20 h-auto" />
            <span className="text-base font-semibold whitespace-nowrap">
              모여서 각자!
            </span>
          </Link>
        </div>

        <nav className="hidden lg:flex ml-auto mr-4 gap-6 text-sm font-medium">
          <HeaderNavigation />
        </nav>

        <ThemeProvider />
      </div>

      <nav className="lg:hidden flex justify-center gap-4 pb-2 text-sm font-medium">
        <HeaderNavigation />
      </nav>
    </header>
  );
}
