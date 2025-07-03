import Breadcrumb from "@/components/Common/Breadcrumb";
import UserProfileCard from "@/components/Profile/UserProfileCard";
import { dummyUsers } from "@/data/dummy";

export default function ProfilePage() {
    const userData = dummyUsers[0];

    

    return (
        <>
            <Breadcrumb
                pageName="My Profile"
                description={`Welcome back, ${userData.name?.split(" ")[0] ?? "learner"}!`}
                trail={[]}
            />

            <UserProfileCard user={userData} report={{}} />
        </>
    );
}