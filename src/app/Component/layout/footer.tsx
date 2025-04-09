import logoWhite from "../img/mogaklogo_white.png";

export default function Footer() {
  return (
    <div className="bg-borders text-text dark:bg-border-dark dark:text-text-dark rounded-t-lg py-4 px-16">
      <img className="w-20 h-auto mb-2" src={logoWhite.src} alt="MOGAK 로고" />
      <p className="mb-1">모각 | 모여서 각자</p>

      <p className="mb-1 text-sm">
        <b>문의</b>&emsp;
        <a
          href="mailto:foryouthteam.hnc@gmail.com"
          className="underline hover:text-primary"
        >
          foryouthteam.hnc@gmail.com
        </a>
      </p>
      <p className="mb-1 text-xs">© 2025 MOGAK. All rights reserved.</p>
    </div>
  );
}
