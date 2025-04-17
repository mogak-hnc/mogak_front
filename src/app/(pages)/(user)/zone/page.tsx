import MainSubCard, {
  MainSubCardProps,
} from "@/app/Component/shared/main-sub-card";
import SearchCard from "@/app/Component/shared/search-card";

const mockStudySpaces: MainSubCardProps[] = [
  {
    type: "studySpace",
    tag: "#카페",
    title: "카공해요",
    participants: ["/user1.png", "/user2.png", "/user3.png", "/user4.png"],
  },
  {
    type: "studySpace",
    tag: "#스터디룸",
    title: "조용한 방",
    participants: ["/user1.png"],
  },
  {
    type: "studySpace",
    tag: "#도서관",
    title: "같이 집중해요",
    participants: ["/user1.png", "/user2.png"],
  },
];

export default function ZonePage() {
  return (
    <div>
      <SearchCard
        title="모각존"
        description="모각에서.. 어쩌구.."
        tags={["카페", "독서실"]}
        sort="최신순"
        section="모각존"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockStudySpaces.map((m) => (
          <MainSubCard
            key={`main-sub-card-${m.type}-${m.title}`}
            {...m}
          ></MainSubCard>
        ))}
      </div>
    </div>
  );
}
