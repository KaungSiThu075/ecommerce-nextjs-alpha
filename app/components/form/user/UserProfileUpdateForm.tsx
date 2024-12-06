import {UserProfileInterface, useUpdateUserProfileMutation} from "@/lib/features/userProfiles/userProfileApiSlice";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserProfileSchema, userProfileSchema} from "@/app/components/schema/userProfileCreate";
import {useState} from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';

export default function UserProfileUpdateForm({profile}:{profile:UserProfileInterface}){
    const [updateUserProfileApi,updateUserProfileResult] = useUpdateUserProfileMutation();

    const { register,handleSubmit,control } = useForm<UserProfileSchema>({resolver:zodResolver(userProfileSchema), defaultValues:profile})

    const [edit,setEdit] = useState(false);
    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const editHandler = () => {setEdit(!edit)}

    const handleImgChange = (e:any) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImgPreview(URL.createObjectURL(file));
        }
    }

    const submitUserProfileUpdateHandler = (data:any) => {

            const formData = new FormData();

            formData.append('name', data.name);
            formData.append('gender', data.gender);
            formData.append('phoneNumber', data.phoneNumber);
            formData.append('address', data.address);

            if(selectedFile)
            {
                formData.append('profileAvatar', selectedFile);
            }

            else if(data.profileAvatar)
            {
                formData.append('profileAvatar',data.profileAvatar);
            }

            updateUserProfileApi(formData).unwrap().then(data=>{
                console.log('data from server ',data);
                setEdit(!edit);
            })

    }

    console.log('profile in update form ',profile);
    return(
            <form className=" flex flex-col items-center justify-center gap-2"
                  onSubmit={handleSubmit(submitUserProfileUpdateHandler)}>
                <input
                    style={{display: 'none'}}
                    type={"file"} {...register('profileAvatar')}
                    onChange={handleImgChange}
                    id={'imgInput'}
                />

                <img
                    className="w-[150px] h-[150px] rounded-full cursor-pointer"
                    onClick={() => document.getElementById('imgInput')!.click()}
                    src={imgPreview || profile.profileAvatar}
                    alt={'avatar'}
                />

                <input
                    className={`input input-bordered w-full max-w-xs ${!edit ? "pointer-events-none" : ""}`}
                    type={"text"}
                    {...register('name')}
                    readOnly={!edit}
                />

                <select
                    {...register('gender')}
                    className={`select select-bordered w-full max-w-xs ${!edit ? "pointer-events-none" : ""}`}
                >
                    <option value="male">MALE</option>
                    <option value="female">FEMALE</option>
                    <option value="others">OTHERS</option>
                </select>

                <Controller
                    control={control}
                    name={"phoneNumber"}
                    render={({field}) => (
                        <PhoneInput
                            country="mm"
                            value={field.value}
                            onChange={(phone) => field.onChange(phone)}
                            disabled={!edit}
                        />
                    )}
                />

                <textarea
                    className={`textarea textarea-bordered w-full ${!edit ? "pointer-events-none" : ""}`}
                    {...register('address')}
                    readOnly={!edit}
                ></textarea>

                {edit ? (
                    <div className="w-full flex items-center justify-between">
                        <button
                            className=" btn w-2/5"
                            type={"button"}
                            onClick={() => setEdit(!edit)}
                        >
                            CANCEL
                        </button>

                        <button
                            className="btn w-2/5"
                            type={"submit"}
                        >
                            UPDATE
                        </button>
                    </div>) :
                    (<button
                        className="btn w-full"
                        onClick={editHandler}
                        type={"button"}
                    >
                        EDIT
                    </button>)}
            </form>
    )
}
