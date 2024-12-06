"use client";
import IsAuth from "@/app/components/auth/IsAuth";
import {useGetUserProfileByUserIdQuery} from "@/lib/features/userProfiles/userProfileApiSlice";
import UserProfileCreateForm from "@/app/components/form/user/UserProfileCreateForm";
import UserProfileUpdateForm from "@/app/components/form/user/UserProfileUpdateForm";
import DataFetching from "@/app/components/fetch/DataFetching";

function Page(){
    const {data:userProfileStructure,isError,isFetching,isLoading,isSuccess} = useGetUserProfileByUserIdQuery(undefined);

    return(
        <>
            <DataFetching
                isError={isError}
                isFetching={isFetching}
                isLoading={isLoading}
                isSuccess={isSuccess}
            >
                {userProfileStructure && (
                    userProfileStructure.profile ?
                        <UserProfileUpdateForm profile={userProfileStructure.profile}/> :
                        <UserProfileCreateForm/>
                )}
            </DataFetching>
        </>
    )
}

export default IsAuth(Page);