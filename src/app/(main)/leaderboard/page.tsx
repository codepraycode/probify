
import { LeaderboardTable } from "@/components/Profile/Leaderboard";
import { dummyLeaders } from "@/data/dummy";

export default function LeaderBoardPage() {
    return <LeaderboardTable leaders={dummyLeaders} />;
}