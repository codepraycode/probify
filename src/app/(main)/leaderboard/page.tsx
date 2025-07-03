
import { fetchLeaderboardPage } from "@/actions/leaderbaord.action";
import { LeaderboardTable } from "@/components/Profile/Leaderboard";
import { dummyLeaders } from "@/data/dummy";

export default async function LeaderBoardPage() {
    const { success, message, data: resp } = await fetchLeaderboardPage(1);

    if (!success) {
        return <div className="text-red-600">{message}</div>;
    }

    const {
        currentPage,
        data,
        totalPages
    } = resp;

    return <LeaderboardTable data={data} currentPage={currentPage} totalPages={totalPages} isLoading={false}/>;
}