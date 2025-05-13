import SearchCard from "@/app/Component/shared/search-card";
import SearchResultCardWrapper from "@/app/Component/wrapper/search-result-card-wrapper";

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
      <SearchResultCardWrapper type="studySpace" />
    </div>
  );
}
