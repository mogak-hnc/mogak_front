export function MainSubTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-10 items-center my-5">
      <div className="bg-primary dark:bg-primary-dark text-background dark:text-dark px-2 py-1 rounded-md text-sm font-semibold w-fit">
        {title}
      </div>
      <div className="text-xs">{description}</div>
    </div>
  );
}
