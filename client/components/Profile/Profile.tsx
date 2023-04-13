import { useState } from 'react';
import css from "./Profile.module.scss";
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

//api
import axios from 'axios';
import { Routes } from '@/api/routes';
import { useQuery, useMutation, useQueryClient } from 'react-query';

//assets
import User from "../../svg/user_holder.svg";
import UplaodIcon from "svg/upload.svg";

interface UserProps {
    createdAt: string;
    updatedAt: string;
    email: string;
    username: string;
    password: string;
    profilePicture: string;
    _id: string;
}

const Profile = () => {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const { enqueueSnackbar } = useSnackbar();

    const queryClient = useQueryClient();
    const router = useRouter();

    const [file, setFile] = useState<any>(null);

    const { data: user, isLoading, isError } = useQuery<UserProps>(["user", router.query.id], async ({ queryKey }: any) => {
        const id = queryKey[1];
        const response = await axios.get(Routes.getUser, {
            params: {
                id: id
            }
        })
        return response.data;
    })

    const { mutate: editProfile } = useMutation({
        mutationFn: (data) => axios.put(Routes.updateUser, data),
        onSuccess: (data) => {
            queryClient.setQueryData(["user", router.query.id], () => data.data);
            setFile(null);
            enqueueSnackbar("Profile updated", {
                variant: "success",
                autoHideDuration: 3000
            });
        }
    })

    //Function to upload image to the local file "/images"
    const { mutate: uploadImage } = useMutation({
        mutationFn: (data: any) => axios.post(Routes.uploadImage, data),
    })

    const handleEdit = () => {
        const finalData: any = {
            ...user,
        }
        if (file) {
            const data = new FormData();
            const filename = file.name;
            data.append("name", filename);
            data.append("file", file);
            finalData.profilePicture = filename;
            uploadImage(data);
        }
        editProfile(finalData);
    }

    return (
        <>
            <div className={css.container}>
                <div className={css.userWrapper}>
                    {file ?
                        <img src={URL.createObjectURL(file)} alt="image" /> :
                        user?.profilePicture ?
                            <img
                                src={baseUrl + user.profilePicture}
                                alt="profile_picture"
                            />
                            :
                            <>
                                <User />
                                <label
                                    htmlFor="profileImage"
                                    className={css.uploadIcon}
                                >
                                    <UplaodIcon />
                                </label>
                                <input
                                    type="file"
                                    id="profileImage"
                                    onChange={(e: any) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </>
                    }
                </div>
                <div className={css.userInfo}>
                    {isLoading ?
                        <div>Loading...</div>
                        :
                        <div className={css.profileInfo}>
                            <div>User: {user?.username}</div>
                            <div>Email: {user?.email}</div>
                            <div>Created at: {user?.createdAt}</div>
                        </div>
                    }
                </div>
            </div>
            {file &&
                <div className={css.actionButtons}>
                    <button onClick={() => setFile(null)}>Cancel</button>
                    <button onClick={handleEdit}>Update</button>
                </div>
            }
        </>
    )
}

export default Profile;