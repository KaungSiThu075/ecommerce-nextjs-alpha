import {UserProfileInterfaceForReview} from "@/lib/features/userProfiles/userProfileApiSlice";
import ThemeButton from "@/app/components/button/ThemeButton";

export default function UserProfileForReview({user}:{user:UserProfileInterfaceForReview}){

    return(
        <div className=" flex items-center mb-1">
            <img className=" w-[60px] h-[60px] rounded-full" src={user.profileAvatar} alt={user.name}/>
            <ThemeButton>
                {user.name}
            </ThemeButton>
        </div>
    )
}