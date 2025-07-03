
import Breadcrumb from "@/components/Common/Breadcrumb";
import ContainerLayout from "@/components/ui/ContainerLayout";

export default function LeaderboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Breadcrumb
                pageName="Leaderboard"
                description="View learner rankings based on accuracy, speed, and consistency in probability exercises."
                trail={[]}
            />

            <ContainerLayout>{children}</ContainerLayout>
        </>
    );
}
