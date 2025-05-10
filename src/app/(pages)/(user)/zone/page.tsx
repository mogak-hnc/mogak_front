import MainSubCard from "@/app/Component/shared/main-sub-card";
import SearchCard from "@/app/Component/shared/search-card";
import { ZoneMain } from "@/lib/zone.api";
import { MainSubCardProps } from "@/types";

export default async function ZonePage() {
  const data = await ZoneMain();
  return (
    <div>
      <SearchCard
        title="모각존"
        description="모여서 각자, 공부나 작업하기!"
        tags={["카페", "독서실"]}
        sort="최신순"
        section="모각존"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((m) => (
          <MainSubCard
            key={`main-sub-card-${m.type}-${m.title}`}
            {...m}
          ></MainSubCard>
        ))}
      </div>
    </div>
  );
}
