import SearchCard from "@/app/Component/shared/search-card";

export default function Zone() {
  return (
    <div>
      <SearchCard
        title="모각존"
        description="모각에서.. 어쩌구.."
        tags={["카페", "독서실"]}
        sort="최신순"
        section="모각존"
      />
    </div>
  );
}
