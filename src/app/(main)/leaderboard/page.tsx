
import Breadcrumb from "@/components/Common/Breadcrumb";
import { LeaderboardTable } from "@/components/Profile/Leaderboard";
import ContainerLayout from "@/components/ui/ContainerLayout";
import { dummyLeaders } from "@/data/dummy";

export default function LeaderBoardPage() {
    return (
        <ContainerLayout>
            <Breadcrumb
                pageName="Leaderboard"
                description="View learner rankings based on accuracy, speed, and consistency in probability exercises."
                trail={[]}
            />

            <LeaderboardTable leaders={dummyLeaders} />
        </ContainerLayout>
    );
}