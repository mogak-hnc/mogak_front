import { ZoneTags } from "@/lib/zone.api";
import ZoneResultCard from "./zone-result-card";
import SearchCardView from "@/app/components/shared/search-card-view";
import ZoneSearchCard from "./zone-search-card";

export default async function ZonePage() {
  const tags = await ZoneTags();
  return (
    <div>
      <ZoneSearchCard
        key={`search-card-studySpace`}
        title="모각존"
        description="모여서 각자, 공부나 작업하기!"
        tags={tags}
        sort="최신순"
        section="모각존"
      />
      <ZoneResultCard />
    </div>
  );
}
