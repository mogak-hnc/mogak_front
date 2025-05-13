import SearchCard from "@/app/components/shared/search-card";
import SearchResultCard from "@/app/components/shared/search-result-card";

export default function ZonePage() {
  return (
    <div>
      <SearchCard
        type="studySpace"
        title="모각존"
        description="모여서 각자, 공부나 작업하기!"
        tags={["카페", "독서실"]}
        sort="최신순"
        section="모각존"
      />
      <SearchResultCard type="studySpace" />
    </div>
  );
}
