import ZoneCard from "@/app/Component/shared/zone-card";

export default function ZoneDetail() {
  return (
    <div>
      zone detail
      <ZoneCard
        image={`https://i.pinimg.com/474x/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg`}
        nickname={`다정`}
        role={`방장`}
        state={`자리비움`}
      ></ZoneCard>
    </div>
  );
}
