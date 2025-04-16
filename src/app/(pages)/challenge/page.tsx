import MainSubCard, {
  MainSubCardProps,
} from "@/app/Component/shared/main-sub-card";
import SearchCard from "@/app/Component/shared/search-card";

const mockChallenges: MainSubCardProps[] = [
  {
    type: "challenge",
    tag: "매일 인증",
    title: "매일 공부 인증하기",
    description: "2025. 01. 01 ~ 2025. 03. 25",
    participants: ["/user1.png", "/user2.png", "/user3.png", "/user4.png"],
    isOfficial: true,
  },
  {
    type: "challenge",
    tag: "영어 단어",
    title: "단어 100개 외우기",
    description: "2025. 04. 01 ~ 2025. 04. 30",
    participants: ["/user1.png", "/user2.png"],
    isOfficial: false,
  },
  {
    type: "challenge",
    tag: "코테 대비",
    title: "백준 매일 1문제",
    description: "2025. 03. 20 ~ 2025. 05. 01",
    participants: ["/user1.png", "/user2.png", "/user3.png"],
    isOfficial: true,
  },
];

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockChallenges.map((m) => (
          <MainSubCard
            key={`main-sub-card-${m.type}-${m.title}`}
            {...m}
          ></MainSubCard>
        ))}
      </div>
    </div>
  );
}
