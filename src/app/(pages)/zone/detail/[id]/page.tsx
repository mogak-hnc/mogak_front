import SubCard from "@/app/Component/shared/sub-card";
import ZoneCard from "@/app/Component/shared/zone-card";

export default function ZoneDetail() {
  return (
    <div>
      <SubCard
        subtitle="카페"
        title="카공해요"
        startDate={new Date(`2025.03.01`)}
        endDate=""
        count={9}
      ></SubCard>
      <div>
        <ZoneCard
          image={`https://i.pinimg.com/474x/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg`}
          nickname={`피자`}
          role={`방장`}
          state={`자리비움`}
        ></ZoneCard>
        <ZoneCard
          image={`https://i.namu.wiki/i/CRmL4EVjx2M_uQjtPFePVnm5u8NHGwitbF4ZtBZuKFMw2NcWyh9HGmNWUJHL0_iM9_AxDVnns3qisSoXEFWGwg.jpg`}
          nickname={`폼폼푸린`}
          role={``}
          state={`오프라인`}
        ></ZoneCard>
      </div>
    </div>
  );
}
