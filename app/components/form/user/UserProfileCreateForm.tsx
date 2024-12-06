import {useForm,Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserProfileSchema, userProfileSchema} from "@/app/components/schema/userProfileCreate";
import {ChangeEvent, useState} from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {useCreateUserProfileMutation, UserProfileInterface} from "@/lib/features/userProfiles/userProfileApiSlice";

interface ProfileCreateProps {
    name:string,
    gender:string,
    phoneNumber:string,
    address:string,
    profileAvatar?:any
}

export default function UserProfileCreateForm(){
    const [createUserProfileApi,createUserProfileResult] = useCreateUserProfileMutation();
    const {register,handleSubmit,control,reset,formState:{errors}} = useForm<UserProfileSchema>({resolver:zodResolver(userProfileSchema)});

    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleImgChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files)
        {
            const file = e.target.files[0];
            if(file)
            {
                setSelectedFile(file);
                setImgPreview(URL.createObjectURL(file));
            }
        }
    }

    const submitUserProfileCreateFormHandler = (data:ProfileCreateProps) => {
        if(selectedFile)
        {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('profileAvatar', selectedFile);
            formData.append('gender', data.gender);
            formData.append('phoneNumber', data.phoneNumber);
            formData.append('address', data.address);

            console.log('form data ',data);

            createUserProfileApi(formData).unwrap().then(data=>{
                reset();
                location.reload();
            })
        }
    }

    return(
        <div>
            <form className=" flex flex-col items-center justify-center gap-2" onSubmit={handleSubmit(submitUserProfileCreateFormHandler)}>
                <input
                    className=" hidden"
                    type={"file"} {...register('profileAvatar')}
                    onChange={handleImgChange}
                    id={'imgInput'}
                />
                <img
                    className="w-[150px] h-[150px] rounded-full cursor-pointer"
                    onClick={() => document.getElementById('imgInput')!.click()}
                    src={imgPreview || `DefaultAvatar.jpg`}
                    alt={'avatar'}
                />

                <input
                    className="input input-bordered w-full max-w-xs"
                    type="text"
                    {...register('name')}
                    placeholder="Name"
                />
                <p className=" text-red-500">{errors.name?.message}</p>

                <select
                    {...register('gender')}
                    className="select select-bordered w-full max-w-xs"
                >
                    {/*<option disabled={true} value={"Gender"}>Gender</option>*/}
                    <option>male</option>
                    <option>female</option>
                    <option>others</option>
                </select>
                <p className=" text-red-500">{errors.gender?.message}</p>

                <Controller
                    control={control}
                    name={"phoneNumber"}
                    render={({field}) => (
                        <PhoneInput
                            country="mm"
                            value={field.value}
                            onChange={(phone) => field.onChange(phone)}
                        />
                    )}
                />
                <p className=" text-red-500">{errors.phoneNumber?.message}</p>

                <textarea
                    className="textarea textarea-bordered w-full"
                    {...register('address')}
                    placeholder="Address"
                ></textarea>
                <p className=" text-red-500">{errors.address?.message}</p>

                <button className=" btn w-full" type={"submit"}>CREATE</button>
            </form>
        </div>
    )
}