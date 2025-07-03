
import Breadcrumb from "@/components/Common/Breadcrumb";
import ContainerLayout from "@/components/ui/ContainerLayout";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Breadcrumb
                pageName="My Profile"
                description={`Welcome back, learner!`}
                trail={[]}
            />

            <ContainerLayout>
                {children}
            </ContainerLayout>
        </>
    );
}
