
import UserProfileCard from "@/components/Profile/UserProfileCard";
import { getUserProfile } from "@/actions/profile.action";

export default async function ProfilePage() {

    const {
        data,
        message,
        success
    } = await getUserProfile();


    const {
        user,
        averageScore,
        rank
    } = data;

    

    return (
        <UserProfileCard
            user={user}
            report={{
                _count: user._count,
                averageScore,
                rank, // Placeholder rank
            }}
        />
    );
}
