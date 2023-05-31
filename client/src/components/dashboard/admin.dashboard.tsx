import React, { useEffect, useState } from 'react'
import headerbg from '../../../public/assets/headerbg.jpg'
import { useAxiosAuth } from '@/library/hooks/useAxiosAuth';
import { useAuth } from '@/context/AuthUserContext';
import { MdCloudUpload } from 'react-icons/md'
import avatar from "../../../public/assets/profile.jpg"
import UserManagement from './admin.usermanage';

type Props = {}

const AdminDashboard = (props: Props) => {
    const { user } = useAuth();
    const axiosJWT = useAxiosAuth();

    const [id, setID] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [company, setCompany] = useState<string>('');
    const [occupation, setOccupation] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [newProfile, setNewProfile] = useState<any>(null)
    const [previewURL, setPreviewURL] = useState<string | ArrayBuffer | null>(null);

    const formData = new FormData();

    async function fetchUserData() {
        try {
            const res = await axiosJWT.post(`${process.env.NEXT_PUBLIC_SERVER_PATH}/user/api/get-account-data`, { email: user.user.email }, {
                headers: { authorization: "Bearer " + user.accessToken },
            });
            if (res.status == 200) {
                console.log("USER DATA FROM API: ", res.data)
                const user = await res.data.user;
                setName(user.name)
                setEmail(user.email)
                setCompany(user?.company ? user?.company : "")
                setOccupation(user?.occupation ? user?.occupation : "")
                setImage(user?.profileImg ? user?.profileImg : "");
                setID(user._id);
            } else {
                console.log("There has been an error while getting user");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        setNewProfile(file);
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                setPreviewURL(reader.result);
            }
        };
        reader.readAsDataURL(file);
    }

    async function updateAccount(e: any) {
        e.preventDefault();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("occupation", occupation);
        formData.append("company", company);
        if (newProfile && newProfile !== null) {
            formData.append("image", newProfile);
            console.log("PROFILE: ", newProfile)
        }

        try {
            const res = await axiosJWT.patch(`${process.env.NEXT_PUBLIC_SERVER_PATH}/user/api/update-account/${id}`, formData, {
                headers: { authorization: "Bearer " + user.accessToken },
            });
            if (res.status == 200) {
                console.log('Account updated!')
            } else {
                console.log('Error while updating account!')
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchUserData();

    }, [user?.user])

    return (
        <div>
            <div className='text-white px-10 py-24' style={{ backgroundImage: `url(${headerbg.src})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                <h1 className='text-3xl uppercase font-bold'>Admin dashboard</h1>
                <h1>All the admin controls and analytics will come here</h1>
                <div className='flex justify-start items-center gap-3 mt-3'>
                    <button className='bg-white text-black rounded-lg py-2 px-3 text-sm hover:bg-zinc-100 transition-all'>Templates</button>
                    <button className='bg-white text-black rounded-lg py-2 px-3 text-sm hover:bg-zinc-100 transition-all'>Users</button>
                </div>
            </div>
            <div className='grid justify-center items-start grid-cols-1 md:grid-cols-3 gap-5 p-5 md-p-10'>
                {/* analytics  */}
                <div className='col-span-1 rounded-lg border border-gray-200 p-5 h-full'>
                    <h1 className='font-bold text-md mb-3'>Analytics</h1>
                </div>
                {/* settings  */}
                <div className='col-span-1 rounded-lg border border-gray-200 p-5'>
                    <h1 className='font-bold text-md mb-3'>Account Settings</h1>

                    <div className='mb-4 text'>
                        <img className='w-20 h-20 rounded-full mx-auto' src={image ? `${process.env.NEXT_PUBLIC_SERVER_PATH}/images/${image}` : (previewURL ? previewURL.toString() : avatar.src)} alt="avatar" />
                    </div>
                    <div className='mb-4'>
                        <label className="flex justify-center gap-3 items-center  bg-white text-blue py-2 rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-zinc-100 transition-all">
                            <MdCloudUpload className='text-[20px]' />
                            <span className="text-base ">Select a file</span>
                            <input onChange={handleImageChange} type='file' className="hidden" />
                        </label>
                    </div>
                    <div className="mb-4">
                        <input value={name} onChange={(e: any) => setName(e.target.value)} className="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" />
                    </div>
                    <div className="mb-4">
                        <input value={email} onChange={(e: any) => setEmail(e.target.value)} className="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" />
                    </div>
                    <div className="mb-4">
                        <input value={occupation} onChange={(e: any) => setOccupation(e.target.value)} className="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="occupation" type="text" placeholder="Occupation" />
                    </div>
                    <div className="mb-4">
                        <input value={company} onChange={(e: any) => setCompany(e.target.value)} className="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="company" type="text" placeholder="Company" />
                    </div>
                    <div className="mb-4">
                        <input className="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="Password" />
                    </div>
                    <button onClick={updateAccount} className='rounded-lg bg-zinc-900 py-2 px-3 w-full text-center text-white hover:bg-zinc-800 transition-all'>Update</button>
                </div>
                {/* user management  */}
                <div className='col-span-1 rounded-lg border border-gray-200 p-5 h-full'>
                    <UserManagement />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard