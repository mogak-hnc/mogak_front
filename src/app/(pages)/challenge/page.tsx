import SearchCard from "@/app/Component/shared/search-card";

export default function Challenge() {
  return (
    <div>
      <SearchCard
        title="챌린지"
        description="챌린지..어쩌구"
        tags={["공식 챌린지"]}
        sort="최신순"
        section="챌린지"
      />
    </div>
  );
}
