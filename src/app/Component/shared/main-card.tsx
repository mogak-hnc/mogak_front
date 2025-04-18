import { MainCardProps } from "@/types";
import Link from "next/link";

export default function MainCard({
  image,
  title,
  description1,
  description2,
  button,
  buttonUrl,
}: MainCardProps) {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-row items-center gap-10">
        <img
          className="w-100 h-auto object-contain"
          src={image}
          alt="preview"
        />

        <div className="flex flex-col justify-center gap-4 max-w-sm">
          <h2 className="text-xl font-bold text-primary">{title}</h2>
          <div>
            <p>{description1}</p>
            {description2 && <p>{description2}</p>}
          </div>
          <Link
            href={buttonUrl}
            className="bg-secondary hover:bg-secondary-dark text-text
            dark:bg-secondary-dark dark:hover:bg-secondary dark:text-text
            px-4 py-2 rounded-md text-sm font-semibold w-fit
             transition-colors duration-300"
          >
            {button}
          </Link>
        </div>
      </div>
    </div>
  );
}
