import { ZoneTags } from "@/lib/shared/zone.api";
import ZoneSearchCard from "./zone-search-card";

export const metadata = {
  title: "모각 | 모각존",
  description: "함께 공부하는 모각존에 참가해 보세요.",
};

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
    </div>
  );
}
