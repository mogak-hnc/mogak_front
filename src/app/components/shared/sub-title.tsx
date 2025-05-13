export default function SubTitle({ contents }: { contents: string }) {
  return (
    <div className="flex justify-center items-center my-3 mb-7">
      <div className="text-2xl font-bold text-primary dark:text-primary-dark">
        {contents}
      </div>
    </div>
  );
}
