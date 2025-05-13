import SearchCard from "@/app/components/shared/search-card";
import SearchResultCard from "@/app/components/shared/search-result-card";
import { ZoneTags } from "@/lib/zone.api";

export default async function ZonePage() {
  const tags = await ZoneTags();
  return (
    <div>
      <SearchCard
        key={`search-card-studySpace`}
        type="studySpace"
        title="모각존"
        description="모여서 각자, 공부나 작업하기!"
        tags={tags}
        sort="최신순"
        section="모각존"
      />
      <SearchResultCard type="studySpace" />
    </div>
  );
}
