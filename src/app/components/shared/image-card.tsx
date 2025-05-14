"use client";

import Link from "next/link";
import Button from "../ui/button";
import { ImageCardProps } from "@/types/shared.type";

export default function ImageCard({
  title,
  description1,
  description2,
  button,
  buttonUrl,
  img1,
  img2,
  img3,
  bgImageLight,
  bgImageDark,
}: ImageCardProps) {
  return (
    <div className="flex justify-center w-full px-4">
      <div className="relative w-full max-w-7xl flex flex-col lg:flex-row items-center gap-6">
        <div
          className="relative w-full lg:w-4/5 aspect-[5/4] sm:aspect-[5/3] md:aspect-[5/2] bg-cover bg-left rounded-lg overflow-hidden"
          style={{ backgroundImage: `url(${bgImageLight})` }}
        >
          <div
            className="hidden dark:block absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${bgImageDark})`,
              backgroundSize: "cover",
              backgroundPosition: "left",
            }}
          />

          {img1 && (
            <img
              src={img1}
              alt="img1"
              className="absolute top-10 right-6 w-20 sm:w-40 lg:w-52 z-10"
            />
          )}
          {img2 && (
            <img
              src={img2}
              alt="img2"
              className="absolute top-10 left-6 w-20 sm:w-40 lg:w-52 z-10"
            />
          )}
          {img3 && (
            <img
              src={img3}
              alt="img3"
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-20 sm:w-40 lg:w-56 z-10"
            />
          )}

          <div className="absolute inset-0 flex items-center justify-center lg:hidden z-10">
            <div className="backdrop-blur-md border border-borders text-gray-900 text-center p-6 rounded-lg max-w-md">
              <h2 className="text-2xl sm:text-3xl text-primary dark:text-primary-dark font-bold">
                {title}
              </h2>
              <div className="text-base text-text dark:text-borders sm:text-lg mt-2">
                <p>{description1}</p>
                {description2 && <p>{description2}</p>}
              </div>
              <Link href={buttonUrl}>
                <Button variant="secondary" className="mt-4">
                  {button}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-col justify-center gap-4 lg:w-1/5">
          <h2 className="text-3xl font-bold text-primary">{title}</h2>
          <div className="text-base text-gray-700 dark:text-gray-300">
            <p>{description1}</p>
            {description2 && <p>{description2}</p>}
          </div>
          <Link href={buttonUrl}>
            <Button variant="secondary">{button}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
